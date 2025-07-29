"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import { content } from "@/lib/content";
import { useSearchParams } from "next/navigation";
import { ActionRes } from "@/types";
import { ContactType } from "@/lib/schemas";
import { useEffect, useActionState } from "react";
import toast from 'react-hot-toast';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2, ArrowRight } from "lucide-react";
import { sendContact } from "@/lib/actions";
import Link from 'next/link';

const actionState: ActionRes<ContactType> = {
    success: false,
    message: "",
    submitted: false,
}


export default function Contact(){
    const params = useSearchParams();
    const lang = params.get("lang") || "cs";
    const obsah = content[lang as keyof typeof content] || content.cs
    const [state, action, isPending] = useActionState(sendContact, actionState)
    
 useEffect(() => {
        if (!state.success && state.message) {
            toast.error(state.message);
        }else if(state.success && state.message){
            toast.success(state.message);
            
        }
    }, [state.success, state.message]);  
    return(
        <section id="kontakt" className="w-full flex flex-col md:flex-row gap-4 p-5">
            <div className="w-full md:w-1/2">
                <h1 className="font-serif text-5xl md:text-6xl my-4">{obsah.contact.heading} <span className="text-red-600 ">{obsah.contact.endHeading}</span></h1>
                 <form action={action} className="grid grid-cols-1 sm:grid-cols-2  w-full gap-5 ">
                <div className='flex flex-col w-full space-y-2'>
                    <Label>{obsah.contact.nameLabel}</Label>
                    <Input name="name" type="text" placeholder={obsah.contact.nameholder} required disabled={isPending} />
                    {state?.errors?.name && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.name}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>{obsah.contact.emailLabel}</Label>
                    <Input name="email" type="email" placeholder={obsah.contact.emailholder}  required disabled={isPending} />
                    {state?.errors?.email && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.email}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>{obsah.contact.telLabel}</Label>
                    <Input name="tel" type='tel' placeholder={obsah.contact.telholder} required disabled={isPending} />
                    {state?.errors?.tel && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.tel}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>{obsah.contact.companyLabel}</Label>
                    <Input name="company" type="text" placeholder={obsah.contact.companyholder} disabled={isPending} />
                    {state?.errors?.company && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.company}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 lg:col-span-2 w-full'>
                    <Label>{obsah.contact.msgLabel}</Label>
                    <Textarea name='msg' placeholder={obsah.contact.msgholder} required disabled={isPending} />
                    {state?.errors?.msg && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.msg}
                               </p>
                            )}
                </div>
                <div className='flex flex-col flex-wrap space-y-2 lg:col-span-2 w-full  '>
                        
                        <Button className='w-28' variant={"secondary"} type="submit">{isPending ? <Loader2 className='animate-spin' /> : <>{obsah.contact.submit} < ArrowRight /></>}</Button>
                        <p>{obsah.contact.souhlas} <Link href={"/souhlas"} className='underline underline-offset-2'>{obsah.contact.souhlas2}</Link></p>
                    </div>
                
            </form>
            
            </div>
                <iframe id="map" className=" w-full md:w-1/2 rounded-xl  h-96 lg:h-auto" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.874930639824!2d15.57609669999999!3d49.6189625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d009b5cd40001%3A0x574686968b1d429f!2sLUMIT%20Company%20sro!5e0!3m2!1scs!2scz!4v1748677057346!5m2!1scs!2scz" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>  
        
        </section>
    )
}