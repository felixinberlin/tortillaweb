import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LanguageSync from "./components/layout/LanguageSync";

export default function App() {
  return (
    <>
      <LanguageSync />

      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}