"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import "react-social-icons/facebook"
import { SocialIcon } from "react-social-icons/component"

const DELAY_MS = 7000
const MAX_WIDTH = 500
// FB plugin se pod 350 px nezmenší – užší iframe by obsah jen ořízl.
const MIN_WIDTH = 350
// Vnitřní padding karty + její odstup od okrajů viewportu (mobil má oboje menší).
const CHROME_MOBILE = 32
const CHROME_DESKTOP = 48 + 32
// Navbar běží na z-5002, modal musí být nad ním.
const Z_OVERLAY = 5100

// Sanity ukládá rovnou plugin URL (facebook.com/plugins/post.php?...&width=500).
// Plugin se vykreslí přesně na šířku z query parametru, takže ji na mobilu přepíšeme.
function withWidth(src: string, width: number) {
  try {
    const url = new URL(src)
    url.searchParams.set("width", String(width))
    return url.toString()
  } catch {
    return src
  }
}

export default function FbPopup({ fbpost }: { fbpost?: string }) {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(MAX_WIDTH)
  const params = useSearchParams()
  const lang = params.get("lang") || "cs"

  const t =
    lang === "en"
      ? {
          badge: "New",
          title: "We have a new post",
          subtitle: "See what's new on our Facebook",
          close: "Close",
        }
      : {
          badge: "Novinka",
          title: "Máme nový příspěvek",
          subtitle: "Podívejte se, co je nového na našem Facebooku",
          close: "Zavřít",
        }

  useEffect(() => {
    if (!fbpost) return
    const timer = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [fbpost])

  useEffect(() => {
    const resize = () => {
      const chrome = window.innerWidth < 640 ? CHROME_MOBILE : CHROME_DESKTOP
      const available = window.innerWidth - chrome
      setWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, available)))
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  if (!fbpost) return null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          style={{ zIndex: Z_OVERLAY }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        />

        <DialogPrimitive.Content
          aria-describedby={undefined}
          style={{ zIndex: Z_OVERLAY + 1 }}
          className="fixed left-1/2 top-1/2 flex max-h-[85vh] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-2xl duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Close
            aria-label={t.close}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-neutral-600 shadow-md transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <XIcon className="size-5" />
          </DialogPrimitive.Close>

          <div className="flex shrink-0 items-center gap-3 border-b border-neutral-200 py-5 pl-4 pr-14 sm:pl-6">
            <SocialIcon
              as="div"
              network="facebook"
              style={{ height: 44, width: 44 }}
              className="shrink-0"
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                  {t.badge}
                </span>
              </div>

              <DialogPrimitive.Title className="mt-1 text-lg font-semibold leading-tight text-neutral-900">
                {t.title}
              </DialogPrimitive.Title>

              <p className="mt-0.5 text-sm text-neutral-500">{t.subtitle}</p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto px-2 py-5 sm:px-6">
            <iframe
              src={withWidth(fbpost, width)}
              width={width}
              height={600}
              className="block border-0"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={t.title}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
