import { Link } from "react-scroll";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">MyLogo</div>

        <ul className="hidden md:flex md:flex-row md:space-x-6">
          {["about", "services", "reservation", "information", "contact", "price"].map((section) => (
            <li key={section}>
              <Link
                to={section.toLowerCase().replace(" ", "")}
                className="block text-gray-600 hover:text-blue-500"
                smooth={true}
                duration={800}
                offset={-70}
                activeClass="text-blue-500 font-bold"
              >
                {section}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-8">
          <LanguageSelector />

          <button
            onClick={toggleMenu}
            className="block md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <span className="text-gray-600">&#10005;</span>
            ) : (
              <span className="text-gray-600">&#9776;</span>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="fixed top-0 right-0 bg-white w-64 h-full shadow-lg z-50">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={closeMenu} className="text-gray-600" aria-label="Close menu">
                &#10005;
              </button>
            </div>
            <ul className="flex flex-col p-4 space-y-2">
              {["about", "services", "reservation", "information", "contact", "price"].map((section) => (
                <li key={section}>
<Link
                to={section.toLowerCase().replace(" ", "")}
                className="block text-gray-600 hover:text-blue-500"
                smooth={true}
                duration={800}
                offset={-70}
                activeClass="text-blue-500 font-bold"
              >
                    {section}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
