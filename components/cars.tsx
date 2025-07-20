"use client"

import { ActionRes, CarWithPhotos, SanityCar} from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Fuel, Gauge, HandCoins } from "lucide-react";
import { content } from "@/lib/content";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Wrench, Loader2 } from "lucide-react";
import { useState, useActionState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { sendContact } from "@/lib/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ContactType } from "@/lib/schemas";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import { Suspense } from "react";
import { airbagList, airconditionList, colorList, conditions, firstOwnerList, fuelList, gearboxAutoTypeList, gearboxLevelList, gearboxList, getLabelById, serviceBookList, stateList } from "@/lib/sAutoLists";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
    CarouselNext,
    CarouselPrevious
  } from "@/components/ui/carousel"
  
const actionState: ActionRes<ContactType> = {
    success: false,
    message: "",
    submitted: false,
}


function CarCard({car}: {car: CarWithPhotos}){
    const params = useSearchParams();
       const lang = params.get("lang") || "cs";
    return(
        <aside className="w-full grid grid-cols-1  rounded-lg text-black bg-white p-4">
            <div className="font-serif text-3xl w-full flex items-start flex-col gap-2">
                <h2>{car.title ? car.title : car.car_id}</h2>
                {car.photos &&<Image src={car.photos[0]}
                alt={car.address}
                width={854}
                height={854}
                className="rounded-lg"
                />}
            </div>

            <div className="grid gap-2 grid-cols-2  w-full sm:items-end mt-8 text-lg">
                <div className="w-fit flex flex-row space-x-2">
    <Wrench/><span> {new Date(Date.parse(car.stk_date)).toLocaleDateString('cs-CZ', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})}</span>
                </div>
                <div className="w-fit flex flex-row space-x-2">
    <Gauge/><span> {car.engine_power} kW</span>
                </div>
                <div className="w-fit flex flex-row space-x-2">
    <Fuel/><span> {lang === "en" ? getLabelById(fuelList, car.fuel,"fuel_id","en") : getLabelById(fuelList, car.fuel,"fuel_id","cs")}</span>
                </div>
                <div className="w-fit flex flex-row space-x-2">
    <HandCoins/><span> {car.price} Kč</span></div>
    <Link href={"/auta/"+car.car_id}>
        <Button variant={"secondary"}>
            {lang == "cs" ? "Podrobnosti": "View"}
            <ArrowRight/>
        </Button>
    </Link>
                
            </div>
        </aside>
    )
}

export function SignleCar({car,  images}: {car: CarWithPhotos, images:SanityCar}){
    const params = useSearchParams();
       const lang = params.get("lang") || "cs";
       const en = lang === "en"
    const obsah = content[lang as keyof typeof content].car || content.cs.car 
    const [state, action, isPending] = useActionState(sendContact, actionState)
    const obsah2 = content[lang as keyof typeof content] || content.cs
    console.log(car)
 useEffect(() => {
        if (!state.success && state.message) {
            toast.error(state.message);
        }else if(state.success && state.message){
            toast.success(state.message);
            
        }
    }, [state.success, state.message]);  
    const parts = car.note
  .split(',')
  .map((part:string) => part.trim())  // odstraní mezery kolem
  .filter((part:string) => part.length > 0);
      const [api, setApi] = useState<CarouselApi>()
    const [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      current  
      , setCurrent] = useState(0)
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
       <>
       <section className="w-full flex flex-col-reverse md:flex-row space-4 p-5">
         <div className="w-full md:w-1/2 flex flex-col space-y-3 ">
            <h1 className="text-left font-serif text-5xl md:text-6xl my-4">{images.title} </h1>
            <div className="flex flex-col w-full text-lg">
                <p>{obsah.vin}: <span className="font-light">{car.vin}</span></p>
                <p>{obsah.run_date}: <span className="font-light">{new Date(Date.parse(car.run_date)).toLocaleDateString('cs-CZ', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})}</span></p>
