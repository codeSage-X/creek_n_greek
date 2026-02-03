"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const menuCategories = [
  {
    name: "Continental Dishes",
    heroImage: "/menu/continental.png",
    bottomImage: "/menu/continental2.png",
    items: [
      { name: "Creek Jumbo Platter", description: "Premium assorted platter for sharing", price: "₦120,000" },
      { name: "Creek Combo Platter", description: "Mixed grill combination platter", price: "₦55,000" },
      { name: "Chicken Kebabs", description: "Grilled seasoned chicken skewers", price: "₦15,000" },
      { name: "Beef Kebabs", description: "Tender beef skewers with spices", price: "₦15,000" },
      { name: "Chicken Fried Rice", description: "Wok-fried rice with chicken", price: "₦15,000" },
      { name: "Creek Prawns", description: "Signature seasoned prawns", price: "₦15,000" },
      { name: "Spicy Goat Meat Rice", description: "Aromatic rice with spicy goat meat", price: "₦15,000" },
      { name: "BTS Chicken", description: "Crispy fried chicken special", price: "₦12,000" },
      { name: "Yam Chops", description: "Golden fried yam pieces", price: "₦5,000" },
      { name: "Plantain Chops", description: "Crispy fried plantain", price: "₦5,000" },
      { name: "Potato Chops", description: "Seasoned potato bites", price: "₦5,000" },
      { name: "French Fries", description: "Classic golden fries", price: "₦5,000" },
    ],
  },
  {
    name: "Nigerian Delicacies",
    heroImage: "/menu/naija.png",
    bottomImage: "/menu/naija2.png",
    items: [
      { name: "Isiewu", description: "Traditional spiced goat head delicacy", price: "₦15,000" },
      { name: "Nkwuobi", description: "Spicy cow leg in palm oil sauce", price: "₦15,000" },
      { name: "Asa Dry Fish", description: "Served with queen bread", price: "₦10,000" },
      { name: "Old Layer Chicken Pepper Soup", description: "Served with boiled yam or plantain", price: "₦35,000" },
      { name: "Full Catfish Pepper Soup", description: "Served with boiled yam or plantain", price: "₦25,000" },
      { name: "Goat Meat Pepper Soup", description: "Aromatic spiced goat soup", price: "₦10,000" },
      { name: "Peppered Snails", description: "Spicy grilled snails", price: "₦12,000" },
      { name: "Peppered Wings", description: "Hot and spicy chicken wings", price: "₦10,000" },
      { name: "Peppered Gizzard", description: "Tender spiced gizzard", price: "₦10,000" },
      { name: "Peppered Goat Meat", description: "Spicy grilled goat meat", price: "₦10,000" },
    ],
  },
  {
    name: "Seafood Specialties",
    heroImage: "/menu/sea2.png",
    bottomImage: "/menu/sea.png",
    items: [
      { name: "Royal Boat Premium", description: "Luxurious seafood platter with prawns, lobster, crab & fish", price: "₦125,500" },
      { name: "Royal Boat", description: "Assorted seafood selection", price: "₦105,000" },
      { name: "Chef Special Cajun Becil", description: "Lobster, shrimp, crab with Cajun seasoning", price: "₦70,500" },
      { name: "Octopus Chimichurri", description: "Grilled octopus with chimichurri sauce", price: "₦45,500" },
      { name: "Small Bite Platter", description: "Assorted mini seafood bites", price: "₦50,500" },
      { name: "Lovestruck Tray", description: "Romantic seafood arrangement", price: "₦70,500" },
      { name: "Chef Special Seafood Boil", description: "Cajun style seafood boil", price: "₦45,500" },
      { name: "Jumbo Seafood Platter", description: "Premium jumbo seafood selection", price: "₦25,000" },
      { name: "Pan Seared Chicken", description: "Grilled chicken with seasonal sides", price: "₦28,600" },
      { name: "Surf and Turf", description: "Steak and seafood combination", price: "₦125,000" },
      { name: "Lobster Thermidor", description: "Classic lobster preparation", price: "₦125,000" },
    ],
  },
  {
    name: "Rice Dishes",
    heroImage: "/menu/rice.png",
    bottomImage: "/menu/rice2.png",
    items: [
      { name: "Shrimps Coconut Rice", description: "Creamy coconut rice with prawns", price: "₦22,500" },
      { name: "Shrimps Fried Rice", description: "Wok-fried rice with shrimps", price: "₦15,500" },
      { name: "Jamaican Rice", description: "Caribbean-style seasoned rice", price: "₦28,500" },
      { name: "Seafood Banga Rice", description: "Traditional palm fruit rice with seafood", price: "₦26,750" },
      { name: "Jambalaya Fried Rice", description: "Cajun-spiced rice with mixed proteins", price: "₦28,500" },
      { name: "Shrimps Peppered Rice", description: "Spicy rice with peppered shrimps", price: "₦22,500" },
      { name: "Taste of Romance", description: "Chef's special romantic platter", price: "₦30,500" },
      { name: "Asian Rice", description: "Oriental-style fried rice", price: "₦28,500" },
      { name: "Pineapple Fried Rice", description: "Sweet and savory pineapple rice", price: "₦30,500" },
      { name: "Asian Chili Rice", description: "Spicy Asian-inspired rice", price: "₦28,500" },
    ],
  },
  {
    name: "Smoothies",
    heroImage: "/menu/smoothies.png",
    bottomImage: "/menu/smoothies2.png",
    items: [
      { name: "Coconut Paradise", description: "Coconut, pineapple, banana, yoghurt", price: "₦10,000" },
      { name: "Tropical Delight", description: "Pineapple, banana, papaya, orange, yoghurt", price: "₦10,000" },
      { name: "Strawberry Fantasy", description: "Strawberry, banana, orange, yoghurt", price: "₦10,000" },
      { name: "Pineapple Sunset", description: "Pineapple, mango, papaya, yoghurt", price: "₦10,000" },
      { name: "Banana Treat", description: "Banana, mango, carrot, orange, yoghurt", price: "₦10,000" },
      { name: "Tropical Mix", description: "Banana, pineapple, lime, yoghurt", price: "₦10,000" },
      { name: "Ginger Flame", description: "Ginger, pineapple, carrot, yoghurt", price: "₦10,000" },
      { name: "Dream", description: "Apple, banana, orange, yoghurt", price: "₦10,000" },
    ],
  },
  {
    name: "Fresh Juices & Parfaits",
    heroImage: "/menu/juice.png",
    bottomImage: "/menu/juice2.png",
    items: [
      { name: "Pineapple Juice (50cl)", description: "Fresh pressed pineapple", price: "₦5,000" },
      { name: "Orange Juice", description: "Freshly squeezed oranges", price: "₦5,000" },
      { name: "Watermelon Juice", description: "Refreshing watermelon blend", price: "₦5,000" },
      { name: "Ocean Breeze Coconut", description: "Tropical coconut refresher", price: "₦3,500" },
      { name: "Tropical Pineapple", description: "Premium pineapple juice", price: "₦10,000" },
      { name: "Tropical Combo", description: "Mixed tropical fruits", price: "₦15,000" },
      { name: "500ml Parfait", description: "Layered yoghurt parfait", price: "₦7,000" },
      { name: "550ml Parfait", description: "Medium parfait serving", price: "₦9,000" },
      { name: "1 Liter Parfait", description: "Large parfait to share", price: "₦14,500" },
      { name: "Coconut Yoghurt", description: "Creamy coconut yoghurt", price: "₦5,000" },
      { name: "Strawberry Yoghurt", description: "Fresh strawberry yoghurt", price: "₦5,000" },
    ],
  },
  {
    name: "Cocktails",
    heroImage: "/menu/cocktail.png",
    bottomImage: "/menu/cocktail2.png",
    items: [
      { name: "Strawberry Margarita", description: "Strawberry, tequila, triple sec, lime", price: "₦15,000" },
      { name: "French 75", description: "Gin, lime juice, simple syrup, champagne", price: "₦15,000" },
      { name: "Live After Death", description: "Dark gold, white rum, whiskey tequila, vodka", price: "₦15,000" },
      { name: "Greek Special", description: "Khalua, Captain Jack, lime juice, whiskey", price: "₦15,000" },
      { name: "Whiskey Sour", description: "Whiskey, lime juice, simple syrup", price: "₦15,000" },
      { name: "Screaming Orgasm", description: "Baileys, condensed milk, Khalua, amaretto", price: "₦15,000" },
      { name: "Strawberry Daiquiri", description: "Fresh strawberry, rum, lime juice", price: "₦15,000" },
      { name: "Frozen Key Lime Pie", description: "Condensed milk, lime juice, vodka", price: "₦15,000" },
      { name: "Long Island Iced Tea", description: "Triple sec, tequila, vodka, rum, lime", price: "₦14,000" },
      { name: "Piña Colada Frozen", description: "Coconut milk, banana, pineapple juice", price: "₦15,000" },
      { name: "Cosmopolitan", description: "Vodka, cranberry syrup, triple sec, orange", price: "₦15,000" },
      { name: "Sex In The Driveway", description: "Peach schnapps, blue curaçao, vodka, sprite", price: "₦15,000" },
    ],
  },
  {
    name: "Mocktails",
    heroImage: "/menu/mocktail.png",
    bottomImage: "/menu/mocktail2.png",
    items: [
      { name: "Chapman", description: "Classic Nigerian mocktail", price: "₦9,000" },
      { name: "Purple Rain", description: "Grape and berry blend", price: "₦10,000" },
      { name: "Blue Hawaii", description: "Tropical blue refresher", price: "₦10,000" },
      { name: "Cinderella", description: "Mixed fruit fantasy", price: "₦10,000" },
      { name: "Virgin Colada", description: "Non-alcoholic piña colada", price: "₦12,000" },
      { name: "Blue Lagoon", description: "Blue curaçao mocktail", price: "₦10,000" },
      { name: "Cosmopolitan", description: "Virgin cosmo", price: "₦10,000" },
      { name: "Virgin Sunrise", description: "Orange and grenadine blend", price: "₦10,000" },
      { name: "Blue Sky Coconut Mojito", description: "Refreshing coconut mocktail", price: "₦10,000" },
      { name: "Beach Water", description: "Tropical beach-inspired drink", price: "₦10,000" },
    ],
  },
  {
    name: "Premium Whiskey",
    heroImage: "/menu/whiskey.png",
    bottomImage: "/menu/whiskey2.png",
    items: [
      { name: "Black Label", description: "Johnnie Walker Black Label", price: "₦100,000" },
      { name: "Gold Label", description: "Johnnie Walker Gold Label", price: "₦150,000" },
      { name: "Blue Label", description: "Johnnie Walker Blue Label", price: "₦900,000" },
      { name: "Johnnie Walker 18yrs", description: "Aged 18 years", price: "₦250,000" },
      { name: "Macallan 12yrs", description: "Single malt Scotch whisky", price: "₦200,000" },
      { name: "Macallan 15yrs", description: "Premium aged single malt", price: "₦350,000" },
      { name: "Macallan Rare Cask", description: "Exceptional rare cask selection", price: "₦900,000" },
      { name: "Glenfiddich 12yrs", description: "Classic single malt", price: "₦150,000" },
      { name: "Glenfiddich 18yrs", description: "Premium aged Glenfiddich", price: "₦250,000" },
      { name: "Glenfiddich 21yrs", description: "Exceptional 21 year aged", price: "₦650,000" },
      { name: "Glenfiddich 23yrs", description: "Ultra-premium selection", price: "₦1,300,000" },
      { name: "Glenmorangie 18yrs", description: "Highland single malt", price: "₦350,000" },
      { name: "Glenmorangie Signet", description: "Luxury expression", price: "₦1,000,000" },
      { name: "Chivas 12yrs", description: "Blended Scotch whisky", price: "₦125,000" },
      { name: "Chivas 15yrs", description: "Premium blended Scotch", price: "₦180,000" },
      { name: "Jack Daniels", description: "Tennessee whiskey", price: "₦100,000" },
      { name: "Jameson Black", description: "Irish whiskey", price: "₦100,000" },
      { name: "Jameson Green", description: "Classic Irish whiskey", price: "₦60,000" },
    ],
  },
  {
    name: "Premium Tequila",
    heroImage: "/menu/tequila.png",
    bottomImage: "/menu/tequila2.png",
    items: [
      { name: "Don Julio", description: "Premium blanco tequila", price: "₦800,000" },
      { name: "Don Julio Reposado", description: "Aged reposado tequila", price: "₦350,000" },
      { name: "Volcan Blanco", description: "Volcanic soil tequila", price: "₦175,000" },
      { name: "Volcan XA", description: "Extra añejo premium", price: "₦650,000" },
      { name: "Casamigos", description: "Ultra-premium tequila", price: "₦400,000" },
      { name: "Aman Tequila Rosa", description: "Pink tequila expression", price: "₦250,000" },
      { name: "Aman Tequila Blanco", description: "Crystal clear blanco", price: "₦250,000" },
      { name: "Aman Tequila Anejo", description: "Aged añejo", price: "₦600,000" },
      { name: "Aman Tequila Cristalino", description: "Filtered añejo", price: "₦600,000" },
      { name: "Sierra Tequila", description: "Classic Mexican tequila", price: "₦85,000" },
      { name: "Olmeca Tequila", description: "Traditional tequila", price: "₦70,000" },
      { name: "Bun Amigo Tequila", description: "Smooth sipping tequila", price: "₦70,000" },
    ],
  },
  {
    name: "Beer & Soft Drinks",
    heroImage: "/menu/beer.png",
    bottomImage: "/menu/soft.png",
    items: [
      { name: "Beer Draft", description: "Fresh draft beer", price: "₦5,000" },
      { name: "Heineken", description: "Premium lager (can)", price: "₦3,000" },
      { name: "Smirnoff Ice", description: "Flavored malt beverage", price: "₦3,000" },
      { name: "Desperado", description: "Tequila-flavored beer", price: "₦3,000" },
      { name: "Star Radler", description: "Citrus beer blend", price: "₦3,000" },
      { name: "Flying Fish", description: "Premium flavored beer", price: "₦3,000" },
      { name: "Guinness", description: "Irish stout", price: "₦3,000" },
      { name: "Coke", description: "Coca-Cola", price: "₦2,000" },
      { name: "Sprite", description: "Lemon-lime soda", price: "₦2,000" },
      { name: "Malt", description: "Non-alcoholic malt drink", price: "₦2,500" },
      { name: "Water", description: "Still water", price: "₦2,000" },
      { name: "Red Bull", description: "Energy drink", price: "₦3,000" },
      { name: "Juvie Juice", description: "Fruit juice", price: "₦5,000" },
      { name: "Hollandia", description: "Yoghurt drink", price: "₦5,000" },
      { name: "Chivita", description: "Fruit juice", price: "₦5,000" },
    ],
  },
  {
    name: "Milkshakes",
    heroImage: "/menu/milkshake.png",
    bottomImage: "/menu/milkshakes.png",
    items: [
      { name: "Strawberry Milkshake", description: "Creamy strawberry blend", price: "₦15,000" },
      { name: "Chocolate Milkshake", description: "Rich chocolate indulgence", price: "₦15,000" },
      { name: "Banana Milkshake", description: "Fresh banana cream shake", price: "₦15,000" },
      { name: "Vanilla Milkshake", description: "Classic vanilla shake", price: "₦15,000" },
      { name: "Oreo Milkshake", description: "Cookies and cream blend", price: "₦15,000" },
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
     

      gsap.fromTo(
        ".menu-item",
        {
          opacity: 0,
          y: 300,
          scale: 0,
        },
        {
          opacity: 1,
          delay:0.15,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power1.out',
        }
      )
      
      // Animate hero image on category change
      gsap.fromTo(".category-hero-image", 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )
      
      // Animate bottom image on category change
      gsap.fromTo(".category-bottom-image", 
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
            <h1 className="text-5xl md:text-6xl font-serif font-light text-white mb-4">Our Menu</h1>
            <p className="text-xl text-white/80 mb-2">Culinary Excellence at Creek'n'Greek</p>
            <p className="text-lg text-primary font-medium mt-4">
              {menuCategories[selectedCategory].name}
            </p>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              {menuCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                    selectedCategory === index
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-card text-foreground/70 hover:text-foreground border border-border"
                  }`}
                >
                  {category.name}
                </button>
              ))}
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
                    <h4 className="text-base md:text-lg font-serif font-medium text-foreground">{item.name}</h4>
                    <span className="text-primary font-semibold text-sm md:text-base whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-sm">{item.description}</p>
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
                    Experience the finest at Creek'n'Greek
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