import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-foreground text-cream">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-2xl font-black tracking-brand uppercase">GlowCart</p>
          <p className="mt-4 text-sm opacity-70 max-w-sm leading-relaxed">
            Essentials & elevated everyday — fashion, tech, and the in-between.
            Designed to last, priced fair, shipped across India.
          </p>
          <form className="mt-6 flex max-w-sm border-b border-cream/30 pb-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent text-sm placeholder:text-cream/50 focus:outline-none"
            />
            <button className="text-[11px] tracking-brand uppercase font-semibold">Subscribe →</button>
          </form>
        </div>

        <div>
          <h4 className="text-[11px] tracking-brand uppercase font-semibold mb-4 opacity-70">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li>Clothes</li><li>Mobiles</li><li>Tablets</li><li>Laptops</li><li>Accessories</li><li>College Essentials</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-brand uppercase font-semibold mb-4 opacity-70">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 opacity-70" />
              <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 opacity-70" />
              <a href="mailto:hello@glowcart.in" className="hover:underline">hello@glowcart.in</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram className="h-4 w-4 opacity-70" />
              <a href="https://instagram.com/glowcart" target="_blank" rel="noreferrer" className="hover:underline">@glowcart</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Linkedin className="h-4 w-4 opacity-70" />
              <a href="https://linkedin.com/company/glowcart" target="_blank" rel="noreferrer" className="hover:underline">/company/glowcart</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-[11px] tracking-brand uppercase opacity-60">
        © {new Date().getFullYear()} GlowCart — Crafted in India
      </div>
    </footer>
  );
}
