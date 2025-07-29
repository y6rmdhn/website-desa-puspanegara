import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <nav className="h-20 max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/img/1753327261723.png"
            alt="Logo Puspanegara"
            className="w-14 h-14 object-cover rounded-md"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="font-semibold text-slate-600 flex items-center gap-6 text-base">
          <Link to="/" className="hover:text-green-600 transition-colors">
            <li>Home</li>
          </Link>
          <Link to="/umkm" className="hover:text-green-600 transition-colors">
            <li>UMKM</li>
          </Link>
        </ul>

        {/* Action Button */}
        <div>
          <Button className="bg-green-600 hover:bg-green-700">Login</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
