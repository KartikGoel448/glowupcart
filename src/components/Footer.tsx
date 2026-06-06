export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-gradient">GlowCart</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Bright finds for everyday life — fashion, tech, and beyond.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Clothes</li><li>Mobiles</li><li>Tablets</li><li>Laptops</li><li>Accessories</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Students</h4>
          <p className="text-sm text-muted-foreground">
            Use code <span className="font-bold text-primary">STUDENT15</span> for 15% off your order.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shipping</li><li>Returns</li><li>Contact</li><li>FAQ</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GlowCart. Demo storefront.
      </div>
    </footer>
  );
}
