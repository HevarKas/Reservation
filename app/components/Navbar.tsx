import { Link } from "react-scroll";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";
import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import safeBiteLogo from "~/assets/safe_bite_logo.jpg";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const title = t("navbar.title");
  const about = t("navbar.about");
  const service = t("navbar.service");
  const information = t("navbar.information");
  const testimonial = t("navbar.testimonial");
  const contact = t("navbar.contact");
  const price = t("navbar.price");
  const reservation = t("navbar.reservation");

  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
        <Link to="/">
          <img src={safeBiteLogo} alt="Safe Bite Logo" className="rounded-full h-12 w-12" />
        </Link>
        </div>

        <ul className="hidden lg:flex lg:flex-row items-center lg:space-x-6">
          {[title, about, service, information, testimonial, contact, price].map((section) => (
            <li key={section}>
              <Link
                to={section.toLowerCase().replace(" ", "")}
                className="block text-gray-600 hover:text-blue-500 cursor-pointer"
                smooth={true}
                duration={800}
                offset={-70}
                activeClass="text-blue-500 font-bold"
              >
                {section}
              </Link>
            </li>
          ))}
          <NavLink to="/reservation" className="bg-blue-600 py-1 px-2 text-white rounded-md">
          {reservation}
          </NavLink>
        </ul>

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

        {isOpen && (
          <div className="fixed top-0 right-0 bg-white w-64 h-full shadow-lg z-50">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={closeMenu} className="text-gray-600" aria-label="Close menu">
                &#10005;
              </button>
            </div>
            <ul className="flex flex-col p-4 space-y-2">
              {[title, about, service, information, testimonial, contact, price].map((section) => (
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
          <NavLink to="/reservation" className="bg-blue-600 p-1 text-white rounded-md text-center">
          {reservation}
          </NavLink>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
