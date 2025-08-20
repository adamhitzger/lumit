"use client"
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/whatsapp"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function WhatsAppButton(){
  useEffect(() => {

  const ctx = gsap.context(() => {
  ScrollTrigger.create({
    trigger: "#footer",
    start: "top bottom",   // jakmile top paty vstoupí do spodku viewportu
    onEnter: () => gsap.to("#whatsapp", {autoAlpha: 0, y: 0, duration: 0.25, ease: "power2.out"}),
    onLeaveBack: () => gsap.to("#whatsapp", {autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out"}),
   });
  })
  return () => ctx.revert();
  }, [])
    return(
         <button id="whatsapp"
        className="fixed bottom-6 right-6 z-40 rounded-full  text-primary items-center justify-center flex flex-row shadow-lg"
      >
        <SocialIcon url={"https://wa.me/+420608170008?text=Dobrý%20den%2C%20jmenuji%20se"} target='_blank' network={"whatsapp"} />
      </button>
    )
}