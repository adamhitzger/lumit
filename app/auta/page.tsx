import { Cars } from "@/components/cars";
import { getSautoCardCar} from "@/lib/sauto";

export default async function CarsPage(){
    const carsLen = await getSautoCardCar(0,100)
    carsLen.cars.reverse()
    console.log("Length:",carsLen.cars.length)
    return(
        <Cars cars={carsLen.cars}/>
    )
}