<p>{obsah.condition}: <span className="font-light">{en? getLabelById(conditions, car.condition,'condition_id',lang) : getLabelById(conditions, car.condition,"condition_id","cs")}</span></p>
<p>{obsah.tachometr}: <span className="font-light">{car.tachometr} km</span></p>
<p>{obsah.engine_volume}: <span className="font-light">{car.engine_volume} ccm</span></p>
<p>{obsah.stk_date}: <span className="font-light">{new Date(Date.parse(car.stk_date)).toLocaleDateString('cs-CZ', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})}</span></p>
<p>{obsah.engine_power}: <span className="font-light">{car.engine_power} kW/{car.engine_power*1.3} PS</span></p>
<p>{obsah.fuel}:<span className="font-light">{en? getLabelById(fuelList, car.fuel,"fuel_id",lang) : getLabelById(fuelList, car.fuel,"fuel_id","cs")}</span></p>
<p>{obsah.door}: <span className="font-light">{car.door}</span></p>
<p>{obsah.capacity}: <span className="font-light">{car.capacity}</span></p>
<p>{obsah.color}: <span className="font-light">{en? getLabelById(colorList, car.color,"color_id",lang) : getLabelById(colorList, car.color,"color_id","cs")}</span></p>
<p>{obsah.airbag}: <span className="font-light">{en? getLabelById(airbagList, car.airbag,"airbag_id",lang) : getLabelById(airbagList, car.airbag,"airbag_id","cs")}</span></p>
<p>{obsah.aircondition}: <span className="font-light">{en? getLabelById(airconditionList, car.aircondition,"aircondition_id",lang) : getLabelById(airconditionList, car.airbag,"aircondition_id","cs")}</span></p>
<p>{obsah.euro}: <span className="font-light">{car.euro}</span></p>
<p>{obsah.state_id}: <span className="font-light">{en? getLabelById(stateList, car.state_id,"id",lang) : getLabelById(stateList, car.state_id,"id","cs")}</span></p>
<p>{obsah.service_book}: <span className="font-light">{en? getLabelById(serviceBookList, car.service_book,"id",lang) : getLabelById(serviceBookList, car.service_book,"id","cs")}</span></p>
<p>{obsah.first_owner}: <span className="font-light">{en? getLabelById(firstOwnerList, car.first_owner,"id",lang) : getLabelById(firstOwnerList, car.first_owner,"id","cs")}</span></p>
<p>{obsah.gearbox}: <span className="font-light">{en? getLabelById(gearboxList, car.gearbox,"id",lang) : getLabelById(gearboxList, car.gearbox,"id","cs")}</span> /<span className="font-light">{en? getLabelById(gearboxAutoTypeList, car.gearbox_auto_type,"id",lang) : getLabelById(gearboxAutoTypeList, car.gearbox_auto_type,"id","cs")}</span> </p>
<p>{obsah.gearbox_level}: <span className="font-light">{en? getLabelById(gearboxLevelList, car.gearbox_level,"id",lang) : getLabelById(gearboxLevelList, car.gearbox_level,"id","cs")}</span></p>
<p>{obsah.cena}: <span className="font-bold text-lg">{car.price} Kč</span></p>
               </div>
         </div>

         <div className="w-full md:w-1/2 flex flex-col space-y-3 font-serif ">
         
         <Carousel 
                  setApi={setApi} 
                  className="w-full"
                 >
                    <CarouselContent>
                  {images.photos.map((c: string, index) => (
                    <CarouselItem key={index}>
                      {images.photos.length > 0 &&
                        <Image 
                    src={c} 
                    alt={"Lumit Car company "} 
                     width={1024}
                    height={1024}
                    className="z-0 rounded-xl"
                      />
                      }     
                  
                     
                      
                    </CarouselItem>
                ))}
                  </CarouselContent>
                  <CarouselPrevious/>
                  <CarouselNext/>
                  
                  </Carousel>
         </div>
       </section>
        <section id="kontakt" className="w-full flex flex-col md:flex-row space-4 p-5 gap-4">
            <div className="w-full md:w-1/2 flex flex-col space-y-3 font-serif ">
            <h1 className="text-5xl">Výbava</h1>
            <div className="flex flex-row gap-4 flex-wrap">
        {!en && parts.map((e:string, i: number) => (
            <div key={i} className="relative bg-gray-300 min-w-30 min-h-22 rounded-xl">
                    <div key={i} className="absolute top-0 left-0 p-1 min-h-22 flex flex-col justify-evenly px-5 rounded-xl min-w-30 backdrop-blur-2xl z-20">
                    <p className="text-lg w-full font-serif">{e.length > 30 ? e.slice(0,30) + "..." : e}</p>
                    
                      </div>
                    
                      <div className="absolute right-0 bottom-0 w-10 h-10 bg-red-400 z-0 rounded-full">
                      </div>
                </div>
        ))}
     
            </div>
            </div>
            <div className="w-full md:w-1/2">
                <h1 className="font-serif text-5xl md:text-6xl my-4 text-right">{obsah2.contact.heading} <span className="text-red-600 ">{obsah2.contact.endHeading}</span></h1>
                 <form action={action} className="grid grid-cols-1 sm:grid-cols-2  w-full gap-5 ">
                <div className='flex flex-col w-full space-y-2'>
                    <Label>{obsah2.contact.nameLabel}</Label>
                    <Input name="name" type="text" placeholder={obsah2.contact.nameholder} required disabled={isPending} />
                    {state?.errors?.name && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.name}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>{obsah2.contact.emailLabel}</Label>
                    <Input name="email" type="email" placeholder={obsah2.contact.emailholder}  required disabled={isPending} />
                    {state?.errors?.email && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.email}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>{obsah2.contact.telLabel}</Label>
                    <Input name="tel" type='tel' placeholder={obsah2.contact.telholder} required disabled={isPending} />
                    {state?.errors?.tel && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.tel}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>{obsah2.contact.companyLabel}</Label>
                    <Input name="company" type="text" placeholder={obsah2.contact.companyholder} disabled={isPending} />
                    {state?.errors?.company && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.company}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 lg:col-span-2 w-full'>
                    <Label>{obsah2.contact.msgLabel}</Label>
                    <Textarea name='msg' placeholder={obsah2.contact.msgholder} required disabled={isPending} />
                    {state?.errors?.msg && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.msg}
                               </p>
                            )}
                </div>
                <div className='flex flex-row flex-wrap space-y-2 justify-between lg:col-span-2 w-full  py-5 items-center'>
                        
                        <Button variant={"secondary"} type="submit">{isPending ? <Loader2 className='animate-spin' /> : <>{obsah2.contact.submit} < ArrowRight /></>}</Button>
                    </div>
                
            </form>
            
            </div>
                
        </section>
  
       </>
    )
}

