import React, { useRef, useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Marquee from "react-fast-marquee";
import { FaApple } from "react-icons/fa";
import {
  SiSamsung,
  SiAsus,
  SiRazer,
  SiIntel,
  SiAmd,
  SiNvidia,
  SiLogitech,
  SiDell,
  SiCorsair,
  SiMicrosoft,
  SiXiaomi,
} from "react-icons/si";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper";

function Banner() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaQueryChange = event => {
      setIsDesktop(event.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const imageUrls = [
      "https://i.ibb.co/Pc9jLbR/speaker.webp",
      "https://i.ibb.co/kXc9Xgt/headphone.webp",
      "https://i.ibb.co/6yk3vbS/Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405.webp",
      "https://i.ibb.co/6FW5G2d/MSI-MPG-Z690-EDGE-Wi-Fi-6-Gaming-Motherboard-Slider-1675861274.webp",
      "https://i.ibb.co/qF5Kd6H/Ben-Q-ZOWIE-XL2546-245-inch-Gaming-Monitor-Main-Slider-1675937487.webp",
    ];

    // Create an Image object for each image and set the src property
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    // <div className="hero bg-transparent md:rounded-xl lg:mx-auto">
    //   <div className="container mx-auto flex flex-col flex-wrap overflow-hidden">
    //     <div className="flex justify-center ">
    //       <div className="flex flex-col md:flex-col md:gap-12 lg:flex-row">
    //         <div className="card my-5 w-full object-cover md:my-10 md:px-0">
    //           <Swiper
    //             modules={[Pagination, Autoplay]}
    //             autoplay={{
    //               delay: 2500,
    //               disableOnInteraction: false,
    //             }}
    //             pagination={{
    //               clickable: true,
    //             }}
    //             className="mySwiper w-screen border border-primary md:w-[750px] md:rounded-2xl lg:w-[1200px]"
    //           >
    //             <SwiperSlide>
    //               <Link to="/laptop">
    //                 <LazyLoadImage
    //                   className="h-full w-full"
    //                   src="https://i.ibb.co/6yk3vbS/Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405.webp"
    //                   alt="image"
    //                 />
    //               </Link>
    //             </SwiperSlide>
    //             <SwiperSlide>
    //               <Link to="/components/motherboard">
    //                 <LazyLoadImage
    //                   className="h-full w-full"
    //                   src="https://i.ibb.co/6FW5G2d/MSI-MPG-Z690-EDGE-Wi-Fi-6-Gaming-Motherboard-Slider-1675861274.webp"
    //                   alt="image"
    //                 />
    //               </Link>
    //             </SwiperSlide>
    //             <SwiperSlide>
    //               <Link to="/monitor">
    //                 <LazyLoadImage
    //                   className="h-full w-full"
    //                   src="https://i.ibb.co/qF5Kd6H/Ben-Q-ZOWIE-XL2546-245-inch-Gaming-Monitor-Main-Slider-1675937487.webp"
    //                   alt="image"
    //                 />
    //               </Link>
    //             </SwiperSlide>
    //           </Swiper>
    //         </div>
    //         <div className="my-2 flex h-full items-start justify-around gap-3 px-2 md:my-10 md:items-center md:gap-5 md:px-0 lg:flex-col lg:items-end lg:justify-start lg:gap-0 lg:space-y-12 ">
    //           <div className="bg- card lg:card-side dark:bg-neutral">
    //             <img
    //               className="h-40  w-full rounded-2xl border border-primary object-cover md:h-72 lg:w-96"
    //               src="https://i.ibb.co/Pc9jLbR/speaker.webp"
    //               alt="image"
    //               width={300}
    //               height={160}
    //             />
    //           </div>

    //           <div className="card bg-white lg:card-side dark:bg-neutral">
    //             <img
    //               className="h-40 w-52 rounded-2xl border border-primary object-cover md:h-72 md:w-96"
    //               src="https://i.ibb.co/kXc9Xgt/headphone.webp"
    //               alt="image"
    //               width={300}
    //               height={160}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //
    //   </div>
    // </div>
    <div>
      <div className="bg-primary bg-opacity-10">
        <div className="container mx-auto">
          <div>
            <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className=""
            >
              <SwiperSlide>
                <div className="flex flex-col items-center justify-around gap-10 py-10 lg:flex-row lg:gap-0">
                  <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:text-start">
                    <p className="font-bold text-red-500">Coming Soon May</p>
                    <div className="text-4xl font-bold dark:text-white xl:text-6xl">
                      New Lenovo <br />
                      Laptop Intel <br />
                      Core I9 13900K
                    </div>
                    <Link to="/laptop" className="btn-primary btn h-10 w-32 ">
                      Shop Now
                    </Link>
                  </div>
                  <Link to="/laptop" className="">
                    <img
                      className="object-cover"
                      src="https://i.ibb.co/mqPKhHX/image-removebg-preview-2.webp"
                      alt="image"
                    />
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col items-center  justify-around gap-10 py-10 lg:flex-row lg:gap-0">
                  <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:text-start">
                    <p className="font-bold text-red-500">Latest Product</p>
                    <div className="text-4xl font-bold dark:text-white xl:text-6xl">
                      Macbook Pro <br />
                      Macbook Pro 14" <br />
                      Apple M2 Pro Chip
                    </div>

                    <Link to="/laptop" className="btn-primary btn h-10 w-32 ">
                      Shop Now
                    </Link>
                  </div>
                  <Link to="/laptop">
                    <LazyLoadImage
                      className=""
                      src="https://i.ibb.co/Dprx1Fh/image-removebg-preview-4.webp"
                      alt="image"
                    />
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col items-center justify-around gap-10 py-10 lg:flex-row lg:gap-0">
                  <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:text-start">
                    <p className="font-bold text-red-500">Coming Soon May</p>
                    <div className="text-4xl font-bold dark:text-white xl:text-6xl">
                      Ultra Reborn
                      <br />
                      Samsung S23 Ultra
                      <br />
                      200MP Wow-worthy resolution
                    </div>
                    <Link
                      to="/smartphone"
                      className="btn-primary btn h-10 w-32 "
                    >
                      Shop Now
                    </Link>
                  </div>
                  <Link to="/laptop">
                    <LazyLoadImage
                      className=""
                      src="https://i.ibb.co/vj1jcZ1/image-removebg-preview-5.webp"
                      alt="samsung"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      {isDesktop && (
        <Marquee
          className="h-10 w-screen overflow-hidden lg:h-28 "
          speed={150}
          pauseOnHover={true}
          gradient={false}
        >
          <FaApple className="p-3 text-6xl text-black transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiSamsung className="p-0 text-5xl text-blue-600 transition-all duration-300 lg:text-8xl  " />

          <SiXiaomi className="p-3 text-6xl text-orange-500 transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiAsus className="p-1 text-5xl text-blue-600 transition-all duration-300 lg:text-8xl  " />

          <SiRazer className="p-3 text-6xl text-green-600 transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiMicrosoft className="p-3 text-6xl text-primary transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiIntel className="p-3 text-6xl text-primary transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiAmd className="p-1 text-5xl text-black transition-all duration-300 lg:text-8xl  " />

          <SiNvidia className="p-3 text-6xl text-green-500 transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiDell className="p-3 text-6xl text-black transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiLogitech className="p-3 text-6xl text-sky-500 transition-all duration-300 lg:p-5 lg:text-8xl  " />

          <SiCorsair className="p-3 text-6xl text-black transition-all duration-300 lg:p-5 lg:text-8xl " />

          <LazyLoadImage
            src="https://i.ibb.co/Jp47P3J/noctua-logo.webp"
            alt="noctua-logo"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/H7vP3xf/sapphire-logo.png"
            alt="sapphire-logo"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/9HB36Tg/tt.png"
            alt="tt"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/xGkffpc/zotac.webp"
            alt="zotac-logo-big"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/4Jd2GJ5/1611033291-nzxt-logo.webp"
            alt="1611033291-nzxt-logo"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/1McwKJV/antec.webp"
            alt="antec"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/fCZ1gbP/Cooler-Master-Logo.webp"
            alt="Cooler-Master-Logo"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/HBwfqGs/Deepcool-logo-black.webp"
            alt="Deepcool-logo-black"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/vY7TxTh/Gigabyte-Symbol.png"
            alt="Gigabyte-Symbol"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/nczC9yv/gskill.webp"
            alt="gskill"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/PNzDXWV/lianli-f.jpg"
            alt="lianli-f"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/gV36YBn/montech.png"
            alt="montech"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
          <LazyLoadImage
            src="https://i.ibb.co/TcBrDB1/msi.webp"
            alt="MSI-Logo"
            border="0"
            className="mr-5 w-20 md:w-24"
          />
        </Marquee>
      )}
    </div>
  );
}
export default Banner;
