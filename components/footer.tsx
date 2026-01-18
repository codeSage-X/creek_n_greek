import { Instagram, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-2xl text-primary mb-2">
              Creek&apos;n&apos;Greek
            </h3>
            <p className="text-foreground/70 text-sm">
              Luxury Redefined
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg mb-4">Navigation</h4>

            {/* ✅ Grid on mobile */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 justify-items-center md:justify-items-start">
              {["Home", "About", "Gallery", "Menu", "Events", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg mb-4">Contact</h4>

            <div className="space-y-3 max-w-xs">
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-foreground/70 text-sm">
                  No.7 Sam Wobo Street, Abacha Road, GRA Phase 3, Port Harcourt
                </p>
              </div>

              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+2347060893264"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  07060893264
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg mb-4">Follow Us</h4>
            <div className="flex gap-6">
              <a
                href="https://instagram.com/creekngreek"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/2347060893264"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-foreground/50 text-sm">
            © 2025 Creek N Greek. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
