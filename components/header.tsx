"use client"

import { Skeleton } from "./ui/skeleton"
import { useState, useEffect, useRef } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight, Phone } from "lucide-react"
import { content } from "@/lib/content"
import { useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { CarWithPhotos} from "@/types"
import Image from "next/image"

export function HeaderSkeleton(){
    return(
        <Skeleton className="w-full h-[300px] rounded-xl "/>
    )
}

export default function Header({cars}: {cars: CarWithPhotos[]}){
    const params = useSearchParams();
    const lang = params.get("lang") || "cs";
    const obsah = content[lang as keyof typeof content] || content.cs  
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [
      count,
       setCount] = useState(0)
     const plugin = useRef(
      Autoplay({ delay: 6000, stopOnInteraction: true })
        )
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
      console.log(count, cars[1])
    return(
        <section className=" text-black left-0 w-full h-full backdrop-blur-xl z-10 flex flex-col sm:flex-row p-5 gap-5">
              <div className="w-full sm:w-1/2 h-auto flex flex-col justify-center space-y-6">
                  <h1 className="font-serif text-5xl text-center md:text-7xl">{obsah.header.header}<span className="text-red-600 ">{obsah.header.endHeader}</span> company s.r.o.</h1>
                  <div className="w-full t flex flex-row gap-4 text-center items-center justify-center">
                                            <Phone className="w-12 h-12"/>
                                            <p className="text-xl font-bold"><Link className="underline underline-offset-2 decoration-wavy decoration-red-600" href={"tel:+420 602 419 536"}>602 419 536</Link> a <Link className="underline underline-offset-2 decoration-wavy decoration-red-600" href={"tel:+420 608 170 008"}>608 170 008</Link> 
                                            </p>
                                        </div>
                 
              </div>

              <div className="w-full h-fit sm:w-1/2 sm:my-auto">
                  <Carousel 
                  setApi={setApi} 
                  className="w-full border-2"
                  plugins={[plugin.current]}
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                 >
                    <CarouselContent>
                  {cars.map((c: CarWithPhotos, index) => (
                    <CarouselItem key={index}>
              <div className="relative max-w-xl h-[300px] mx-auto lg:h-[420px]">
                <Image
                  src={c.photos[0]}
                  alt={`Lumit, s.r.o - ${c.title}`}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex rounded-xl flex-col justify-center items-center p-4 py-7 z-10 bg-black/40">
                  <span className="mb-5 text-3xl font-bold text-white drop-shadow-lg">
                    {c.title && c.title}
                  </span>
                   {c.discount&& c.discount > 0 ?  <p className="space-x-2 mb-3"><span className="line-through font-bold text-red-400  text-xl">{c.price.toLocaleString("cs-CZ")} Kč</span> <span className="font-bold text-white text-xl">{(c.price-(c.discount)).toLocaleString("cs-CZ")} Kč</span></p> : null}
                  <Link href={`/auta/${c.car_id}?lang=${lang}`} className="w-40 flex items-center">
                    <Button variant="secondary">
                      {obsah.header.view} 👀
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
                ))}
                  </CarouselContent>
                  
                  </Carousel>
                  <div className="flex flex-row space-x-5 py-2 text-center text-sm text-black justify-center">
                  {cars.map((_, i) => (
                      <div key={i} className={`w-12 h-1.5 rounded-xl  ${i === current-1 ? "bg-black ": "bg-white"}`}></div>
                  ))}
                 </div>
              </div>
     </section>
    )
}