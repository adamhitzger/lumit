"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image";
import Link from "next/link";
import {content} from "@/lib/content"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";

export default function Navbar(){
    const params = useSearchParams();
    const lang = params.get("lang") || "cs";
    const en = lang === "en"
    const obsah = content[lang as keyof typeof content] || content.cs
    const pathname = usePathname()
    return(
        <nav className="w-full flex flex-row bg-black p-3 justify-between items-center z-5002 sticky top-0 left-0 text-white">
            <Link href={en ? "/?lang=en" : "/?lang=cs"}>
            <Image src={"/logo.png"} alt="Logo Autobazaru Lumit" width={250} height={80}/>
            </Link>

            <div className="hidden sm:flex flex-row space-x-5  w-fit items-center text-2xl">
                {obsah.nav.map((l,i: number) => (
                    <Link key={i} href={l.link}>
                        {l.name}
                    </Link>
                ))}
               <Link href={lang === "cs" ? `${pathname}?lang=en` : `${pathname}?lang=cs`} className="rounded-full bg-white text-black h-fit px-2 py-1 text-lg ">
            {en ?"CZ": "EN" }
        </Link> 
            </div>
             <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-9 w-9 flex sm:hidden"/>
      </SheetTrigger>
      <SheetContent className="bg-black p-4">
                {obsah.nav.map((l,i: number) => (
                    <Link className="text-white font-medium text-2xl" key={i} href={l.link}>
                        {l.name}
                    </Link>
                ))}
               <Link href={lang === "cs" ? pathname+"/?lang=en" : pathname+"/?lang=cs"} className="rounded-full bg-white h-fit text-black  w-fit px-2 py-1 text-2xl ">
            {en ?"CZ": "EN" }
        </Link> 
      </SheetContent>
    </Sheet>
        </nav>
    )
}