"use client"

import { useSearchParams } from "next/navigation";
import { content } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";

export default function Sluzby(){
    const params = useSearchParams();
        const lang = params.get("lang") || "cs";
        const [step, setStep] = useState<number | null>(null)
        const obsah = content[lang as keyof typeof content] || content.cs
        const leasingovky:string[]=[
            "arval.png","ayvens.png","cebianet.png","skofin.png","ald.png"
        ] 
        const leasingovky2:string[]=[
            "cpp.png","generali.png","colonade.png","kooperativa.png",
        ] 
        const leasingovky3:string[]=[
            "moneta.png","essox.png"
        ] 
    return(
        <>
        {obsah.sluzby.sekce.map((s,i) =>(
            <section id={s.id} key={i} className={`w-full p-5 gap-5 flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} >
                <div className="w-full md:w-1/2 flex flex-col space-y-4 md:my-auto">
                     <h1 className="font-serif text-5xl md:text-7xl">{s.heading} <span className="text-red-600 ">{s.endHeading}</span></h1>
                
                {s.text && 
                <p>
                {s.text}
                </p>
                }

                {s.list && 
                <ul className="list-disc px-5">
                {s.list.map((l,i) => (
                    <li key={i}>{l}</li>
                ))}
                </ul>
                }
                  
                  <div className="w-full grid grid-cols-2 justify-items-center gap-4">
                      
                      {s.btnText && s.btnLink  &&
                        <Link href={s.btnLink}>
                      <Button size={"sm"} variant={"secondary"}>
                          {s.btnText}
                        <ArrowRight/>
                      </Button>
                      </Link>
                      }
                      <Link href={obsah.about.btnLink2}>
                      <Button size={"sm"} variant={"secondary"}>
                          {obsah.about.btnText2}
                        <ArrowRight/>
                      </Button>
                      </Link>
                      
                      
                  </div>
                </div>
{i===1 ?
<div className="grid grid-cols-2 gap-3 w-full md:w-1/2 items-center">
    {leasingovky.map((s: string, i: number) => (
        <Image
                    alt={"Leasingové společnosti"}
                    key={i}
                    src={"/leaselogos/"+s}
                    width={804}
                    height={804}
                    className="rounded-xl w-full md:w-1/2  shadow-red-500"
                />

    ))}
</div>
: <Image
                    alt={s.id}
                    src={s.img}
                    width={1204}
                    height={1204}
                    className="rounded-xl w-full md:w-1/2 shadow-xl shadow-red-500"
                />
}
            </section>
        ))}
        <section id="leasing" className={`w-full p-5 gap-5 flex flex-col md:flex-row-reverse`}>
            <div className="w-full md:w-1/2 flex flex-col space-y-4 md:my-auto">
             <h1 className="font-serif text-5xl md:text-7xl">{obsah.sluzby.pojisteni} <span className="text-red-600 ">{obsah.sluzby.financovani}</span></h1>
             <Accordion type="single" collapsible>
                {obsah.sluzby.accordion.map((a,i)=> (
 <AccordionItem key={i} value={`item-${i}`}>
    <AccordionTrigger className="text-xl border-b-black border" onClick={() => setStep(i)}>{a.heading}</AccordionTrigger>
    <AccordionContent>
      {a.text}
    </AccordionContent>
  </AccordionItem>
                ))}
 
</Accordion>
            </div>
            <div className="flex flex-row gap-3 w-full md:w-1/2 items-center">
                {step === 3 ? 
                leasingovky3.map((s: string, i: number) => (
        <Image
                    alt={"Leasingové společnosti"}
                    key={i}
                    src={"/leaselogos/"+s}
                    width={1804}
                    height={1804}
                    className="rounded-xl w-full md:w-1/2  shadow-red-500"
                />

    ))
                :
                 leasingovky2.map((s: string, i: number) => (
        <Image
                    alt={"Leasingové společnosti"}
                    key={i}
                    src={"/leaselogos/"+s}
                    width={804}
                    height={804}
                    className="rounded-xl w-full md:w-1/2  shadow-red-500"
                />

    ))
                }
   
</div>
        </section>
        </>
    )
}