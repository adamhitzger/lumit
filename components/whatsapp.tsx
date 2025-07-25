"use client"
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/whatsapp"

export default function WhatsAppButton(){
    return(
         <button
        className="fixed bottom-6 right-6 z-40 rounded-full  text-primary items-center justify-center flex flex-row shadow-lg"
      >
        <SocialIcon url={"https://wa.me/+420777820080?text=Dobrý%20den%2C%20jmenuji%20se"} target='_blank' network={"whatsapp"} />
      </button>
    )
}