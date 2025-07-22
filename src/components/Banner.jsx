import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/image1.jpg";
import banner2 from "../assets/image2.jpg";
import banner3 from "../assets/image3.jpg";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCTAClick = () => {
    navigate(user ? "/posts" : "/login");
  };

  return (
    <>
      <Helmet>
        <title>Home | Volunteer Hub</title>
      </Helmet>

      {/* Hero Section */}
      <div className="mt-10 md:mt-10 lg:mt-20 dark:bg-[#0f172a] text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          
          {/* Left Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Empower Communities<br />
              Through <span className="text-orange-500">Volunteering</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-md">
              Connect with passionate volunteers and make real-world impact in health, education, climate, and beyond.
            </p>
            <button
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg transition"
            >
              {user ? "Browse Opportunities" : "Join as Volunteer"}
            </button>
          </div>

          {/* Right Slider Section */}
          <div className="flex-1 w-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              loop={true}
              className="rounded-2xl"
            >
              {[banner1, banner2, banner3].map((banner, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={banner}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-[300px] md:h-[400px] object-cover object-center"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
