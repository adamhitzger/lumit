import * as z from "zod"

const phoneRegex = new RegExp(/^[0-9]{9}$/)


export const contactSchema = z.object({
    name: z.string().min(3, {message: "Jméno je moc krátké"}),
    email: z.string().email(),
    tel: z.string().min(1,{message: "Pole je povinné"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    company: z.string().optional(),
    msg: z.string().max(100, {message: "Zpráva je moc dlouhá"})
})

export type ContactType = z.infer<typeof contactSchema>