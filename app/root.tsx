import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./tailwind.css";
import { LanguageProvider } from "./components/LanguageContext";
import safeBiteLogo from "~/assets/safe_bite_logo.png";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={safeBiteLogo}  className="rounded-full h-12 w-12" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
       <LanguageProvider>
          <ToastContainer />
          <Outlet />
       </LanguageProvider>
  );
}
