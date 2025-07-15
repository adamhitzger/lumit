"use server"

import { ActionRes } from "@/types";
import { ContactType } from "./schemas";
import nodemailer from "nodemailer"
import { revalidatePath } from "next/cache";
import { contactSchema } from "./schemas";

export async function sendContact(prevState: ActionRes<ContactType>, formData: FormData): Promise<ActionRes<ContactType>>{
    let revalidate = false;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        }
      });
    try {
      const contact: ContactType = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        tel: formData.get("tel") as string,
        company: formData.get("company") as string,
        msg: formData.get("msg") as string,
      };
  
      const validatedData = contactSchema.safeParse(contact);
      if (!validatedData.success) {
        return {
          success: false,
          submitted: true,
          message: "Některá pole jste nevyplnili dobře",
          errors: validatedData.error.flatten().fieldErrors,
          inputs: contact,
        };
      } else {
        const data = validatedData.data;
        const sendMail = await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: data.email,
          subject: "Nový kontakt",
          text: `Celé jméno: ${data.name}, Email: ${data.email}, Tel. číslo: ${data.tel}, Firma: ${data.company}, Zpráva: ${data.msg}`,
        });
        if (!sendMail.accepted) {
          revalidate = false;
          return {
            success: false,
            submitted: true,
            message: "Nepodařilo se odeslat e-mail. Zkuste to znovu",
          };
        } else {
          revalidate = true;
          return {
            success: true,
            submitted: true,
            message: "Děkujeme za záslání! Co nevidět se Vám ozveme.",
          };
        }
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        submitted: true,
        message: "Nepovedlo se odeslat Vaše údaje",
      };
    } finally {
      if (revalidate) {
        revalidatePath("/");
      }
    }
}