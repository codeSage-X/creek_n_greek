"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const rootRef = useRef<HTMLElement | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

   const reviewsContainerRef = useRef<HTMLDivElement>(null)

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

  // Fetch reviews from Google Sheets
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews')
        const data = await res.json()
        setReviews(data || [])
      } catch (err) {
        console.error('Failed to fetch reviews', err)
      } finally {
        setLoadingReviews(false)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
  if (!reviewsContainerRef.current) return

  const reviewCards = reviewsContainerRef.current.querySelectorAll('.review-card')

  // GSAP animation: fade + slide up
  gsap.fromTo(
    reviewCards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    }
  )
}, [currentPage, reviews])

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
      <section className="py-24 bg-muted/20 animate-onscroll">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif font-bold mb-4">What People Are Saying</h2>
      <p className="text-foreground/70 font-light">See the experiences our guests have shared</p>
    </div>

    {loadingReviews ? (
      <p className="text-center text-foreground/60">Loading reviews...</p>
    ) : reviews.length === 0 ? (
      <p className="text-center text-foreground/60">No reviews yet. Be the first to leave one!</p>
    ) : (
      <>
        {/* Paginated Reviews */}
<div ref={reviewsContainerRef} className="grid md:grid-cols-3 gap-8">
  {reviews
    .slice(currentPage * 6, currentPage * 6 + 6)
    .map((review, index) => (
      <Card key={index} className="p-6 border border-border hover:border-foreground/50 transition-colors review-card">
        <div className="flex items-center mb-4">
          <span className="font-semibold mr-2">{review.name}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < review.stars ? 'text-yellow-400' : 'text-foreground/50'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-foreground/70">{review.feedback}</p>
      </Card>
    ))}
</div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-4">
          <Button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center text-foreground/70">
            Page {currentPage + 1} of {Math.ceil(reviews.length / 6)}
          </span>
          <Button
            disabled={currentPage >= Math.ceil(reviews.length / 6) - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </>
    )}
  </div>
</section>

      <CTASection />
      <Footer />
    </main>
  )
}
