"use client"

import Image from "next/image"
import { useState, useEffect} from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
  } from "@/components/ui/carousel"
import { ArrowRight} from "lucide-react"
import { content } from "@/lib/content"
import { useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { About as Type } from "@/types"

export function Slide({media, isImage}: {media:string, isImage:boolean}){
  const [isLoaded, setIsLoaded] = useState(false)
  console.log(isLoaded)
  return(
    <div>
    
    {isImage ? <Image 
                    src={media} 
                    alt={"Lumit s.r.o."} 
                     width={1024}
                    height={1024}
                    className="z-0 rounded-xl"
                    onLoad={() => setIsLoaded(true)}
                      />: 
                      <video autoPlay controls playsInline className="rounded-xl">
                        <source src={media} />
                      </video>}
  </div>
  )
}

export default function About({images}: {images: Type}){
  console.log(images.items)
    const params = useSearchParams();
    const lang = params.get("lang") || "cs";
    const obsah = content[lang as keyof typeof content] || content.cs  
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(2)
    const [
      count, 
      setCount] = useState(0)
    useEffect(() => {
        if (!api) {
          return
        }
        
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
     
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)  
        })
      }, [api])
      console.log(count)
    return(
        <section id="onas" className=" text-black left-0 w-full h-full backdrop-blur-xl z-10 flex flex-col md:flex-row-reverse p-5 gap-5">
              <div className="w-full md:w-1/2 h-auto text-right flex flex-col justify-center space-y-6">
                  <h1 className="font-serif text-5xl md:text-7xl">{obsah.about.header}<span className="text-red-600 ">{obsah.about.endHeader}</span></h1>
                  <p>
                {obsah.about.text}
                  </p>
                  <div className="w-full grid grid-cols-2 justify-items-center gap-4">
                      <Link href={obsah.about.btnLink2}>
                      <Button size={"sm"} variant={"secondary"}>
                          {obsah.about.btnText2}
                        <ArrowRight/>
                      </Button>
                      </Link>
                      <Link href={obsah.about.btnLink1}>
                      <Button size={"sm"} variant={"secondary"}>
                          {obsah.about.btnText1}
                        <ArrowRight/>
                      </Button>
                      </Link>
                      
                  </div>
              </div>

              <div className="w-full h-fit md:w-1/2 sm:my-auto">
                  <Carousel 
                  setApi={setApi} 
                  className="w-full sm:w-4/5 mx-auto min-h-[400px] "
                 >
                    <CarouselContent className="h-fit">
                  {images.items.map((i, index) => (
                    <CarouselItem key={index} className="my-auto">
                        <Slide isImage={i.isImage} media={i.media}/>
                    </CarouselItem>
                ))}
               
                  </CarouselContent >
                  
                  <CarouselPrevious className="bg-black hidden sm:flex"/>
                  <CarouselNext className="bg-black hidden sm:flex"/>
                   <div className="flex flex-row space-x-5 py-2 text-center text-sm text-black justify-center">
                  {images.items.map((_, i) => (
                      <div key={i} onClick={() => setCurrent(i)} className={`w-12 h-1.5 rounded-xl  ${i === current-1 ? "bg-black ": "bg-white"}`}></div>
                  ))}
                 </div>
                  </Carousel>
                  
              </div>
     </section>
    )
}