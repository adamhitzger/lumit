"use client"
import { useSearchParams } from "next/navigation";
import { content } from "@/lib/content";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
export default function Services(){
     const params = useSearchParams();
        const lang = params.get("lang") || "cs";
        const en = lang === "en"
        const obsah = content[lang as keyof typeof content] || content.cs  
    return(
        <section className="flex flex-col space-y-2 w-full p-5">
            <h1 className="font-serif text-5xl md:text-7xl">{obsah.services.header}<span className="text-red-600 ">{obsah.services.endHeader}</span></h1>
            <p>
                {obsah.services.text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {obsah.services.services.map((s,i) => (
                <div key={i} className="relative bg-gray-300 w-full min-h-64 rounded-xl">
                    <div className="absolute top-0 left-0 p-1 h-full flex flex-col backdrop-blur-2xl backdrop_filter justify-evenly px-5 rounded-xl z-20">
                    <h1 className="text-3xl lg:text-4xl font-serif">{s.heading}</h1>
                    <p className="text-sm lg:text-base">
                      {s.text}
                    </p>
                     <Link href={s.link}>
                      <Button size={"sm"} variant={"secondary"}>
                          {en ? "More": "Více"}
                        <ArrowRight/>
                      </Button>
                      </Link>
                      </div>
                    
                      <div className="absolute right-0 bottom-0 w-32 h-32 bg-red-400 z-0 rounded-full">
                      </div>
                </div>))}
            </div>
        </section>
    )
}