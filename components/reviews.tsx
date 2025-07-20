"use client"
import { content } from "@/lib/content"
import { useSearchParams } from "next/navigation"
import { InfiniteMovingCards } from "./ui/movingCards";
import { Reviews } from "@/types";

export default function ReviewsComp({items}: {items: Reviews}){
    const params = useSearchParams();
    const lang = params.get("lang") || "cs";
    const obsah = content[lang as keyof typeof content] || content.cs 
    return(
        <section id="recenze" className="text-right text-black w-full h-full  flex flex-col p-5 gap-5">
            <h1 className="font-serif  text-5xl md:text-7xl">{obsah.reviews.heading} <span className="text-red-600 ">{obsah.reviews.endHeading}</span></h1>
            <p>
                {obsah.reviews.text}
            </p>
            <InfiniteMovingCards items={items} direction="left" speed="slow"/>
         </section>
    )
}