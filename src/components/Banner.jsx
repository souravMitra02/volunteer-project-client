import React, { use} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Hammer, Megaphone, MousePointerClick } from "lucide-react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import banner1 from "../assets/image1.jpg";
import banner2 from "../assets/image2.jpg";
import banner3 from "../assets/image3.jpg";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const handleCTAClick = () => {
    if (user) {
      navigate("/posts"); 
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Helmet>
        <title>Home | Volunteer Hub</title>
      </Helmet>

      {/* Hero / Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-white text-center">
          <h1 data-aos="zoom-in" className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
            Volunteer Hub
          </h1>
          <p data-aos="fade-up" className="text-lg md:text-2xl font-light drop-shadow-md mb-6">
            Connect, Contribute, and Make a Difference in Your Community
          </p>

          {/* ✅ CTA Button */}
          <button
            onClick={handleCTAClick}
            className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded text-white font-semibold mt-2"
          >
            {user ? "Browse Posts" : "Join as Volunteer"}
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
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${banner})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Info Cards Section */}
      <section className=" dark:bg-gray-900 px-4 py-16 mt-10 max-w-7xl mx-auto relative z-30">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
            Why Choose Volunteer Hub?
          </h2>
          <p className=" dark:text-gray-300 mt-2">
            Empowering communities through actions that matter
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {/* Card 1 */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-white dark:bg-gray-800 p-6 min-h-[320px] rounded-2xl shadow hover:shadow-xl text-center transition hover:bg-green-50 dark:hover:bg-gray-700"
          >
            <div className="flex justify-center mb-5">
              <Hammer className="h-14 w-14 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Find Volunteer Jobs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
              Thousands of verified listings for volunteer roles in education, health, climate, and more.
            </p>
            <Link to="/posts" className="text-orange-600 font-semibold mt-3 inline-block hover:underline">
              Explore Now →
            </Link>
          </div>

          {/* Card 2 */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white dark:bg-gray-800 p-6 min-h-[320px] rounded-2xl shadow hover:shadow-xl text-center transition hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <div className="flex justify-center mb-5">
              <MousePointerClick className="h-14 w-14 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Register Your Organization
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
              Share your needs, post events, and recruit passionate volunteers with ease.
            </p>
            <Link to="/volunteer-posts" className="text-blue-600 font-semibold mt-3 inline-block hover:underline">
              Register →
            </Link>
          </div>

          {/* Card 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-white dark:bg-gray-800 p-6 min-h-[320px] rounded-2xl shadow hover:shadow-xl text-center transition hover:bg-yellow-50 dark:hover:bg-gray-700"
          >
            <div className="flex justify-center mb-5">
              <Megaphone className="h-14 w-14 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Join Local Campaigns
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
              Stay connected with latest volunteering events and social drives near you.
            </p>
            <Link to="/posts" className="text-yellow-600 font-semibold mt-3 inline-block hover:underline">
              Join Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
