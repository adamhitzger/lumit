"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { cars } from "@/lib/sAutoLists";
import { formUrlQuery } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { content } from "@/lib/content";

export default function Filters(){
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "cs"
    const [active, setActive] = useState<number>(0);
     const [price, setPrice] = useState<[number]>([1000000]);
      const [priceAd, setPriceAd] = useState<string>("");
    const router = useRouter()
     const obsah = content[lang as keyof typeof content].filters || content.cs.filters
    const handleTypeClick = (item: number) => {
        if (active === item) {
            setActive(0);

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'filter',
                value: null
            })

            router.push(newUrl, { scroll: false });
        } else {
            setActive(item);

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'filter',
                value: String(item)
            })

            router.push(newUrl, { scroll: false });
        }
    }
    const handlePriceClick = (item: [number]) => {
        if (price[0] === item[0]) {
            setPrice([0]);

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'price',
                value: null
            })

            router.push(newUrl, { scroll: false });
        } else {
            setPrice(item);

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'price',
                value: String(item)
            })

            router.push(newUrl, { scroll: false });
        }
    }

    const handlePriceAdClick = (item: string) => {
        if (priceAd === item) {
            setPriceAd("");

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'priceADsc',
                value: null
            })

            router.push(newUrl, { scroll: false });
        } else {
            setPriceAd(item);

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'priceADsc',
                value: String(item)
            })

            router.push(newUrl, { scroll: false });
        }
    }
    
    return(
       <article className="w-full flex gap-4 flex-col">
        <div className="w-full flex flex-row overflow-x-scroll space-x-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 py-3">
            {cars.map((c) => (
                <Button key={c.id} onClickCapture={() => handleTypeClick(c.id)}>
                    {c.name}
                </Button>
            ))}
        </div>
        <div className="w-full flex flex-row flex-wrap gap-3">
        <div className="w-fit flex flex-row  space-x-4 px-5">
            <div className="w-42 my-auto  space-y-2">
                <Slider min={20000} max={2500000} step={1} defaultValue={[1000000]} onValueChange={(e) => handlePriceClick(e as [number])}/>
                <span>Cena do: {price[0].toLocaleString("cs-CZ")} Kč</span>
            </div>
        </div>
        <div className="w-fit flex flex-row overflow-x-scroll space-x-4 [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300">
           
                <Button onClickCapture={() => handlePriceAdClick("priceAsc")}>
                    {obsah.priceAsc}
                </Button>

                 <Button onClickCapture={() => handlePriceAdClick("priceDesc")}>
                    {obsah.priceDesc}
                </Button>
                <Button className="my-auto bg-black text-white" onClickCapture={() => router.push("/auta", { scroll: false })}>
                    {obsah.clear}
                </Button>
        </div>
         
                </div>
       </article>
    )
}