import React, { useContext } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Header from "../components/Shared/Header/Header";
import MobileHeader from "../components/Shared/Header/MobileHeader";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

const Main = () => {
  const { cart, scrolltop, setSearchResult } = useContext(AuthContext);

  return (
    <div className="relative">
      <Link
        onClick={scrolltop}
        to="/cart"
        className={`bottom-5 right-5 z-50 animate-bounce ${
          cart.length > 0 ? "fixed" : "hidden"
        }`}
      >
        <div className=" relative rounded-full border-2 border-primary bg-white p-1 transition-all duration-300 ease-in-out hover:border-white hover:bg-primary hover:text-base-100">
          <BsBag className="cursor-pointer  p-2 text-4xl text-primary hover:text-white" />
          {cart && (
            <div className="absolute -top-1 -right-2 flex h-5 w-5 items-center   justify-center rounded-full bg-primary text-sm text-base-100">
              {cart.length}
            </div>
          )}
        </div>
      </Link>
      <Header></Header>
      <div className="md:hidden">
        <MobileHeader>
          <Outlet></Outlet>
        </MobileHeader>
      </div>
      <div className="hidden md:grid">
        <Outlet></Outlet>
      </div>
      <LazyLoadComponent>
        <Footer></Footer>
      </LazyLoadComponent>
    </div>
  );
};

export default Main;
