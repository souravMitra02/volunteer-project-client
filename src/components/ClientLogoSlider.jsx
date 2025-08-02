import React from "react";
import Marquee from "react-fast-marquee";

// Import logos
import logo1 from "../assets/brands/amazon.png";
import logo2 from "../assets/brands/amazon_vector.png";
import logo3 from "../assets/brands/casio.png";
import logo4 from "../assets/brands/moonstar.png";
import logo5 from "../assets/brands/randstad.png";
import logo6 from "../assets/brands/start-people 1.png";
import logo7 from "../assets/brands/start.png";

const logos = [
  { logo: logo1, link: "https://www.amazon.com", name: "Amazon" },
  { logo: logo2, link: "https://www.amazon.com", name: "Amazon Vector" },
  { logo: logo3, link: "https://www.casio.com", name: "Casio" },
  { logo: logo4, link: "https://www.moonstar.co.jp", name: "Moonstar" },
  { logo: logo5, link: "https://www.randstad.com", name: "Randstad" },
  { logo: logo6, link: "https://www.startpeople.nl", name: "Start People 1" },
  { logo: logo7, link: "https://www.startpeople.nl", name: "Start People" },
];

const ClientLogoSlider = () => {
  return (
    <>
      <div className="py-10">
        <h2 className="text-2xl lg:text-4xl text-center font-bold text-orange-600 mb-10">
          We've helped thousands of sales teams
        </h2>

        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          className="flex items-center gap-16"
        >
          {logos.map(({ logo, link, name }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${name}`}
              className="mx-8 flex items-center"
            >
              <img
                src={logo}
                alt={`${name} logo`}
                className="h-8 object-contain hover:grayscale-0 grayscale transition duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </Marquee>
      </div>
      <div className="border mt-10 mb-10 border-dashed border-gray-400"></div>
    </>
  );
};

export default ClientLogoSlider;
