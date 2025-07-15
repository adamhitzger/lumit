import Header, { HeaderSkeleton } from "@/components/header";
import { Suspense } from "react";
import About from "@/components/about";
import Services from "@/components/services";
import ReviewsComp from "@/components/reviews";
import {  getSautoCardCar} from "@/lib/utils";
import Contact from "@/components/contact";
import { sanityFetch } from "@/sanity/lib/client";
import { getAbout, reviews_query} from "@/sanity/lib/query";
import { About as AboutType, Reviews } from "@/types";
import NewestCars from "@/components/cars";

export default async function Home() {
 const about: AboutType  = await sanityFetch({ query: getAbout });
 const cars = await getSautoCardCar()
 console.log("Length",cars.cars.length)
 const reviews = await sanityFetch<Reviews>({query: reviews_query});
 cars.cars.reverse();
 return (
      <Suspense fallback={<HeaderSkeleton/>}>
        <Header cars={cars.cars.slice(0,9)}/>
        <NewestCars cars={cars.cars.slice(10,20)}/>
        <About images={about}/>
        <Services/>
        <ReviewsComp items={reviews} />
        <Contact/>
      </Suspense>
  );
}