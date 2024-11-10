import { Link } from "@remix-run/react";
import safeBiteLogo from "~/assets/safe_bite_logo.png";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";

export default function NavbarReservation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
            <Link to="/">
          <img src={safeBiteLogo} alt="Safe Bite Logo" className="rounded-full h-12 w-12" />
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <LanguageSelector />

          <button
            onClick={toggleMenu}
            className="block lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <span className="text-gray-600">&#10005;</span>
            ) : (
              <span className="text-gray-600">&#9776;</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
