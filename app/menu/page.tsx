"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const menuCategories = [
  // ── FOOD ─────────────────────────────────────────────────────────────────
  {
    name: "The Main Act",
    heroImage: "/menu/main.png",
    bottomImage: "/menu/main2.png",
    items: [
      { name: "Chicken Fried Rice", description: "Stir fry vegetables with marinated diced chicken and eggs", price: "₦7,000" },
      { name: "Spicy Goat Meat Rice", description: "Spicy goat meat with vegetable leaf", price: "₦7,000" },
      { name: "Native Rice", description: "Rice made with traditional palm oil giving it a distinct earthly aroma", price: "₦7,000" },
      { name: "Chicken Burger", description: "Seasoned chicken patty, tomatoes, cucumber and onions served with French fries", price: "₦12,000" },
      { name: "Beef Burger", description: "Seasoned beef patty, tomatoes, cucumber inside and onions served with French fries", price: "₦12,000" },
      { name: "Chicken Steak", description: "Grilled chicken breast", price: "₦18,000" },
      { name: "Chicken Curry", description: "Rich marinated chicken chunks simmered in a velvety sauce of golden turmeric, ginger and garlic, elevated with coconut cream, sautéed bell peppers, carrot and onions served with Basmati rice", price: "₦19,000" },
    ],
  },
  {
    name: "Flavoured Strands",
    heroImage: "/menu/pasta.png",
    bottomImage: "/menu/pasta2.png",
    items: [
      { name: "Stir Fry Pasta", description: "Spaghetti with stir fry chicken, carrots, bell peppers and soy sauce", price: "₦13,000" },
      { name: "Spaghetti Bolognese", description: "Made with minced beef, onions, garlic, tomatoes and herbs; sauce simmered to develop deep flavor", price: "₦13,000" },
    ],
  },
  {
    name: "Noshes",
    heroImage: "/menu/noshes.png",
    bottomImage: "/menu/noshes2.png",
    items: [
      { name: "Samosa", description: "Hand folded crispy pastries filled with seasoned minced beef, green peas, carrot and aromatic spices", price: "₦11,000" },
      { name: "Spring Rolls", description: "Hand folded with marinated chicken breast, vegetable and carrot served with pepper sauce", price: "₦11,000" },
      { name: "Samosa (Chilli)", description: "Hand chilli sauce pastrie filled with seasoned minced beef, green peas, carrot and aromatic spices", price: "₦11,000" },
    ],
  },
  {
    name: "Add-ons",
    heroImage: "/menu/addons.png",
    bottomImage: "/menu/addons2.png",
    items: [
      { name: "Yam Fries", description: "", price: "₦6,000" },
      { name: "Potatoes Chops", description: "", price: "₦6,000" },
      { name: "Plantain Chops", description: "", price: "₦6,000" },
      { name: "French Fries", description: "", price: "₦6,000" },
      { name: "Mashed Potatoes", description: "", price: "₦6,000" },
      { name: "White Rice", description: "", price: "₦6,000" },
      { name: "Creek Chicken Salad", description: "", price: "₦8,000" },
      { name: "Causlaw", description: "", price: "₦4,000" },
      { name: "Boiled Plantain", description: "", price: "₦5,000" },
      { name: "Boiled Yam", description: "", price: "₦5,000" },
    ],
  },
  {
    name: "Peppered Delights",
    heroImage: "/menu/peppered.png",
    bottomImage: "/menu/peppered2.png",
    items: [
      { name: "Peppered Snail (Spicy) / Jumbo Snail", description: "", price: "₦13,000" },
      { name: "Peppered Goat Meat", description: "Nigeria spicy goat meat", price: "₦12,000" },
      { name: "Peppered Gizzard", description: "Spicy gizzard", price: "₦12,000" },
      { name: "Peppered Beef", description: "Spicy beef", price: "₦12,000" },
      { name: "Peppered Wings", description: "Spicy wings", price: "₦12,000" },
      { name: "Peppered Turkey", description: "Soft and spicy turkey", price: "₦17,000" },
      { name: "Peppered Croaker Fish", description: "Spicy grilled fish with onions, bell pepper and fresh herbs", price: "₦12,000" },
      { name: "Goat Meat Pepper Soup", description: "Spicy pepper soup and goat meat", price: "₦10,000" },
      { name: "Chicken Pepper Soup", description: "Spicy pepper soup & chicken", price: "₦10,000" },
    ],
  },
  {
    name: "Creek Combo Platter",
    heroImage: "/menu/naija.png",
    bottomImage: "/menu/naija2.png",
    items: [
      { name: "City Platter (Creek Combo)", description: "4 Spring Roll, 4 Samosa, 4 Beef, 4 Chicken Wings, 6 Yams, 4 Sausage, 6 Gizzard, 4 Snails, 3 Turkey and Salad", price: "₦55,000" },
      { name: "City Platter", description: "5pcs goat meat, 4pcs spring rolls, 4pcs samosa, 5pcs fish fingers, French fries", price: "₦40,000" },
    ],
  },
  {
    name: "Prelude",
    heroImage: "/menu/prelude.png",
    bottomImage: "/menu/prelude2.png",
    items: [
      { name: "Chicken Kebab", description: "Marinated chicken skewered with bell pepper and grilled over open flames for a smoky finish", price: "₦17,000" },
      { name: "Mushrooms in Barter", description: "Stir fry mushrooms", price: "₦9,500" },
      { name: "Beef Kebab", description: "Marinated beef skewed with bell peppers and carrots grilled over open flames, a smoky finish", price: "₦17,000" },
      { name: "BTS Chicken", description: "Chicken balls with wings sauce", price: "₦14,500" },
      { name: "Chicken Drumstick", description: "Crispy chicken drum stick", price: "₦14,000" },
    ],
  },

  // ── COCKTAILS & MIXED DRINKS ──────────────────────────────────────────────
  {
    name: "Cocktails",
    heroImage: "/menu/cocktail.png",
    bottomImage: "/menu/cocktail2.png",
    items: [
      { name: "PornStar Martini", description: "", price: "₦18,500" },
      { name: "Long Island Iced Tea", description: "", price: "₦13,500" },
      { name: "Adios Cocktail", description: "", price: "₦13,000" },
      { name: "Screaming Orgasm", description: "", price: "₦13,500" },
      { name: "Strawberry Margarita", description: "", price: "₦13,000" },
      { name: "Frozen Delight Concur", description: "", price: "₦11,000" },
      { name: "Sex on the Beach", description: "", price: "₦11,000" },
      { name: "Sex in the Driveway", description: "", price: "₦11,000" },
      { name: "Liquid Marijuana", description: "", price: "₦11,500" },
      { name: "Wild Thoughts", description: "", price: "₦11,000" },
      { name: "Frozen Key Lime Pie", description: "", price: "₦11,000" },
      { name: "Pinacolada", description: "", price: "₦10,500" },
      { name: "Mojito", description: "", price: "₦10,500" },
      { name: "Tequila Sunrise", description: "", price: "₦10,500" },
    ],
  },
  {
    name: "Sour Cocktails",
    heroImage: "/menu/sour.png",
    bottomImage: "/menu/sour2.png",
    items: [
      { name: "French 75", description: "", price: "₦11,000" },
      { name: "Cranberry Margarita", description: "", price: "₦10,500" },
      { name: "Cosmopolitan", description: "", price: "₦10,500" },
      { name: "Whisky Sour", description: "", price: "₦11,000" },
    ],
  },
  {
    name: "Strong Cocktails",
    heroImage: "/menu/cocktail2.png",
    bottomImage: "/menu/sour2.png",
    items: [
      { name: "Life After Death", description: "", price: "₦13,500" },
      { name: "Greek Special", description: "", price: "₦13,000" },
      { name: "Road to Hell", description: "", price: "₦10,500" },
      { name: "Maitai", description: "", price: "₦13,500" },
      { name: "Electric Island", description: "", price: "₦13,500" },
      { name: "Desperado Martini", description: "", price: "₦13,500" },
      { name: "Adios Motherfucker", description: "", price: "₦11,500" },
      { name: "Old Fashioned", description: "", price: "₦11,500" },
      { name: "White Russian", description: "", price: "₦12,000" },
      { name: "Negroni", description: "", price: "₦12,000" },
      { name: "Manhattan", description: "", price: "₦12,000" },
      { name: "Boulevardier", description: "", price: "₦12,000" },
    ],
  },
  {
    name: "Mocktails",
    heroImage: "/menu/mocktail.png",
    bottomImage: "/menu/mocktail2.png",
    items: [
      { name: "Wild Thought", description: "", price: "₦13,500" },
      { name: "Rainbow Paradise", description: "", price: "₦13,500" },
      { name: "Minted Bounty", description: "", price: "₦12,000" },
      { name: "Peach Flamingo", description: "", price: "₦11,000" },
      { name: "Blue Hawaii", description: "", price: "₦11,000" },
      { name: "Blue Sky Coconut Mojito", description: "", price: "₦11,000" },
      { name: "Chapman", description: "", price: "₦10,000" },
      { name: "Virgin Sunrise", description: "", price: "₦10,000" },
    ],
  },

  // ── NON-ALCOHOLIC ─────────────────────────────────────────────────────────
  {
    name: "Smoothies",
    heroImage: "/menu/smoothies.png",
    bottomImage: "/menu/smoothies2.png",
    items: [
      { name: "Barman Special", description: "", price: "₦11,000" },
      { name: "Coconut Paradise", description: "", price: "₦11,000" },
      { name: "Special Smoothie", description: "", price: "₦11,000" },
      { name: "Strawberry Fantasy", description: "", price: "₦11,000" },
      { name: "Ginger Flame", description: "", price: "₦11,000" },
      { name: "Bliss Special", description: "", price: "₦11,000" },
    ],
  },
  {
    name: "Milkshakes",
    heroImage: "/menu/milkshake.png",
    bottomImage: "/menu/milkshakes.png",
    items: [
      { name: "Oreo Milkshake", description: "", price: "₦13,000" },
      { name: "Vanilla Milkshake", description: "", price: "₦11,000" },
      { name: "Strawberry Milkshake", description: "", price: "₦11,000" },
      { name: "Chocolate Milkshake", description: "", price: "₦11,000" },
    ],
  },
  {
    name: "Fresh Juices",
    heroImage: "/menu/juice.png",
    bottomImage: "/menu/juice2.png",
    items: [
      { name: "Pineapple Juice", description: "", price: "₦4,500" },
      { name: "Watermelon", description: "", price: "₦4,500" },
      { name: "Orange Juice", description: "", price: "₦4,500" },
      { name: "Tigernut Drink", description: "", price: "₦4,500" },
      { name: "Fruity Zobo", description: "", price: "₦3,500" },
      { name: "Pineapple & Ginger Juice", description: "", price: "₦5,500" },
    ],
  },
  {
    name: "Combo Juices",
    heroImage: "/menu/juice2.png",
    bottomImage: "/menu/juice.png",
    items: [
      { name: "Carrot, Ginger & Pineapple Juice", description: "", price: "₦6,500" },
      { name: "Pineapple & Orange Juice", description: "", price: "₦6,500" },
      { name: "Beetroot & Pineapple Juice", description: "", price: "₦6,500" },
      { name: "Pineapple & Tigernut", description: "", price: "₦6,500" },
      { name: "Pineapple, Watermelon & Carrot", description: "", price: "₦6,500" },
    ],
  },
  {
    name: "Jard Fresh Juice",
    heroImage: "/menu/jard.png",
    bottomImage: "/menu/jard2.png",
    items: [
      { name: "1.5 Litres", description: "Freshly squeezed juice", price: "₦14,000" },
      { name: "2 Litres", description: "Large freshly squeezed juice", price: "₦19,500" },
    ],
  },
  {
    name: "Parfait & Yoghurt",
    heroImage: "/menu/parfait.png",
    bottomImage: "/menu/parfait2.png",
    items: [
      { name: "500ml Parfait", description: "", price: "₦7,500" },
      { name: "550ml Parfait", description: "", price: "₦9,500" },
      { name: "Deluxe Parfait", description: "", price: "₦13,000" },
      { name: "Coconut Yoghurt", description: "", price: "₦5,500" },
      { name: "Strawberry Yoghurt", description: "", price: "₦5,500" },
      { name: "Plain Yoghurt", description: "", price: "₦5,500" },
    ],
  },
  {
    name: "Beach Vibe",
    heroImage: "/menu/beach.png",
    bottomImage: "/menu/beach2.png",
    items: [
      { name: "Ocean Breeze Coconut", description: "", price: "₦3,500" },
      { name: "Island Breeze Coconut", description: "", price: "₦5,500" },
    ],
  },
  {
    name: "Coconut Water & Vodka",
    heroImage: "/menu/coconut.png",
    bottomImage: "/menu/coconut2.png",
    items: [
      { name: "Tropical Pineapple", description: "", price: "₦8,500" },
      { name: "Tropical Combo", description: "", price: "₦14,000" },
      { name: "Tropical Splash", description: "", price: "₦19,500" },
    ],
  },
  {
    name: "Pineapple & Vodka",
    heroImage: "/menu/pineapple.png",
    bottomImage: "/menu/pineapple2.png",
    items: [
      { name: "Watermelon Waves", description: "", price: "₦8,500" },
    ],
  },
  {
    name: "Soft Drinks",
    heroImage: "/menu/coke.png",
    bottomImage: "/menu/soft.png",
    items: [
      { name: "Cranberry", description: "", price: "₦15,000" },
      { name: "Hollandia", description: "", price: "₦5,000" },
      { name: "Chivita Active", description: "", price: "₦5,000" },
      { name: "Chivita Exotic", description: "", price: "₦5,000" },
      { name: "Coke / Sprite / Schweppes", description: "", price: "₦2,000" },
      { name: "Water", description: "", price: "₦1,000" },
    ],
  },
  {
    name: "Energy Drinks",
    heroImage: "/menu/soft.png",
    bottomImage: "/menu/soft.png",
    items: [
      { name: "Red Bull", description: "", price: "₦3,000" },
    ],
  },

  // ── ALCOHOLIC ─────────────────────────────────────────────────────────────
  {
    name: "Beer",
    heroImage: "/menu/beer.png",
    bottomImage: "/menu/beer2.png",
    items: [
      { name: "Heineken", description: "", price: "₦3,500" },
    ],
  },
  {
    name: "Wine",
    heroImage: "/menu/wine.png",
    bottomImage: "/menu/wine2.png",
    items: [
      { name: "Cooper & Thref", description: "", price: "₦100,000" },
      { name: "Du Pape", description: "", price: "₦100,000" },
      { name: "Thomas Barton", description: "", price: "₦70,000" },
      { name: "Escudo Rojo", description: "", price: "₦50,000" },
      { name: "Nederburg", description: "", price: "₦50,000" },
      { name: "Silk & Spice", description: "", price: "₦40,000" },
      { name: "Martinellis", description: "", price: "₦35,000" },
      { name: "Lamorthe Parrot", description: "", price: "₦30,000" },
      { name: "Four Cousin's Red, Rose, White", description: "", price: "₦30,000" },
      { name: "Sweet Kiss Red, Rose, White", description: "", price: "₦30,000" },
      { name: "Carlo Rossi Red, Rose, White", description: "", price: "₦30,000" },
      { name: "Drosty Hof", description: "", price: "₦30,000" },
      { name: "Declan Red, Rose, White", description: "", price: "₦30,000" },
      { name: "Ventiterre Merlot", description: "", price: "₦30,000" },
      { name: "4th Street", description: "", price: "₦25,000" },
      { name: "Jarrow", description: "", price: "₦25,000" },
    ],
  },
  {
    name: "Champagne",
    heroImage: "/menu/champagne.png",
    bottomImage: "/menu/champagne2.png",
    items: [
      { name: "Crystal Roederar", description: "", price: "₦1,100,000" },
      { name: "Ace of Spade Brut", description: "", price: "₦1,100,000" },
      { name: "Dom Perignon (Light Up)", description: "", price: "₦1,100,000" },
      { name: "Veuve Clicquot Rich", description: "", price: "₦250,000" },
      { name: "Moet & Chandon Rose", description: "", price: "₦250,000" },
      { name: "Veuve Clicquot Brut", description: "", price: "₦200,000" },
      { name: "Moet & Chandon Brut", description: "", price: "₦200,000" },
      { name: "G.H Mumm", description: "", price: "₦150,000" },
      { name: "Belarie", description: "", price: "₦120,000" },
      { name: "Angelus Premium", description: "", price: "₦120,000" },
      { name: "Laurent Perrier", description: "", price: "₦120,000" },
    ],
  },
  {
    name: "Cognac",
    heroImage: "/menu/cognac.png",
    bottomImage: "/menu/cognac2.png",
    items: [
      { name: "Hennessy XO", description: "", price: "₦750,000" },
      { name: "Martell XO", description: "", price: "₦750,000" },
      { name: "Hennessy VSOP", description: "", price: "₦200,000" },
      { name: "Martell Blue Swift", description: "", price: "₦200,000" },
      { name: "Hennessy VS", description: "", price: "₦150,000" },
      { name: "Martell VSSD", description: "", price: "₦150,000" },
    ],
  },
  {
    name: "Whisky",
    heroImage: "/menu/whiskey.png",
    bottomImage: "/menu/whiskey2.png",
    items: [
      { name: "Glenfiddich 26 Years", description: "", price: "₦1,400,000" },
      { name: "Glenfiddich 23 Years", description: "", price: "₦1,000,000" },
      { name: "Johnnie Walker Blue Label", description: "", price: "₦900,000" },
      { name: "Macallan Rare Cask", description: "", price: "₦900,000" },
      { name: "Glenfiddich 21 Years", description: "", price: "₦700,000" },
      { name: "Macallan 18 Years", description: "", price: "₦700,000" },
      { name: "Macallan A Night on Earth", description: "", price: "₦650,000" },
      { name: "Glenlivet 21 Years", description: "", price: "₦600,000" },
      { name: "Glenfiddich 18 Years", description: "", price: "₦350,000" },
      { name: "Macallan 15 Years", description: "", price: "₦350,000" },
      { name: "Glenlivet 18 Years", description: "", price: "₦300,000" },
      { name: "Singleton 18 Years", description: "", price: "₦300,000" },
      { name: "Glenmorangie 18 Years", description: "", price: "₦300,000" },
      { name: "Johnnie Walker 18 Years", description: "", price: "₦250,000" },
      { name: "Gold Bar Original Gold Bottle", description: "", price: "₦220,000" },
      { name: "Gold Bar Original Black Bottle", description: "", price: "₦220,000" },
      { name: "Balvenie 14 Years", description: "", price: "₦220,000" },
      { name: "Chivas Regal 18 Years", description: "", price: "₦200,000" },
      { name: "Glenfiddich 15 Years", description: "", price: "₦200,000" },
      { name: "Glenlivet 15 Years", description: "", price: "₦200,000" },
      { name: "Singleton 15 Years", description: "", price: "₦200,000" },
      { name: "Macallan 12 Years", description: "", price: "₦200,000" },
      { name: "Teeling Single Malt", description: "", price: "₦150,000" },
      { name: "Glenfiddich 12 Years", description: "", price: "₦150,000" },
      { name: "Glenlivet 12 Years", description: "", price: "₦150,000" },
      { name: "Chivas Regal 15 Years", description: "", price: "₦150,000" },
      { name: "Glenmorangie 12 Years", description: "", price: "₦150,000" },
      { name: "Observatory 20 Years", description: "", price: "₦130,000" },
      { name: "Johnnie Walker Gold Label", description: "", price: "₦120,000" },
      { name: "Mazzetti", description: "", price: "₦120,000" },
      { name: "Singleton 12 Years", description: "", price: "₦120,000" },
      { name: "Teeling Single Grain", description: "", price: "₦120,000" },
      { name: "Johnnie Walker Black Label", description: "", price: "₦110,000" },
      { name: "Monkey Shoulder", description: "", price: "₦110,000" },
      { name: "Jack Daniels", description: "", price: "₦100,000" },
      { name: "Jameson Black", description: "", price: "₦100,000" },
      { name: "Chivas Regal 12 Years", description: "", price: "₦100,000" },
      { name: "Glenmorangie 10 Years", description: "", price: "₦100,000" },
      { name: "Teeling Small Batch", description: "", price: "₦80,000" },
      { name: "Johnnie Walker Blonde", description: "", price: "₦60,000" },
      { name: "Jameson Green", description: "", price: "₦60,000" },
      { name: "American Honey", description: "", price: "₦55,000" },
    ],
  },
  {
    name: "Tequila",
    heroImage: "/menu/tequila.png",
    bottomImage: "/menu/tequila2.png",
    items: [
      { name: "Don Julio 1942", description: "", price: "₦700,000" },
      { name: "Aman Tequila Anejo", description: "", price: "₦600,000" },
      { name: "Aman Tequila Cristalino", description: "", price: "₦600,000" },
      { name: "Volcan XA", description: "", price: "₦750,000" },
      { name: "Avion Cristalino", description: "", price: "₦530,000" },
      { name: "Casamigo", description: "", price: "₦400,000" },
      { name: "Don Julio Blanco", description: "", price: "₦300,000" },
      { name: "Don Julio Reposado", description: "", price: "₦300,000" },
      { name: "Aman Tequila Reposado", description: "", price: "₦250,000" },
      { name: "Aman Tequila Blanco", description: "", price: "₦250,000" },
      { name: "Volcan Blanco", description: "", price: "₦170,000" },
      { name: "Sierra Tequila", description: "", price: "₦80,000" },
      { name: "Buen Amigo", description: "", price: "₦75,000" },
      { name: "Olmeca Silver", description: "", price: "₦75,000" },
      { name: "Tequila Shoots", description: "", price: "₦3,000" },
    ],
  },
  {
    name: "Gin",
    heroImage: "/menu/gin.png",
    bottomImage: "/menu/gin2.png",
    items: [
      { name: "Tanqueray No. Ten", description: "", price: "₦100,000" },
      { name: "Bombay Sapphire", description: "", price: "₦45,000" },
    ],
  },
  {
    name: "Vodka",
    heroImage: "/menu/vodka.png",
    bottomImage: "/menu/vodka2.png",
    items: [
      { name: "Absolute Vodka", description: "", price: "₦150,000" },
    ],
  },
  {
    name: "Cream",
    heroImage: "/menu/cream.png",
    bottomImage: "/menu/cream2.png",
    items: [
      { name: "Bailey's", description: "", price: "₦80,000" },
    ],
  },
]

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    return () => el.removeEventListener("scroll", updateScrollState)
  }, [updateScrollState])

  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      gsap.fromTo(
        ".menu-item",
        {
          opacity: 0,
          y: 300,
          scale: 0,
        },
        {
          opacity: 1,
          delay: 0.15,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: "power1.out",
        }
      )

      gsap.fromTo(
        ".category-hero-image",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )

      gsap.fromTo(
        ".category-bottom-image",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      )
    }
  }, [selectedCategory])

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section with Dynamic Image */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Dynamic Background Image */}
          <div className="absolute inset-0">
            <img
              key={selectedCategory}
              src={menuCategories[selectedCategory].heroImage}
              alt={menuCategories[selectedCategory].name}
              className="category-hero-image w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-white mb-4">
              Our Menu
            </h1>
            <p className="text-xl text-white/80 mb-2">
              Culinary Excellence at Creek&apos;n&apos;Greek
            </p>
            <p className="text-lg text-primary font-medium mt-4">
              {menuCategories[selectedCategory].name}
            </p>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation */}
            <div className="relative -mx-4 sm:mx-0 mb-16">
              {/* Left caret — mobile only */}
              <button
                onClick={() => scrollBy("left")}
                aria-label="Scroll left"
                className={`sm:hidden absolute left-0 top-0 bottom-3 z-10 flex items-center px-1 transition-opacity duration-200 ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 backdrop-blur border border-border shadow">
                  <ChevronLeft className="w-4 h-4 text-primary" />
                </span>
              </button>

              <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto px-8 pb-3 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0 sm:px-0"
              >
                {menuCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                      selectedCategory === index
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card text-foreground/70 hover:text-foreground border border-border"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Right caret — mobile only */}
              <button
                onClick={() => scrollBy("right")}
                aria-label="Scroll right"
                className={`sm:hidden absolute right-0 top-0 bottom-3 z-10 flex items-center px-1 transition-opacity duration-200 ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 backdrop-blur border border-border shadow">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </span>
              </button>
            </div>

            {/* Category Title */}
            <h2 className="text-3xl md:text-4xl font-serif font-light text-center text-foreground mb-12">
              {menuCategories[selectedCategory].name}
            </h2>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {menuCategories[selectedCategory].items.map((item, index) => (
                <div
                  key={index}
                  className="menu-item bg-card border border-border rounded-lg p-5 md:p-6 hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h4 className="text-base md:text-lg font-serif font-medium text-foreground">
                      {item.name}
                    </h4>
                    <span className="text-primary font-semibold text-sm md:text-base whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-foreground/60 text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Menu Note */}
            <div className="mt-16 text-center">
              <p className="text-foreground/50 text-sm">
                Prices are in Nigerian Naira (₦). Service charge may apply.
              </p>
            </div>

            {/* Dynamic Bottom Image */}
            <div className="mt-16">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <img
                  key={`bottom-${selectedCategory}`}
                  src={menuCategories[selectedCategory].bottomImage}
                  alt={`${menuCategories[selectedCategory].name} - Fine Dining`}
                  className="category-bottom-image w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg md:text-xl font-serif">
                    {menuCategories[selectedCategory].name}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    Experience the finest at Creek&apos;n&apos;Greek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
