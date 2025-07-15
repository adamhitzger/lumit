"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image";
import Link from "next/link";
import {content} from "@/lib/content"

export default function Footer(){
    const params = useSearchParams();
    const lang = params.get("lang") || "cs";
    const en = lang === "en"
    const obsah = content[lang as keyof typeof content] || content.cs
    
    return(
        <footer className="w-full grid grid-cols-2 sm:grid-cols-5
         bg-black p-3 text-white gap-4">
            <Link href={en ? "/?lang=en" : "/lang?=cs"} className="col-span-2 sm:col-span-1">
            <Image src={"/logo.png"} alt="Logo Autobazaru Lumit" width={250} height={80}/>
            </Link>
            {obsah.footer.links.map((l,i:number) => (
                <div key={i} className="w-full flex flex-col space-y-5">
                    <h2 className="font-serif text-4xl">{l.name}</h2>
                    <div className="w-full flex flex-col space-y-2">
                        {l.links?.map((j, i:number) => (
                            <Link key={i} href={j.link} className="text-xl font-light">
                            {j.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))
                }
                <div  className="w-full flex flex-col space-y-5  sm:text-right text-lg">
                    <h2 className="font-serif text-4xl">{obsah.footer.info}</h2>
                    <div className="w-full flex flex-col space-y-2">
                        <p>{obsah.footer.adresa}</p>
                        <p>IČO: {obsah.footer.ico}</p>
                        <p>DIČ: {obsah.footer.dic}</p>
                        <p>{obsah.footer.registrace}</p>
                    </div>
                </div>
                <div  className="w-full flex flex-col space-y-5 sm:text-right">
                    <h2 className="font-serif text-4xl">{obsah.footer.kontakty}</h2>
                    <div className="w-full flex flex-col space-y-2">
                        <h3 className="font-serif text-3xl">{obsah.footer.emailNadpis}</h3>
                        <Link href={"mailto:info@auto-mt.com"} className="text-xl font-light">
                            {obsah.footer.email}
                            </Link>
                        <h3 className="font-serif text-3xl">{obsah.footer.telNadpis}</h3>
                        <Link href={`tel:${obsah.footer.tel1}`} className="text-xl font-light">
                            {obsah.footer.tel1}
                            </Link>
                            <Link href={`tel:${obsah.footer.tel2}`} className="text-xl font-light">
                            {obsah.footer.tel2}
                            </Link>
                    </div>
                </div>
        </footer>
    )
}