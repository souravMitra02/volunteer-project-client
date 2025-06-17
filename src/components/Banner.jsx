import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import banner1 from '../assets/image1.jpg';
import banner2 from '../assets/image2.jpg';
import banner3 from '../assets/image3.jpg';
import { Hammer, Megaphone, MousePointerClick } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Banner = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[100vh] mb-80">
      <Helmet>
        <title>Home | Volunteer Hub</title>
      </Helmet>

      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20 px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg mb-5">
          Volunteer Hub
        </h1>
        <p className="text-xl md:text-2xl font-light drop-shadow-md mb-8">
          Connect, Contribute, and Make a Difference in Your Community
        </p>
        <button className="btn btn-primary px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              className="w-full h-[80vh] md:h-[200vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${banner})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute left-1/2 transform -translate-x-1/2 lg:-bottom-90 max-w-7xl w-full px-4 py-14 z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white shadow-md p-6 rounded-2xl text-center hover:shadow-xl transition duration-300 h-full hover:bg-green-50 hover:cursor-pointer">
            <div className="flex justify-center mb-5">
              <Hammer className="h-14 w-14 text-green-600 " />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Social-Impact Jobs</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover thousands of impactful job opportunities designed to help you make a real difference. Whether you are looking to work in education, healthcare, environmental sustainability, or social justice — our platform connects passionate individuals with meaningful careers. Use filters to narrow by location, work type, and experience level to find jobs that truly align with your values and skills.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md p-6 rounded-2xl text-center hover:shadow-xl transition duration-300 h-full hover:bg-blue-50 hover:cursor-pointer">
            <div className="flex justify-center mb-5">
              <MousePointerClick className="h-14 w-14 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Add Your Organization</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Do you run a nonprofit or community-based initiative? Join over 150,000 organizations already using our platform to post job listings, volunteer roles, and community events. It's simple and free to register. By creating a presence, you reach a growing network of changemakers who are eager to contribute to missions that matter. Stand out, share your story, and attract the right people to your cause.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md p-6 rounded-2xl text-center hover:shadow-xl transition duration-300 h-full hover:bg-yellow-50 hover:cursor-pointer">
            <div className="flex justify-center mb-5">
              <Megaphone className="h-14 w-14 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Volunteering & Events</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Looking for ways to give back? Explore thousands of volunteering opportunities and community events happening around you. From local clean-up drives to nationwide awareness campaigns, we help you connect with impactful causes. Volunteering not only helps the community but also builds your skills, network, and personal fulfillment. Sign up for events, track your participation, and make every hour count.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
