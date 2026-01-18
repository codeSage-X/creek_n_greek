"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Award, Users, MapPin, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 20, suffix: "+", label: "Food & Drinks" },
  { value: 50, suffix: "+", label: "Luxury Suites" },
  { value: 500, suffix: "+", label: "Happy Guests" },
  { value: 24, suffix: "/7", label: "Premium Service" },
]

const reasons = [
  {
    icon: Award,
    title: "Premium Ambiance",
    description: "Meticulously curated spaces designed for elegance and comfort",
  },
  {
    icon: Zap,
    title: "Exclusive Events",
    description: "State-of-the-art venues perfect for any occasion",
  },
  {
    icon: Users,
    title: "Top-tier Service",
    description: "Dedicated staff committed to exceeding expectations",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Centrally located in GRA Phase 3, Port Harcourt",
  },
]

export default function About() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const statsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    // Fade-in sections on scroll
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      )
    })

    // Stats count-up animation
    statsRef.current.forEach((el, index) => {
      const stat = stats[index]
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: stat.value,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: function () {
            el.innerText =
              Math.floor(Number(el.innerText)).toString() + stat.suffix
          },
        }
      )
    })
  }, [])

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-28 bg-gradient-to-b from-card to-background text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6">
          Our Story
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Discover the passion and dedication behind Creek'n'Greek Luxury Resorts
        </p>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span
                ref={(el) => {
                  if (el) statsRef.current[i] = el
                }}
                className="text-4xl md:text-5xl font-serif text-foreground"
              >
                0{stat.suffix}
              </span>
              <p className="mt-3 text-sm uppercase tracking-widest text-foreground/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el)
        }}
        className="py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-serif font-light text-foreground mb-6">
              Where Luxury Meets Nature
            </h2>
            <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
              Nestled in the heart of Port Harcourt, Creek'n'Greek represents the pinnacle of luxury resort
              experiences. Our journey began with a simple vision: to create a sanctuary where guests can escape the
              ordinary and embrace the extraordinary.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Every detail, from cascading pools to rooftop lounges, has been carefully crafted to deliver elegance,
              comfort, and unforgettable moments.
            </p>
          </div>
          <img
            src="/placeholder.png"
            alt="Luxury Resort"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el)
        }}
        className="py-24 bg-card"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="p-10 bg-background">
            <h3 className="text-2xl font-serif mb-4">Our Mission</h3>
            <p className="text-foreground/70 leading-relaxed">
              To deliver exceptional hospitality experiences that exceed expectations, combining world-class amenities
              with personalized service in an atmosphere of timeless elegance.
            </p>
          </Card>

          <Card className="p-10 bg-background">
            <h3 className="text-2xl font-serif mb-4">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed">
              To be recognized as the premier luxury destination in Port Harcourt, setting the standard for upscale
              hospitality and creating lasting memories for every guest.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el)
        }}
        className="py-28 bg-background"
      >
        <h2 className="text-4xl font-serif font-light text-center text-foreground mb-20">
          Why Choose Creek'n'Greek
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <Card key={i} className="p-8 text-center">
                <div className="flex justify-center mb-5">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-2">{reason.title}</h3>
                <p className="text-sm text-foreground/70">{reason.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
