"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  { id: 1, category: "pool", src: "/pool4.png", alt: "Poolside Area" },
  { id: 2, category: "rooftop", src: "/rooftop5.png", alt: "Rooftop" },
  { id: 3, category: "pool", src: "/pool3.png", alt: "Swimming Pool" },
  { id: 4, category: "rooftop", src: "/rooftop3.png", alt: "Rooftop Bar" },
  { id: 5, category: "pool", src: "/pool2.png", alt: "Pool Area" },
  { id: 6, category: "pool", src: "/pool.png", alt: "Pool Area" },
  { id: 7, category: "pool", src: "/pool5.png", alt: "Pool Area" },
  { id: 8, category: "pool", src: "/pool6.png", alt: "Pool Area" },
  { id: 9, category: "rooftop", src: "/rooftop2.png", alt: "Roof Top" },
  { id: 10, category: "rooftop", src: "/rooftop.png", alt: "Roof Top" },
  { id: 11, category: "rooftop", src: "/rooftop4.png", alt: "Roof Top" },
  { id: 12, category: "rooftop", src: "/rooftop6.png", alt: "Roof Top" },
  { id: 13, category: "ambiance", src: "/ambiance.png", alt: "Enviroment" },
  { id: 14, category: "ambiance", src: "/ambiance2.png", alt: "Enviroment" },
  { id: 15, category: "ambiance", src: "/ambiance3.png", alt: "Enviroment" },
  { id: 16, category: "ambiance", src: "/ambiance4.png", alt: "Enviroment" },
  { id: 17, category: "ambiance", src: "/ambiance6.png", alt: "Enviroment" },
  { id: 18, category: "ambiance", src: "/ambiance5.png", alt: "Enviroment" },
]

const categories = ["all", "ambiance", "rooftop", "pool"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const selectedImage = selectedImageId ? galleryImages.find((img) => img.id === selectedImageId) : null
  const selectedIndex = selectedImage ? filteredImages.findIndex((img) => img.id === selectedImageId) : -1

  const handleNext = () => {
    if (selectedIndex < filteredImages.length - 1) {
      setSelectedImageId(filteredImages[selectedIndex + 1].id)
    }
  }

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedImageId(filteredImages[selectedIndex - 1].id)
    }
  }

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] bg-gradient-to-b from-card to-background flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-4">Gallery</h1>
            <p className="text-xl text-foreground/70">Experience the beauty and elegance of Creek'n'Greek</p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors capitalize font-medium ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImageId(image.id)}
                  className="relative h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {mounted && (
        <Dialog open={selectedImageId !== null} onOpenChange={() => setSelectedImageId(null)}>
          <DialogContent className="max-w-4xl p-0 border-0">
            <button
              onClick={() => setSelectedImageId(null)}
              className="absolute right-4 top-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center w-12">
                  <button
                    onClick={handlePrev}
                    disabled={selectedIndex === 0}
                    className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white disabled:opacity-50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center justify-center w-12">
                  <button
                    onClick={handleNext}
                    disabled={selectedIndex === filteredImages.length - 1}
                    className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white disabled:opacity-50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-center text-sm text-foreground/70 mt-4">{selectedImage.alt}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </main>
  )
}
