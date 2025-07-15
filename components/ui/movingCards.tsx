"use client";

import { cn } from "@/lib/utils";
import { Reviews } from "@/types";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StarIcon } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Reviews;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
    const searchParams = useSearchParams()
    const lang = searchParams.get("lang") as string
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [reviews , 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setReviews  
    ] = useState<Reviews>(items)
 
  const [start, setStart] = useState(false);
 
  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);
  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);
  
  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {reviews.map((item, idx) => (
            
          <li
            className="w-[350px] max-w-full relative rounded-2xl shrink-0 text-black  md:w-[450px]"
            
            key={idx}
          >
            <Link href={item.author_url ? item.author_url : "https://www.google.com/search?client=safari&sa=X&sca_esv=87161b55b482f184&biw=808&bih=836&tbm=lcl&q=lumit%20company%20sro%20recenze&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2M7KwsDAztDQ0sDAwMzMxNja13MDI-IpRMqc0N7NEITk_tyAxr1KhuChfoSg1OTWvKnURK245APPF71NSAAAA&rldimm=6288861910806643359&hl=cs-CZ&ved=0CAcQ5foLahcKEwjg16ub3aeOAxUAAAAAHQAAAAAQCg#lkt=LocalPoiReviews&arid=ChdDSUhNMG9nS0VJQ0FnTUNvLWNTeXl3RRAB"}>
            <div  className="relative bg-gray-300 w-full min-h-64 rounded-xl">
                    <div className="absolute top-0 left-0 p-1 h-full flex w-full flex-col justify-evenly px-5 rounded-xl backdrop-blur-2xl z-20 backdrop_filter">
                    <div className="text-center relative z-20 text-sm leading-[1.6]  font-normal">
                <p>{item.text && item.ajText ?lang === "en" ? ( item.ajText.length>125 ? item.ajText.substring(0,125) + "...": item.ajText ): item.text.length>125 ? item.text.substring(0,125) + "...": item.text : null }</p>
              </div>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                <span className=" text-sm leading-[1.6] flex flex-row font-normal">
                    {Array.from({length: item.rating}).map((_,i) => (
                        <StarIcon key={i}  color="#f6e05e" fill="#f6e05e"/>
                    ))}
                  </span>
                    <div className="flex flex-row space-x-2 items-center">
                   
                    
                     <span className=" text-sm leading-[1.6]  font-normal">
                    {item.author_name}
                  </span>
                    </div>
                </span>
              </div>
                      </div>
                    
                      <div className="absolute right-0 bottom-0 w-32 h-32 bg-red-400 z-0 rounded-full">
                      </div>
                </div>
            </Link>
          </li>
         
        ))}
      </ul>
    </div>
  );
};
