import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
  <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-[80vh] max-w-7xl mx-auto px-4">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
</div>
  );
};

export default MainLayout;
