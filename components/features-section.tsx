"use client"

import { Card } from "@/components/ui/card"
import { Waves, Wind, Sparkles, ChefHat } from "lucide-react"

const features = [
  {
    icon: Waves,
    title: "Poolside Lounge",
    description: "Relax by our stunning infinity pool with premium amenities and refreshing cocktails",
  },
  {
    icon: Wind,
    title: "Rooftop Experience",
    description: "Enjoy panoramic views of Port Harcourt from our exclusive rooftop lounge",
  },
  {
    icon: Sparkles,
    title: "Exclusive Events",
    description: "Host unforgettable events in our state-of-the-art venues designed for elegance",
  },
  {
    icon: ChefHat,
    title: "Premium Dining",
    description: "Indulge in world-class cuisine prepared by our expert culinary team",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">Why Choose Us</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Experience luxury redefined with world-class amenities and impeccable service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
              >
                <div className="mb-4 p-4 bg-background rounded-lg w-fit group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-light mb-2 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
