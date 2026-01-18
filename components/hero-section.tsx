"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [soundOn, setSoundOn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gsap) {
      const gsap = (window as any).gsap

      gsap.set(".hero-logo", { opacity: 0, scale: 0.8 })
      gsap.set(".hero-title", { opacity: 0, y: 20 })
      gsap.set(".hero-cta", { opacity: 0, y: 20 })

      gsap
        .timeline()
        .to(".hero-logo", { opacity: 1, scale: 1, duration: 0.8 }, 0)
        .to(".hero-title", { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.8 }, 0.4)
    }
  }, [])

  const enableSound = () => {
    if (!videoRef.current) return

    videoRef.current.muted = false
    videoRef.current.volume = 1
    videoRef.current.play()

    setSoundOn(true)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background pt-0">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/vid.mp4"
        title="Hero Video Background"
        style={{ border: "none" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Enable Sound Button */}
      {!soundOn && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <Button
            onClick={enableSound}
            className="bg-white/90 text-black hover:bg-white backdrop-blur px-6 py-3 text-sm tracking-wide"
          >
            🔊 Enable Sound
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="hero-logo mb-8">
          <Image
            src="/images/cg-official-logo-scaled.png"
            alt="Creek'n'Greek Luxury Resorts Logo"
            width={120}
            height={120}
            priority
            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Title */}
        <div className="hero-title text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wide mb-4 text-white drop-shadow-lg">
            Creek&apos;n&apos;Greek
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-amber-300 font-serif tracking-widest drop-shadow-md">
            LUXURY RESORTS
          </p>
        </div>

        {/* CTA */}
        <div className="hero-cta mt-12 flex flex-col sm:flex-row gap-4">
          <a href="#about">
            {/* <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-background px-8 py-3 text-lg bg-transparent"
            >
              Explore
            </Button> */}
             <Button 
             variant="outline"
             className="border-white text-white hover:bg-white hover:text-background bg-transparent hover:bg-amber-500 w-38 px-8 py-3 text-lg">
              Explore
            </Button>
          </a>

          <a
            href="https://wa.me/2347060893264"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary text-primary-foreground hover:bg-amber-500  w-38 px-8 py-3 text-lg">
              Book Now
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 14l-7 7-7-7M12 21V3" />
        </svg>
      </div>
    </section>
  )
}
