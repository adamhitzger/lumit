import { SignleCar } from "@/components/cars";
import { sanityFetch } from "@/sanity/lib/client";
import { authenticate,  getSautoCar } from "@/lib/utils";
import { getCar } from "@/sanity/lib/query";
import { SanityCar } from "@/types";

export default async function CarPage({ params }: { params: Promise<{ id: string}> }){
    const session = await authenticate()
    const param = await params
    const id = Number(param.id)
    if(!session) throw Error("Nepodařilo se prihlasit")
    const car = await getSautoCar(session,id)
    const carSanity = await sanityFetch<SanityCar>({ query: getCar, params: {id} });
    return (
        <SignleCar car={car.output} images={carSanity}/>
    )
}