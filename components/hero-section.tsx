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
      {/* Background Video - Full */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        src="/vid.mp4"
      />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        
        {/* Creek'n'Greek Side */}
        <div 
          className={`creek-side relative flex-1 flex flex-col items-center justify-center p-8 lg:p-12 transition-all duration-500 ${
            activeHover === "imperial" ? "lg:flex-[0.85]" : activeHover === "creek" ? "lg:flex-[1.15]" : ""
          }`}
          onMouseEnter={() => setActiveHover("creek")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Creek Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-amber-900/60 via-black/50 to-black/70 transition-opacity duration-500 ${
            activeHover === "creek" ? "opacity-90" : "opacity-70"
          }`} />
          
          {/* Creek Content */}
          <div className="creek-content relative z-10 text-center flex flex-col items-center py-16 lg:py-0">
            {/* Logo */}
            <div className={`mb-6 transition-transform duration-500 ${activeHover === "creek" ? "scale-110" : ""}`}>
              <Image
                src="/images/cg-official-logo-scaled.png"
                alt="Creek'n'Greek Luxury Resorts Logo"
                width={140}
                height={140}
                priority
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide mb-2 text-white drop-shadow-lg">
              Creek&apos;n&apos;Greek
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-amber-400 font-serif tracking-[0.2em] mb-2 drop-shadow-md">
              LUXURY RESORTS
            </p>
            <p className="text-xs sm:text-sm text-white/60 tracking-widest mb-8">
              Experience Waterfront Paradise
            </p>

            {/* CTA */}
            <a href="#about">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-8 sm:px-10 py-3 text-base sm:text-lg tracking-wide shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                Explore Creek
              </Button>
            </a>
          </div>
        </div>

        {/* Center Divider - Desktop */}
        <div className="hidden lg:flex items-center justify-center relative z-20">
          <div className="divider-line w-px h-[60%] bg-gradient-to-b from-transparent via-white/50 to-transparent origin-center" />
          <div className="absolute w-3 h-3 rounded-full bg-white/80 shadow-lg shadow-white/30" />
        </div>

        {/* Mobile Divider */}
        <div className="lg:hidden flex items-center justify-center py-4 relative z-20">
          <div className="w-[60%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute w-2 h-2 rounded-full bg-white/80" />
        </div>

        {/* Greek Imperial Side */}
        <div 
          className={`imperial-side relative flex-1 flex flex-col items-center justify-center p-8 lg:p-12 transition-all duration-500 ${
            activeHover === "creek" ? "lg:flex-[0.85]" : activeHover === "imperial" ? "lg:flex-[1.15]" : ""
          }`}
          onMouseEnter={() => setActiveHover("imperial")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Imperial Overlay - Darker, more elegant */}
          <div className={`absolute inset-0 bg-gradient-to-bl from-neutral-900/80 via-black/70 to-black/80 transition-opacity duration-500 ${
            activeHover === "imperial" ? "opacity-95" : "opacity-80"
          }`} />
          
          {/* Imperial Content */}
          <div className="imperial-content relative z-10 text-center flex flex-col items-center py-16 lg:py-0">
            {/* Logo */}
            <a 
              href="/https://greek-imperial.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`mb-6 transition-transform duration-500 cursor-pointer ${activeHover === "imperial" ? "scale-110" : ""}`}
            >
              <Image
                src="/images/imperial_logo.png"
                alt="Greek Imperial Logo"
                width={160}
                height={160}
                priority
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain drop-shadow-2xl hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300"
              />
            </a>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide mb-2 text-white drop-shadow-lg">
              Greek Imperial
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-serif tracking-[0.2em] mb-2 drop-shadow-md">
              — EST. 2025 —
            </p>
            <p className="text-xs sm:text-sm text-white/60 tracking-widest mb-8">
              Elevated Luxury Experience
            </p>

            {/* CTA - Black & White Theme */}
            <a 
              href="https://greek-imperial.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-white text-black hover:bg-neutral-200 border-2 border-white px-8 sm:px-10 py-3 text-base sm:text-lg tracking-wide shadow-lg hover:shadow-white/20 transition-all duration-300 font-medium"
              >
                Discover Imperial
              </Button>
            </a>
          </div>
        </div>
      </div>

  
         {/* 🔊 Sound Toggle – Top Right */}
      <button
        onClick={toggleSound}
        aria-label="Toggle sound"
        className="
          fixed top-24 right-6 z-50
          w-12 h-12 rounded-full
          bg-black/60 backdrop-blur-md
          border border-white/30
          flex items-center justify-center
          hover:bg-white/10
          transition-all duration-300
        "
      >
        {soundOn ? (
          <Volume2 className="h-5 w-5 text-white" />
        ) : (
          <VolumeX className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white/70"
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