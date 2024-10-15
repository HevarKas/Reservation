import { Link } from "@remix-run/react";
import safeBiteLogo from "~/assets/safe_bite_logo.jpg";

export default function NavbarReservation() {
  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
            <Link to="/">
          <img src={safeBiteLogo} alt="Safe Bite Logo" className="rounded-full h-12 w-12" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
