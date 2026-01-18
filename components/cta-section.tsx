import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">Ready to Experience Luxury?</h2>
        <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
          Book your unforgettable experience at Creek'n'Greek today and discover a new definition of luxury.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/2347060893264" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-amber-500">
              Book Your Experience
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
          <Link href="/events">
            <Button size="lg" variant="outline">
              View Upcoming Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