export default function NewestCars({cars}: {cars: CarWithPhotos[]}){
   const params = useSearchParams();
       const lang = params.get("lang") || "cs";
       const obsah = content[lang as keyof typeof content] || content.cs  
       const carsContent = obsah.cars
       console.log("Length2",cars.length)
return(
<section className=" text-black left-0 w-full h-full backdrop-blur-xl z-10 flex flex-col sm:flex-row p-5 gap-5">
              <div className="w-full h-fit sm:h-full flex flex-col justify-center space-y-4">
                  <h1 className="font-serif text-left text-5xl md:text-7xl">{carsContent.heading}<span className="text-red-600 "> {carsContent.endHeader}</span></h1>
                    <p>
                {carsContent.text2}
                  </p>
                    <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {cars.map((c: CarWithPhotos, i:number) => (
                            <CarCard car={c} key={i}/>
                        ))}
                    </div>
                
                      <Link href={carsContent.btnLink} className="mx-auto">
                      <Button size={"sm"}>
                          {carsContent.btnText}
                        <ArrowRight/>
                      </Button>
                      </Link>
                 
              </div>

              
     </section>
    )
}

export function Cars({cars}: {cars: CarWithPhotos[]}){
   const params = useSearchParams();
       const lang = params.get("lang") || "cs";
       const obsah = content[lang as keyof typeof content] || content.cs  
       const carsContent = obsah.cars
return(
  <Suspense
      fallback={
        <section className="text-black left-0 w-full h-full backdrop-blur-xl z-10 flex flex-col sm:flex-row p-5 gap-5">
          <div className="w-full h-fit sm:h-full flex flex-col justify-center space-y-4">
            <Skeleton className="h-16 w-3/4 rounded-xl" /> {/* Skeleton pro nadpis */}
            <Skeleton className="h-6 w-full rounded-xl" /> {/* Skeleton pro text */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
              {/* Skeletony pro karty aut */}
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[256px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      }
    >
<section className=" text-black left-0 w-full h-full backdrop-blur-xl z-10 flex flex-col sm:flex-row p-5 gap-5">
              <div className="w-full h-fit sm:h-full flex flex-col justify-center space-y-4">
                  <h1 className="font-serif text-left text-5xl md:text-7xl">{carsContent.heading2}<span className="text-red-600 "> {carsContent.endHeader2}</span></h1>
<p>
                {carsContent.text2}
                  </p>
                   <header className="w-full flex text-black flex-wrap text-lg">
            
        </header>
                    <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols_4 2xl:grid-cols-5 gap-4">
                        {cars.map((c: CarWithPhotos, i:number) => (
                            <CarCard car={c} key={i}/>
                        ))}
                    </div> 
              </div>         
     </section>
     </Suspense>
    )
}