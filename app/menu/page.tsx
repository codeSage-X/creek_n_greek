"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const menuCategories = [
  {
    name: "The Main Act",
    heroImage: "/menu/main.png",
    bottomImage: "/menu/main2.png",
    items: [
      { name: "Creek Combo Platter", description: "4 Spring Roll, 4 Samosa, 4 Beef, 4 Chicken Wings, 6 Yams, 4 Sausage, 6 Gizzard, 4 Snail, 3 Turkey and Salad", price: "₦55,000" },
      { name: "Chicken Fried Rice", description: "Stir fry vegetables with marinated diced chicken and eggs", price: "₦6,000" },
      { name: "Spicy Goat Meat Rice", description: "Spicy goat meat with vegetable leaf", price: "₦6,000" },
      { name: "Native Rice", description: "Rice made with traditional red palm oil giving it a distinct earthly aroma", price: "₦6,000" },
      { name: "Chicken Burger", description: "Seasoned chicken patty, tomatoes and onions served with french fries", price: "₦10,000" },
      { name: "Beef Burger", description: "Seasoned beef patty, tomatoes and onions served with french fries", price: "₦10,000" },
      { name: "Chicken Steak", description: "Grilled chicken breast", price: "₦17,000" },
      { name: "Chicken Curry", description: "Rich marinated chicken chunks simmered in velvety sauce of golden turmeric, ginger and garlic with coconut cream, sauteed bell peppers, carrots and onions served with basmati rice", price: "₦17,000" },
    ],
  },
  {
    name: "Flavoured Strands",
    heroImage: "/menu/pasta.png",
    bottomImage: "/menu/pasta2.png",
    items: [
      { name: "Stir Fry Pasta", description: "Spaghetti with stir fry chicken, carrots, bell peppers and soy sauce", price: "₦12,000" },
      { name: "Spaghetti Bolognese", description: "Made with minced beef, onions, garlic, tomatoes and herbs, sauce simmered to develop deep flavor", price: "₦12,000" },
    ],
  },
  {
    name: "Noshes",
    heroImage: "/menu/noshes.png",
    bottomImage: "/menu/noshes2.png",
    items: [
      { name: "Beef Spring Roll", description: "Shredded seasoned beef sauteed with cabbage, carrot wrapped in thin flour fried to golden perfection, served with peppered sauce or sweet chili sauce", price: "₦10,000" },
      { name: "Chicken Spring Roll", description: "Shredded seasoned chicken sauteed with cabbage, carrot wrapped in thin flour fried to golden perfection, served with pepper sauce or sweet chili sauce", price: "₦10,000" },
      { name: "Samosa", description: "Hand folded crispy pastries filled with seasoned minced beef, green peas, carrot and aromatic spices", price: "₦10,000" },
    ],
  },
  {
    name: "Add-ons",
    heroImage: "/menu/addons.png",
    bottomImage: "/menu/addons2.png",
    items: [
      { name: "Yam Fries", description: "Golden fried yam pieces", price: "₦5,000" },
      { name: "Potatoes Chops", description: "Seasoned potato bites", price: "₦5,000" },
      { name: "Plantain Chops", description: "Crispy fried plantain", price: "₦5,000" },
      { name: "French Fries", description: "Classic golden fries", price: "₦5,000" },
      { name: "Mashed Potatoes", description: "Creamy mashed potatoes", price: "₦5,000" },
      { name: "White Rice", description: "Steamed white rice", price: "₦5,000" },
      { name: "Creek Chicken Salad", description: "Fresh chicken salad", price: "₦7,000" },
      { name: "Coleslaw", description: "Fresh coleslaw", price: "₦3,000" },
    ],
  },
  {
    name: "Peppered Delights",
    heroImage: "/menu/peppered.png",
    bottomImage: "/menu/peppered2.png",
    items: [
      { name: "Peppered Snail", description: "Spicy jumbo snail", price: "₦12,000" },
      { name: "Peppered Goat Meat", description: "Nigerian spicy goat meat", price: "₦10,000" },
      { name: "Peppered Gizzard", description: "Spicy gizzard", price: "₦10,000" },
      { name: "Peppered Beef", description: "Spicy beef", price: "₦10,000" },
      { name: "Peppered Wings", description: "Spicy wings", price: "₦10,000" },
      { name: "Peppered Turkey", description: "Soft and spicy turkey", price: "₦15,000" },
      { name: "Peppered Croaker Fish", description: "Spicy grilled fish with onions, bell pepper and fresh herbs", price: "₦10,000" },
    ],
  },
  {
    name: "Pepper Soup",
    heroImage: "/menu/soup.png",
    bottomImage: "/menu/soup2.png",
    items: [
      { name: "Goat Meat Pepper Soup", description: "Spicy pepper soup with goat meat", price: "₦8,000" },
      { name: "Chicken Pepper Soup", description: "Spicy pepper soup with chicken", price: "₦8,000" },
    ],
  },
  {
    name: "Prelude",
    heroImage: "/menu/prelude.png",
    bottomImage: "/menu/prelude2.png",
    items: [
      { name: "Chicken Kebab", description: "Marinated chicken, skewered with bell pepper and grilled over open flames for a smoky finish", price: "₦15,000" },
      { name: "Mushrooms in Barter", description: "Stir fry mushrooms", price: "₦8,500" },
      { name: "Beef Kebab", description: "Marinated beef skewered with bell peppers and carrots grilled over open flames for a smoky finish", price: "₦15,000" },
      { name: "BTS Chicken", description: "Chicken balls with wings sauce", price: "₦12,500" },
      { name: "Chicken Drumstick", description: "Crispy chicken drumstick", price: "₦12,000" },
    ],
  },
  {
    name: "Cocktails",
    heroImage: "/menu/cocktail.png",
    bottomImage: "/menu/cocktail2.png",
    items: [
      { name: "Adios Cocktail", description: "Signature house cocktail", price: "₦13,000" },
      { name: "Apple Classic", description: "Classic apple cocktail", price: "₦7,500" },
      { name: "Pinacolada", description: "Coconut and pineapple blend", price: "₦10,500" },
      { name: "Frozen Delight Concur", description: "Frozen fruit cocktail", price: "₦11,000" },
      { name: "Mojito", description: "Classic mint cocktail", price: "₦10,500" },
      { name: "Long Island Iced Tea", description: "Mixed spirits cocktail", price: "₦13,500" },
      { name: "Sex on the Beach", description: "Fruity vodka cocktail", price: "₦11,000" },
      { name: "Liquid Marijuana", description: "Tropical green cocktail", price: "₦11,500" },
      { name: "Wild Thought", description: "House special", price: "₦11,000" },
      { name: "Frozen Key Lime Pie", description: "Creamy lime cocktail", price: "₦11,000" },
      { name: "Tequila Sunrise", description: "Orange and grenadine cocktail", price: "₦10,500" },
      { name: "Strawberry Margarita", description: "Frozen strawberry margarita", price: "₦13,000" },
      { name: "Screaming Orgasm", description: "Creamy coffee cocktail", price: "₦13,500" },
      { name: "Sex in the Driveway", description: "Blue curaçao cocktail", price: "₦11,000" },
    ],
  },
  {
    name: "Sour Cocktails",
    heroImage: "/menu/sour.png",
    bottomImage: "/menu/sour2.png",
    items: [
      { name: "French 75", description: "Gin, lime juice, simple syrup, champagne", price: "₦11,000" },
      { name: "Cranberry Margarita", description: "Cranberry and tequila blend", price: "₦10,500" },
      { name: "Cosmopolitan", description: "Vodka, cranberry, triple sec, lime", price: "₦10,500" },
      { name: "Whisky Sour", description: "Whiskey, lime juice, simple syrup", price: "₦11,000" },
    ],
  },
  {
    name: "Strong Cocktails",
    heroImage: "/menu/strong.png",
    bottomImage: "/menu/strong2.png",
    items: [
      { name: "Life After Death", description: "Multi-spirit strong cocktail", price: "₦13,500" },
      { name: "Greek Special", description: "House signature strong cocktail", price: "₦13,000" },
      { name: "Road to Hell", description: "Potent mixed cocktail", price: "₦10,500" },
      { name: "Maitai", description: "Rum-based tropical cocktail", price: "₦13,500" },
      { name: "Electric Island", description: "Blue electric cocktail", price: "₦13,500" },
      { name: "Espresso Martini", description: "Coffee and vodka martini", price: "₦13,500" },
      { name: "Adios Motherfucker", description: "Strong blue cocktail", price: "₦11,500" },
      { name: "Old Fashioned", description: "Classic whiskey cocktail", price: "₦11,500" },
      { name: "White Russian", description: "Vodka, coffee liqueur, cream", price: "₦12,000" },
      { name: "Negroni", description: "Gin, vermouth, Campari", price: "₦12,000" },
      { name: "Manhattan", description: "Whiskey and vermouth", price: "₦12,000" },
      { name: "Boulevardier", description: "Bourbon negroni variation", price: "₦12,000" },
      { name: "Jungle Bird", description: "Rum and Campari tropical", price: "₦12,000" },
    ],
  },
  {
    name: "Mocktails",
    heroImage: "/menu/mocktail.png",
    bottomImage: "/menu/mocktail2.png",
    items: [
      { name: "Peach Flamingo", description: "Peach flavored refresher", price: "₦11,000" },
      { name: "Chapman", description: "Classic Nigerian mocktail", price: "₦10,000" },
      { name: "Blue Hawaii", description: "Tropical blue refresher", price: "₦11,000" },
      { name: "Beach Water", description: "Light tropical mocktail", price: "₦10,000" },
      { name: "Virgin Sunrise", description: "Orange and grenadine blend", price: "₦10,000" },
      { name: "Blue Sky Coconut Mojito", description: "Coconut and mint refresher", price: "₦11,000" },
    ],
  },
  {
    name: "Smoothies",
    heroImage: "/menu/smoothies.png",
    bottomImage: "/menu/smoothies2.png",
    items: [
      { name: "Barman Special", description: "House special blend", price: "₦11,000" },
      { name: "Coconut Paradise", description: "Coconut tropical blend", price: "₦11,000" },
      { name: "Special Smoothie", description: "Chef's special blend", price: "₦11,000" },
      { name: "Strawberry Fantasy", description: "Strawberry cream blend", price: "₦11,000" },
      { name: "Ginger Flame", description: "Ginger spiced blend", price: "₦11,000" },
      { name: "Bliss Special", description: "Fruity bliss blend", price: "₦11,000" },
    ],
  },
  {
    name: "Milkshakes",
    heroImage: "/menu/milkshake.png",
    bottomImage: "/menu/milkshakes.png",
    items: [
      { name: "Vanilla Milkshake", description: "Classic vanilla shake", price: "₦11,000" },
      { name: "Strawberry Milkshake", description: "Creamy strawberry blend", price: "₦11,000" },
      { name: "Chocolate Milkshake", description: "Rich chocolate indulgence", price: "₦11,000" },
      { name: "Oreo Milkshake", description: "Cookies and cream blend", price: "₦13,000" },
    ],
  },
  {
    name: "Fresh Juices",
    heroImage: "/menu/juice.png",
    bottomImage: "/menu/juice2.png",
    items: [
      { name: "Pineapple Juice", description: "Fresh pressed pineapple", price: "₦4,500" },
      { name: "Watermelon Juice", description: "Refreshing watermelon blend", price: "₦4,500" },
      { name: "Orange Juice", description: "Freshly squeezed oranges", price: "₦4,500" },
      { name: "Tigernut Drink", description: "Traditional tigernut drink", price: "₦3,500" },
      { name: "Fruity Zobo", description: "Hibiscus fruit punch", price: "₦5,500" },
      { name: "Pineapple & Ginger Juice", description: "Pineapple with ginger kick", price: "₦5,500" },
    ],
  },
  {
    name: "Combo Juices",
    heroImage: "/menu/combo.png",
    bottomImage: "/menu/combo2.png",
    items: [
      { name: "Carrot, Ginger & Pineapple", description: "Healthy vitamin blend", price: "₦6,500" },
      { name: "Pineapple & Orange", description: "Citrus tropical blend", price: "₦6,500" },
      { name: "Beetroot & Pineapple", description: "Antioxidant rich blend", price: "₦6,500" },
      { name: "Pineapple & Tigernut", description: "Creamy tropical blend", price: "₦6,500" },
      { name: "Pineapple, Watermelon & Carrot", description: "Triple fruit blend", price: "₦6,500" },
    ],
  },
  {
    name: "Parfait & Yoghurt",
    heroImage: "/menu/parfait.png",
    bottomImage: "/menu/parfait2.png",
    items: [
      { name: "500ML Parfait", description: "Layered yoghurt parfait", price: "₦7,500" },
      { name: "550ML Parfait", description: "Medium parfait serving", price: "₦9,500" },
      { name: "Deluxe Parfait", description: "Premium large parfait", price: "₦13,000" },
      { name: "Coconut Yoghurt", description: "Creamy coconut yoghurt", price: "₦5,500" },
      { name: "Strawberry Yoghurt", description: "Fresh strawberry yoghurt", price: "₦5,500" },
      { name: "Plain Yogurt", description: "Classic plain yogurt", price: "₦5,500" },
    ],
  },
  {
    name: "Beach Vibe",
    heroImage: "/menu/beach.png",
    bottomImage: "/menu/beach2.png",
    items: [
      { name: "Ocean Breeze Coconut", description: "Tropical coconut refresher", price: "₦3,500" },
      { name: "Island Breeze Coconut", description: "Island style coconut drink", price: "₦5,500" },
    ],
  },
  {
    name: "Coconut Water & Vodka",
    heroImage: "/menu/coconut.png",
    bottomImage: "/menu/coconut2.png",
    items: [
      { name: "Tropical Pineapple", description: "Pineapple coconut vodka", price: "₦8,500" },
      { name: "Tropical Combo", description: "Mixed tropical vodka", price: "₦14,000" },
      { name: "Tropical Splash", description: "Premium tropical vodka blend", price: "₦19,500" },
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
    name: "Pineapple & Vodka",
    heroImage: "/menu/vodka.png",
    bottomImage: "/menu/vodka2.png",
    items: [
      { name: "Watermelon Waves", description: "Watermelon vodka blend", price: "₦8,500" },
    ],
  },
  {
    name: "Beer",
    heroImage: "/menu/beer.png",
    bottomImage: "/menu/beer2.png",
    items: [
      { name: "Heineken", description: "Premium lager", price: "₦3,500" },
      { name: "Water", description: "Still water", price: "₦1,000" },
    ],
  },
  {
    name: "Wine",
    heroImage: "/menu/wine.png",
    bottomImage: "/menu/wine2.png",
    items: [
      { name: "Carlo Rossi Red", description: "California red wine", price: "₦30,000" },
      { name: "Carlo Rossi White", description: "California white wine", price: "₦30,000" },
      { name: "Carlo Rossi Rose", description: "California rosé wine", price: "₦30,000" },
      { name: "Declan White", description: "White wine", price: "₦30,000" },
      { name: "Declan Red", description: "Red wine", price: "₦30,000" },
      { name: "Declan Rose", description: "Rosé wine", price: "₦30,000" },
      { name: "Drosty", description: "South African wine", price: "₦30,000" },
      { name: "Sweet Kiss", description: "Sweet wine", price: "₦30,000" },
      { name: "Escudo Rojo", description: "Chilean red wine", price: "₦50,000" },
      { name: "4 Cousins Red, White & Rose", description: "South African blend", price: "₦30,000" },
      { name: "Martinellis", description: "Sparkling cider", price: "₦35,000" },
      { name: "Nederburg", description: "Premium South African", price: "₦50,000" },
      { name: "Silk and Spice", description: "Portuguese blend", price: "₦40,000" },
      { name: "Lamothe Parrot", description: "French wine", price: "₦30,000" },
      { name: "Cooper and Thief", description: "Premium California", price: "₦100,000" },
      { name: "Ventiterre Merlot", description: "Italian Merlot", price: "₦30,000" },
      { name: "4th Street", description: "Sweet wine", price: "₦25,000" },
      { name: "Thomas Barton", description: "Bordeaux wine", price: "₦70,000" },
      { name: "Jarrow", description: "Classic wine", price: "₦25,000" },
    ],
  },
  {
    name: "Champagne",
    heroImage: "/menu/champagne.png",
    bottomImage: "/menu/champagne2.png",
    items: [
      { name: "Ace of Spade Brut 1", description: "Armand de Brignac", price: "₦1,100,000" },
      { name: "Veuve Clicquot Brut", description: "Yellow Label", price: "₦200,000" },
      { name: "Veuve Clicquot Rich", description: "Sweet champagne", price: "₦250,000" },
      { name: "Belaire", description: "Luc Belaire sparkling", price: "₦120,000" },
      { name: "Angelus Premium Champagne", description: "Premium selection", price: "₦120,000" },
      { name: "G.H Mumm", description: "Cordon Rouge", price: "₦150,000" },
      { name: "Moet & Chandon Brut", description: "Imperial Brut", price: "₦200,000" },
      { name: "Dom Perignon (Light Up)", description: "Vintage champagne", price: "₦1,100,000" },
      { name: "Moet & Chandon Rose", description: "Imperial Rosé", price: "₦250,000" },
      { name: "Roederer", description: "Louis Roederer", price: "₦1,100,000" },
    ],
  },
  {
    name: "Whisky",
    heroImage: "/menu/whiskey.png",
    bottomImage: "/menu/whiskey2.png",
    items: [
      { name: "American Honey", description: "Wild Turkey honey whiskey", price: "₦55,000" },
    
      { name: "Johnnie Walker Black Label", description: "12 year blended Scotch", price: "₦110,000" },
      { name: "Johnnie Walker Blue Label", description: "Premium blended Scotch", price: "₦900,000" },
      { name: "Johnnie Walker Gold Label", description: "Reserve blend", price: "₦120,000" },
      { name: "Chivas Regal 12 Years", description: "Blended Scotch", price: "₦100,000" },
      { name: "Chivas Regal 15 Years", description: "Premium blend", price: "₦150,000" },
      { name: "Chivas Regal 18 Years", description: "Gold Signature", price: "₦200,000" },
      { name: "Glenfiddich 12 Years", description: "Single malt Scotch", price: "₦120,000" },
      { name: "Glenfiddich 15 Years", description: "Solera Reserve", price: "₦200,000" },
      { name: "Glenfiddich 18 Years", description: "Small Batch Reserve", price: "₦350,000" },
      { name: "Glenfiddich 21 Years", description: "Gran Reserva", price: "₦700,000" },
      { name: "Glenfiddich 23 Years", description: "Grand Cru", price: "₦1,000,000" },
      { name: "Glenfiddich 26 Years", description: "Excellence", price: "₦1,400,000" },
      { name: "Glenlivet 12 Years", description: "Single malt", price: "₦150,000" },
      { name: "Glenlivet 15 Years", description: "French Oak Reserve", price: "₦200,000" },
      { name: "Glenlivet 18 Years", description: "Single malt", price: "₦300,000" },
      { name: "Glenlivet 21 Years", description: "Archive", price: "₦600,000" },
      { name: "Glenmorangie 10 Years", description: "Original", price: "₦100,000" },
      { name: "Glenmorangie 18 Years", description: "Extremely Rare", price: "₦300,000" },
      { name: "Gold Bar Original", description: "Gold Bottle whiskey", price: "₦220,000" },
      { name: "Jack Daniels", description: "Tennessee whiskey", price: "₦100,000" },
      { name: "Jameson Black", description: "Black Barrel Irish", price: "₦100,000" },
      { name: "Jameson Green", description: "Original Irish whiskey", price: "₦60,000" },
      { name: "Johnnie Walker 18 Years", description: "Ultimate Label", price: "₦250,000" },
      { name: "Johnnie Walker Blonde", description: "Blonde blend", price: "₦60,000" },
      { name: "Kirkcowen Single Malt", description: "Scottish single malt", price: "₦85,000" },
      { name: "Teeling Whisky Single Malt", description: "Irish single malt", price: "₦150,000" },
      { name: "Teeling Single Grain", description: "Irish single grain", price: "₦120,000" },
      { name: "Teeling Small Batch", description: "Irish blend", price: "₦80,000" },
      { name: "Teeling Renaissance 21 Years", description: "Premium aged Irish", price: "₦550,000" },
      { name: "Macallan 12 Years", description: "Sherry Oak", price: "₦200,000" },
      { name: "Macallan 15 Years", description: "Double Cask", price: "₦350,000" },
      { name: "Macallan A Night on Earth", description: "Limited edition", price: "₦650,000" },
      { name: "Macallan 18 Years", description: "Sherry Oak", price: "₦700,000" },
      { name: "Macallan Rare Cask", description: "Rare selection", price: "₦900,000" },
      { name: "Singleton 12 Years", description: "Single malt", price: "₦120,000" },
      { name: "Singleton 15 Years", description: "Premium single malt", price: "₦200,000" },
    ],
  },
   {name: "Congnac ",
    heroImage: "/menu/cognac.png",
    bottomImage: "/menu/whiskey2.png", 
    items: [
      { name: "Bisquit & Dubouche VSOP", description: "Cognac VSOP", price: "₦200,000" },
    ],
  },
  {
    name: "Cream",
    heroImage: "/menu/cream.png",
    bottomImage: "/menu/cream2.png",
    items: [
      { name: "Baileys", description: "Irish cream liqueur", price: "₦80,000" },
    ],
  },
  {
    name: "Tequila",
    heroImage: "/menu/tequila.png",
    bottomImage: "/menu/tequila2.png",
    items: [
      { name: "Aman Tequila Anejo", description: "Aged añejo tequila", price: "₦600,000" },
      { name: "Aman Tequila Blanco", description: "Crystal clear blanco", price: "₦250,000" },
      { name: "Aman Tequila Reposado", description: "Rested tequila", price: "₦250,000" },
      { name: "Aman Tequila Cristalino", description: "Filtered añejo", price: "₦600,000" },
      { name: "Buen Amigo", description: "Smooth tequila", price: "₦75,000" },
      { name: "Casamigos", description: "Ultra-premium tequila", price: "₦400,000" },
      { name: "Don Julio 1942", description: "Luxury añejo", price: "₦700,000" },
      { name: "Don Julio Reposado", description: "Aged reposado", price: "₦300,000" },
      { name: "Olmeca Tequila Silver", description: "Silver tequila", price: "₦75,000" },
      { name: "Don Julio Blanco", description: "Premium blanco", price: "₦300,000" },
      { name: "Volcan Blanco", description: "Volcanic soil tequila", price: "₦170,000" },
      { name: "Volcan XA", description: "Extra añejo", price: "₦65,000" },
      { name: "Sierra Tequila", description: "Classic Mexican tequila", price: "₦80,000" },
    ],
  },
  {
    name: "Gin",
    heroImage: "/menu/gin.png",
    bottomImage: "/menu/gin2.png",
    items: [
      { name: "Bombay Sapphire", description: "London dry gin", price: "₦45,000" },
      { name: "Tanqueray No. Ten", description: "Premium gin", price: "₦100,000" },
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
              Culinary Excellence at Creek'n'Greek
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
                    <h4 className="text-base md:text-lg font-serif font-medium text-foreground">
                      {item.name}
                    </h4>
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