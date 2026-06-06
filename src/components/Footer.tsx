export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-xl font-black tracking-brand uppercase">GlowCart</p>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Essentials & elevated everyday — fashion, tech, and the in-between.
            Designed to last, priced fair, shipped worldwide.
          </p>
          <form className="mt-6 flex max-w-sm border-b border-foreground/30 pb-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="text-[11px] tracking-brand uppercase font-semibold">Subscribe →</button>
          </form>
        </div>
        <div>
          <h4 className="text-[11px] tracking-brand uppercase font-semibold mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li>Clothes</li><li>Mobiles</li><li>Tablets</li><li>Laptops</li><li>Accessories</li><li>College Essentials</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] tracking-brand uppercase font-semibold mb-4">Info</h4>
          <ul className="space-y-2.5 text-sm">
            <li>Student discount</li><li>Shipping & returns</li><li>Contact</li><li>FAQ</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-[11px] tracking-brand uppercase text-muted-foreground">
        © {new Date().getFullYear()} GlowCart
      </div>
    </footer>
  );
}
