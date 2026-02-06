"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [soundOn, setSoundOn] = useState(false)
  const [activeHover, setActiveHover] = useState<"creek" | "imperial" | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gsap) {
      const gsap = (window as any).gsap

      gsap.set(".creek-content", { opacity: 0, x: -50 })
      gsap.set(".imperial-content", { opacity: 0, x: 50 })
      gsap.set(".divider-line", { scaleY: 0 })

      gsap.timeline()
        .to(".creek-content", { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 0.3)
        .to(".imperial-content", { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 0.5)
        .to(".divider-line", { scaleY: 1, duration: 0.8, ease: "power2.out" }, 0.6)
    }
  }, [])

  const toggleSound = () => {
    if (!videoRef.current) return
    const video = videoRef.current
    if (soundOn) {
      video.muted = true
      setSoundOn(false)
    } else {
      video.muted = false
      video.volume = 1
      video.play()
      setSoundOn(true)
    }
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"  
        poster="/video-poster.png"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        src="/vid.mp4"
      />

      {/* Main Container - Always flex-row */}
      <div className="relative z-10 min-h-screen flex flex-row">
        
        {/* Creek'n'Greek Side */}
        <div 
          className={`creek-side relative flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-12 transition-all duration-500 ${
            activeHover === "imperial" ? "lg:flex-[0.85]" : activeHover === "creek" ? "lg:flex-[1.15]" : ""
          }`}
          onMouseEnter={() => setActiveHover("creek")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Creek Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-amber-900/60 transition-opacity duration-500 ${
            activeHover === "creek" ? "opacity-20" : "opacity-0"
          }`} />
          
          {/* Creek Content */}
          <div className="creek-content relative z-10 text-center flex flex-col items-center">
            {/* Logo */}
            <div className={`mb-3 sm:mb-4 lg:mb-6 transition-transform duration-500 ${activeHover === "creek" ? "scale-110" : ""}`}>
              <Image
                src="/images/cg-official-logo-scaled.png"
                alt="Creek'n'Greek Luxury Resorts Logo"
                width={160}
                height={160}
                priority
                className="w-30 h-30 sm:w-30 sm:h-30 md:w-28 md:h-28 lg:w-36 lg:h-36 object-cover drop-shadow-2xl"
              />
            </div>

            {/* Title */}
            <h1 className="text-base sm:text-2xl md:text-4xl lg:text-6xl font-serif font-light tracking-wide mb-1 text-white drop-shadow-lg">
              Creek&apos;n&apos;Greek
            </h1>
            <p className="text-[10px] sm:text-sm md:text-lg lg:text-xl text-[#ffffff] font-serif tracking-[0.1em] sm:tracking-[0.2em] mb-1 drop-shadow-md">
              LUXURY RESORTS
            </p>
            <p className="text-[8px] sm:text-xs text-white/60 tracking-wider sm:tracking-widest mb-3 sm:mb-6 lg:mb-8 hidden sm:block">
              Experience Waterfront Paradise
            </p>

            {/* CTA */}
            <a href="#about">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2 lg:py-3 text-[10px] sm:text-sm lg:text-lg tracking-wide shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                Explore Creek
              </Button>
            </a>
          </div>
        </div>

        {/* Center Divider - Always visible */}
        <div className="flex items-center justify-center relative z-20 opacity-40">
          <div className="divider-line w-px h-[40%] sm:h-[50%] lg:h-[60%] bg-gradient-to-b from-transparent via-white/50 to-transparent origin-center" />
          <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-white/80 shadow-lg shadow-white/30" />
        </div>

        {/* Greek Imperial Side */}
        <div 
          className={`imperial-side relative flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-12 transition-all duration-500 ${
            activeHover === "creek" ? "lg:flex-[0.85]" : activeHover === "imperial" ? "lg:flex-[1.15]" : ""
          }`}
          onMouseEnter={() => setActiveHover("imperial")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Imperial Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-bl from-neutral-900/80 via-black/90 to-black/90 transition-opacity duration-500 ${
            activeHover === "imperial" ? "opacity-20" : "opacity-0"
          }`} />
          
          {/* Imperial Content */}
          <div className="imperial-content relative z-10 text-center flex flex-col items-center">
            {/* Logo */}
            <a 
              href="https://greek-imperial.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`mb-3 sm:mb-4 lg:mb-6 transition-transform duration-500 cursor-pointer ${activeHover === "imperial" ? "scale-110" : ""}`}
            >
              <Image
                src="/images/imperial_logo.png"
                alt="Greek Imperial Logo"
                width={160}
                height={160}
                priority
                className="w-30 h-30 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover drop-shadow-2xl hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300"
              />
            </a>

            {/* Title */}
            <h2 className="text-base sm:text-2xl md:text-4xl lg:text-6xl font-serif font-light tracking-wide mb-1 text-white drop-shadow-lg">
              Greek Imperial
            </h2>
            <p className="text-[10px] sm:text-sm md:text-lg lg:text-xl text-neutral-300 font-serif tracking-[0.1em] sm:tracking-[0.2em] mb-1 drop-shadow-md">
              — EST. 2025 —
            </p>
            <p className="text-[8px] sm:text-xs text-white/60 tracking-wider sm:tracking-widest mb-3 sm:mb-6 lg:mb-8 hidden sm:block">
              Elevated Luxury Experience
            </p>

            {/* CTA */}
            <a 
              href="https://greek-imperial.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-white text-black hover:bg-neutral-200 border-2 border-white px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2 lg:py-3 text-[10px] sm:text-sm lg:text-lg tracking-wide shadow-lg hover:shadow-white/20 transition-all duration-300 font-medium"
              >
                Discover Imperial
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        aria-label="Toggle sound"
        className="fixed top-24 right-4 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
      >
        {soundOn ? (
          <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        ) : (
          <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}