"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    email: "",
    phone: "",
    additionalDetails: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
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
    setMounted(true)
    // GSAP animations using ScrollTrigger (play once)
    let ctx: any
    const initGsap = async () => {
      try {
        const gsapModule = await import("gsap")
        const scrollTriggerModule = await import("gsap/ScrollTrigger")
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.from(".contact-hero h1", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            scrollTrigger: {
              trigger: ".contact-hero h1",
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          })

          gsap.from(".contact-hero p", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: ".contact-hero p",
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          })

          gsap.from(".contact-card", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.4,
            scrollTrigger: {
              trigger: ".contact-card",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          })
        }, rootRef.current || document)
      } catch (err) {
        // Fallback: if dynamic import fails, try window.gsap without ScrollTrigger
        if (typeof window !== "undefined" && window.gsap) {
          const gsap = window.gsap
          if (gsap && gsap.context) {
            ctx = gsap.context(() => {
              gsap.from(".contact-hero h1", { opacity: 0, y: 20, duration: 0.8 })
              gsap.from(".contact-hero p", { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
              gsap.from(".contact-card", { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, delay: 0.4 })
            }, document)
          }
        }
      }
    }

    initGsap()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setFormData({ fullName: "", specialty: "", email: "", phone: "", additionalDetails: "" })
    setIsSubmitting(false)
  }

  return (
    <main ref={rootRef} className="overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[45vh] bg-gradient-to-b from-card to-background flex items-center justify-center py-12 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <img src="/luxury-office-workspace.jpg" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="contact-hero relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center z-10">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/50 bg-primary/10">
              <span className="text-primary text-sm font-medium">Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-4 md:mb-6">
              We are always available
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Have questions or need more information? Our dedicated team is here to help make your experience
              unforgettable.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">
                Your journey starts here
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Connect with us and let's create something extraordinary together
              </p>
            </div>

            {/* Contact Cards and Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Information Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <Card className="contact-card bg-card border-border p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-serif font-light text-foreground mb-2">Email Us</h3>
                      <a
                        href="mailto:contact@creekngreek.com"
                        className="text-foreground/70 hover:text-primary transition-colors break-all"
                      >
                        contact@creekngreek.com
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Phone Card */}
                <Card className="contact-card bg-card border-border p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-serif font-light text-foreground mb-2">Call Us</h3>
                      <a href="tel:+2347060893264" className="text-foreground/70 hover:text-primary transition-colors">
                        +234 706 0893 264
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Location Card */}
                <Card className="contact-card bg-card border-border p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-serif font-light text-foreground mb-2">Visit Us</h3>
                      <p className="text-foreground/70">
                        Port Harcourt, Rivers State
                        <br />
                        Nigeria
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="contact-card bg-card border-border p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name and Specialty */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                          Full name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="specialty" className="block text-sm font-medium text-foreground mb-2">
                          Specialty <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          placeholder="Event Organizer"
                          required
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
                        />
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+234 XXX XXX XXXX"
                          required
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
                        />
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground mb-2">
                        Additional Details
                      </label>
                      <textarea
                        id="additionalDetails"
                        name="additionalDetails"
                        value={formData.additionalDetails}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition resize-none"
                      />
                      <div className="text-right text-xs text-foreground/50 mt-2">
                        {formData.additionalDetails.length}/1000
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 md:py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">
              Ready to plan your perfect event?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Let our team help you create memories that will last a lifetime
            </p>
            <a
              href="https://wa.me/2347060893264"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 md:py-4 rounded-lg transition-all duration-300"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
