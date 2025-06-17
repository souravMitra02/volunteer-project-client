import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Hammer, Megaphone, MousePointerClick } from "lucide-react";
import { Helmet } from "react-helmet";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import banner1 from "../assets/image1.jpg";
import banner2 from "../assets/image2.jpg";
import banner3 from "../assets/image3.jpg";

const Banner = () => {
  return (
    <>
      {/* Helmet Title */}
      <Helmet>
        <title>Home | Volunteer Hub</title>
      </Helmet>

      {/* Banner Slider Section */}
      <div className="relative w-full h-[80vh] md:h-[150vh]">
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
            Volunteer Hub
          </h1>
          <p className="text-lg md:text-2xl font-light drop-shadow-md mb-6">
            Connect, Contribute, and Make a Difference in Your Community
          </p>
          <button className="btn btn-primary px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300">
            Get Started
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="h-full"
        >
          {[banner1, banner2, banner3].map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-[80vh] md:h-[100vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${banner})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Info Card Section */}
      <section className="bg-white dark:bg-gray-900 px-4 py-16 max-w-7xl mx-auto -mt-40 md:-mt-48 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl text-center transition hover:bg-green-50 dark:hover:bg-gray-700">
            <div className="flex justify-center mb-5">
              <Hammer className="h-14 w-14 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
              Social-Impact Jobs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Discover thousands of impactful job opportunities in education, health, climate, and social justice. Filter by location and skills to find a job that matches your mission.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl text-center transition hover:bg-blue-50 dark:hover:bg-gray-700">
            <div className="flex justify-center mb-5">
              <MousePointerClick className="h-14 w-14 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
              Add Your Organization
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Reach changemakers by listing your nonprofit. Post volunteer roles, jobs, and events for free and connect with motivated individuals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl text-center transition hover:bg-yellow-50 dark:hover:bg-gray-700">
            <div className="flex justify-center mb-5">
              <Megaphone className="h-14 w-14 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
              Volunteering & Events
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Join local events, drives, and campaigns. Contribute your time and skills to causes that matter — track your hours and make every action count.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
