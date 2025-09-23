import Header from "@/components/header";
import { Suspense } from "react";
import About from "@/components/about";
import Services from "@/components/services";
import {  getSautoCardCar} from "@/lib/utils";
import Contact from "@/components/contact";
import { sanityFetch } from "@/sanity/lib/client";
import { getAbout} from "@/sanity/lib/query";
import { About as AboutType} from "@/types";
import NewestCars from "@/components/cars";

export default async function Home() {
 const about: AboutType  = await sanityFetch({ query: getAbout });
 const cars = await getSautoCardCar(0,100)
 const isDisCars = cars.discountCars.length >0
 console.log("Length",cars.cars.length)
  cars.cars.reverse();
 return (
      <Suspense>
        <Header cars={isDisCars ? cars.discountCars.slice(0,5): cars.cars.slice(0,5)}/>
        <NewestCars cars={isDisCars ? cars.cars.slice(0,5): cars.cars.slice(6,11)}/>
        <About images={about}/>
        <Services/>
        <Contact/>
      </Suspense>
  );
}