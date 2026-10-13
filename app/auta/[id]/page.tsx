import { SignleCar } from "@/components/cars";
import { sanityFetch } from "@/sanity/lib/client";
import { authenticate,  getSautoCar, listOfEquipment } from "@/lib/sauto";
import { getCar } from "@/sanity/lib/query";
import { SanityCar } from "@/types";

export default async function CarPage({ params }: { params: Promise<{ id: string}> }){
    const session = await authenticate()
    const param = await params
    const id = Number(param.id)
    const equipments:number[] = []
    if(!session) throw Error("Nepodařilo se prihlasit")
    const [car, carSanity, eq] = await Promise.all([
        getSautoCar(session,id),
        sanityFetch<SanityCar>({ query: getCar, params: {id} }),
        listOfEquipment(session, id),
    ])
    console.log("Equipment",eq.output.equipment)
    if(eq.output.equipment){
        for (const c of Object.values(eq.output.equipment)) {
        equipments.push(Number(c))
    }
    }
    return (
        <SignleCar car={car.output} images={carSanity} eq={equipments}/>
    )
}