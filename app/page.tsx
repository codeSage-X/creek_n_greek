"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const router = useRouter()
  const rootRef = useRef<HTMLElement | null>(null)

  // Kill ScrollTrigger on route change
  useEffect(() => {
    const handleRouteChange = async () => {
      try {
        const scrollTriggerModule = await import("gsap/ScrollTrigger")
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
      } catch (err) {
        // Silently fail if ScrollTrigger is not available
      }
    }

    router.prefetch("href")
    window.addEventListener("beforeunload", handleRouteChange)

    return () => {
      window.removeEventListener("beforeunload", handleRouteChange)
    }
  }, [router])

  useEffect(() => {
    let ctx: any
    const init = async () => {
      try {
        const gsapModule = await import("gsap")
        const scrollTriggerModule = await import("gsap/ScrollTrigger")
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.utils.toArray("section", rootRef.current).forEach((section: any) => {
            gsap.from(section, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
            })
          })
        }, rootRef.current || document)
      } catch (err) {
        // Fallback to window.gsap if available
        if (typeof window !== "undefined" && window.gsap) {
          const gsap = window.gsap
          if (gsap && gsap.context) {
            ctx = gsap.context(() => {
              gsap.utils.toArray("section", rootRef.current).forEach((section: any) => {
                gsap.from(section, { opacity: 0, y: 30, duration: 0.8 })
              })
            }, rootRef.current || document)
          }
        }
      }
    }

    init()

    return () => {
      ctx?.revert && ctx.revert()
      // Explicitly kill ScrollTrigger instances on unmount
      try {
        import("gsap/ScrollTrigger").then((scrollTriggerModule) => {
          const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule
          ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
        })
      } catch (err) {
        // Silently fail if ScrollTrigger is not available
      }
    }
  }, [])

  return (
    <main ref={rootRef} className="overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <HeroSection />
      </div>
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                Creek'n'Greek stands as a beacon of luxury and sophistication in Port Harcourt. Founded with a vision to
                redefine hospitality, we blend timeless elegance with modern amenities to create unforgettable
                experiences.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                From intimate gatherings to grand celebrations, our premium venues and expert team ensure every moment
                is perfection. Welcome to where luxury meets paradise.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/placeholder.png"
                alt="Creek'n'Greek Resort"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
