import { Cars } from "@/components/cars";
import PaginationComp from "@/components/pagination";
import {  getSautoCardCar} from "@/lib/utils";

export default async function CarsPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }){
 
    const PAGE_SIZE = 10;
    const searchParams = await props.searchParams
    const currentPage = parseInt(searchParams.page || '1');
    const size = currentPage > 1 ? PAGE_SIZE + 1 : PAGE_SIZE;
    const start = currentPage > 1 ? (size*currentPage)+1 : size*currentPage;
    const cars = await getSautoCardCar(start,PAGE_SIZE)
    const carsLen = await getSautoCardCar()
    console.log("Length:",carsLen.cars.length)
    return(
        <>
        <Cars cars={cars.cars}/>
        <PaginationComp currentPage={currentPage}  />
        </>
    )
}