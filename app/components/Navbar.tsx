import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">MyLogo</div>

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

        <ul className="hidden md:flex md:flex-row md:space-x-6">
          {["slider", "about", "services", "reservation", "contact-us"].map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase().replace(" ", "")}`}
                className="block text-gray-600 hover:text-blue-500"
                onClick={closeMenu}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={closeMenu}
              role="button"
              tabIndex={0}
              aria-label="Close menu overlay"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  closeMenu();
                }
              }}
            />
            <div className="fixed top-0 right-0 bg-white w-64 h-full shadow-lg z-50 transition-transform transform translate-x-0">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={closeMenu} className="text-gray-600" aria-label="Close menu">
                  &#10005;
                </button>
              </div>
              <ul className="flex flex-col p-4 space-y-2">
                {["slider", "about", "services", "reservation", "contact-us"].map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section.toLowerCase().replace(" ", "")}`}
                      className="block text-gray-600 hover:text-blue-500"
                      onClick={closeMenu}
                    >
                      {section}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
