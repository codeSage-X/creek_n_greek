"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

gsap.registerPlugin(ScrollTrigger)

/* ---------------- DATA ---------------- */
const formatDate = (date: string) =>
  new Date(date).toISOString().split("T")[0]

const upcomingEvents = [
  {
    id: 1,
    name: "DJ Vibez Experience",
    date: "2025-02-15",
    time: "6:00 PM",
    image: "/party.jpg",
    description:
      "Experience an unforgettable evening of music, cocktails, and poolside entertainment",
  },
  {
    id: 2,
    name: "Grand Opening",
    date: "2025-12-05",
    time: "6:30 PM",
    image: "/party2.png",
    description:
      "Celebrate the launch of our luxury event spaces with a night of elegance and excitement",
  },
]

const videos = ["/vid1.mp4", "/vid2.mp4", "/vid3.mp4"]

/* ---------------- COMPONENT ---------------- */

export default function Events() {
  const cardsRef = useRef<HTMLDivElement[]>([])
  const videoRefs = useRef<HTMLVideoElement[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  /* ---------- GSAP ---------- */
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      }
    )
  }, [])

  /* ---------- SAFE VIDEO CONTROL ---------- */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return

      video.muted = muted

      if (i === activeIndex && playing) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeIndex, muted, playing])

  const togglePlay = () => {
    setPlaying((prev) => !prev)
  }

  return (
    <main>
      <Navbar />

      {/* ---------------- HERO ---------------- */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-card to-background text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-light mb-4">
          Upcoming Events
        </h1>
        <p className="text-lg text-foreground/70">
          Join us for unforgettable evenings filled with luxury and entertainment
        </p>
      </section>

      {/* ---------------- EVENTS ---------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, i) => (
            <Card
              key={event.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className="overflow-hidden flex flex-col"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-2xl font-serif">{event.name}</h3>

                <div className="flex gap-4 text-sm text-foreground/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    {event.time}
                  </span>
                </div>

                <p className="text-sm text-foreground/60">
                  {event.description}
                </p>

                <Button className="self-start mt-2">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------------- SWIPER VIDEO CAROUSEL ---------------- */}
      <section className="py-24 bg-card">
        <h2 className="text-4xl font-serif font-light text-center mb-12">
          Past Highlights
        </h2>

        <div className="max-w-5xl mx-auto px-4">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex)
              setPlaying(true)
            }}
          >
            {videos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[i] = el
                    }}
                    src={src}
                    className="w-full h-[520px] object-cover rounded-xl"
                    loop
                    playsInline
                  />

                  {/* Controls */}
                  <div className="absolute bottom-6 left-6 flex gap-4">
                    <button
                      onClick={togglePlay}
                      className="bg-black/60 p-3 rounded-full text-white"
                    >
                      {playing ? <Pause /> : <Play />}
                    </button>

                    <button
                      onClick={() => setMuted((m) => !m)}
                      className="bg-black/60 p-3 rounded-full text-white"
                    >
                      {muted ? <VolumeX /> : <Volume2 />}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Footer />
    </main>
  )
}
