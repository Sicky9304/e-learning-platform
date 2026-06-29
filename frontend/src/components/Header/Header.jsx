import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");

    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020817]/80 backdrop-blur-xl">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-1 min-w-0">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav
          user={user}
          handleLogout={handleLogout}
        />

        {/* Action Buttons for Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Cart Icon */}
          <button
            onClick={() => navigate("/checkout")}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition cursor-pointer"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          profileMenuOpen={profileMenuOpen}
          setProfileMenuOpen={setProfileMenuOpen}
          user={user}
          handleLogout={handleLogout}
        />
      </nav>
    </header>
  );
};

export default Header;
