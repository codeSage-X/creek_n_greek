"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const menuCategories = [
  {
    name: "Appetizers",
    items: [
      { name: "Grilled Shrimp Skewers", description: "Fresh shrimp with citrus glaze", price: "$12" },
      { name: "Truffle Mushroom Toast", description: "Crispy bread with black truffle oil", price: "$10" },
      { name: "Seafood Ceviche", description: "Fresh catch with lime and cilantro", price: "$14" },
      { name: "Caramelized Onion Tart", description: "Puff pastry with gourmet cheese", price: "$9" },
    ],
  },
  {
    name: "Main Courses",
    items: [
      { name: "Pan-Seared Salmon", description: "With asparagus and hollandaise sauce", price: "$28" },
      { name: "Ribeye Steak", description: "Prime cut with truffle butter", price: "$35" },
      { name: "Pan-Roasted Chicken", description: "With seasonal vegetables", price: "$24" },
      { name: "Lobster Thermidor", description: "Classic preparation with champagne sauce", price: "$38" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Chocolate Soufflé", description: "Warm chocolate with vanilla ice cream", price: "$10" },
      { name: "Crème Brûlée", description: "Classic French custard", price: "$8" },
      { name: "Strawberry Cheesecake", description: "With berry coulis", price: "$9" },
      { name: "Tropical Panna Cotta", description: "Mango and passion fruit", price: "$10" },
    ],
  },
  {
    name: "Beverages",
    items: [
      { name: "Signature Cocktail", description: "House special blend", price: "$12" },
      { name: "Fine Wine Selection", description: "Curated from around the world", price: "$15-$60" },
      { name: "Premium Spirits", description: "Rare and aged selections", price: "$10-$25" },
      { name: "Fresh Juices", description: "Seasonal tropical blends", price: "$6" },
    ],
  },
]

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap
      gsap.from(".menu-item", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        clearProps: "all",
      })
    }
  }, [selectedCategory])

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] bg-gradient-to-b from-card to-background flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-4">Our Menu</h1>
            <p className="text-xl text-foreground/70">Culinary Excellence Meets Luxury Dining</p>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              {menuCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === index
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-card text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
              {menuCategories[selectedCategory].items.map((item, index) => (
                <div
                  key={index}
                  className="menu-item bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h4 className="text-lg md:text-xl font-serif font-light text-foreground">{item.name}</h4>
                    <span className="text-primary font-medium text-sm md:text-base whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-sm md:text-base">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Menu Hero Image */}
            <div className="mt-20">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src="/menu.png"
                  alt="Fine Dining Experience"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
