import React, { use } from "react";
import { Helmet } from "react-helmet";
import CountUp from "react-countup";
import { useNavigate } from "react-router";
import { Users, Star, Activity, HeartHandshake, Smile, ShieldCheck } from "lucide-react";
import { AuthContext } from "../context/AuthContext/AuthContext";


const About = () => {
  const { user } = use(AuthContext); 
  const navigate = useNavigate();

  
  const handleCTA = () => {
    if (user) {
      navigate("/"); 
    } else {
      navigate("/register");
    }
  };

  const stats = [
    { icon: <Users className="w-10 h-10 text-orange-600" />, value: 10000, label: "Volunteers Joined" },
    { icon: <Activity className="w-10 h-10 text-orange-600" />, value: 700, label: "Campaigns Completed" },
    { icon: <Star className="w-10 h-10 text-orange-600" />, value: 4.9, label: "Avg Rating", suffix: "/5" },
  ];

  const values = [
    {
      icon: <HeartHandshake className="w-10 h-10 text-rose-600" />,
      title: "Compassion",
      desc: "Driven by empathy and a desire to uplift communities.",
    },
    {
      icon: <Smile className="w-10 h-10 text-yellow-500" />,
      title: "Positivity",
      desc: "We believe optimism brings real change.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-sky-600" />,
      title: "Trust & Transparency",
      desc: "Clear communication and trusted processes in every campaign.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Conceptualization & Planning",
      details:
        "The idea for Volunteer Hub was born, with brainstorming sessions and groundwork laid.",
    },
    {
      year: "2021",
      title: "Platform Development Started",
      details:
        "Started development focusing on core features and seamless user experience.",
    },
    {
      year: "2022",
      title: "Official Launch & First Campaigns",
      details:
        "Platform launched publicly and hosted first volunteer campaigns successfully.",
    },
    {
      year: "2023",
      title: "Reached 5,000+ Volunteers",
      details:
        "Community grew exponentially, crossing 5,000 active volunteers worldwide.",
    },
    {
      year: "2024",
      title: "Expanded to Multiple Regions",
      details:
        "Introduced new features and expanded operations to multiple regions.",
    },
  ];
const team = [
  {
    name: "Rafiq Hasan",
    role: "Community Outreach Lead",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "https://linkedin.com/in/rafiqhasan",
    twitter: "https://twitter.com/rafiqhasan",
  },
  {
    name: "Nusrat Jahan",
    role: "Fundraising Coordinator",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "https://linkedin.com/in/nusratjahan",
    twitter: "https://twitter.com/nusratjahan",
  },
  {
    name: "Imran Hossain",
    role: "Event Manager",
    image: "https://randomuser.me/api/portraits/men/53.jpg",
    linkedin: "https://linkedin.com/in/imranhossain",
    twitter: "https://twitter.com/imranhossain",
  },
];

  const testimonials = [
    {
      name: "Rafiq Hasan",
      comment: "Volunteering through this platform changed my life!",
    },
    {
      name: "Maria Khan",
      comment: "Found great causes and people. Truly impactful.",
    },
    {
      name: "Tania Rahman",
      comment: "Smooth experience for both volunteers and organizers.",
    },
  ];

  const faqs = [
    {
      question: "How can I become a volunteer?",
      answer: "Simply register on our platform and browse available campaigns to join.",
    },
    {
      question: "Can organizations post their own campaigns?",
      answer: "Yes, organizations can create accounts and post their volunteer needs.",
    },
    {
      question: "Is there any cost involved for volunteers?",
      answer: "No, volunteering through our platform is completely free.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen px-4 py-16 max-w-7xl mx-auto mt-10 mb-10">
      <Helmet>
        <title>About Us | Volunteer Hub</title>
      </Helmet>

      {/* Title */}
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-orange-600">About Volunteer Hub</h1>
        <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
          Connecting passionate volunteers to causes that truly make a difference across communities.
        </p>
      </header>

      {/* Mission & Vision */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-orange-600">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To empower communities worldwide by connecting volunteers to impactful campaigns,
            fostering collaboration, and encouraging a culture of service.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-orange-600">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To become the leading platform for volunteerism, enabling meaningful change and
            inspiring every individual to contribute their time and skills for a better world.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <h2 className="text-4xl font-extrabold text-orange-600">
              <CountUp end={stat.value} duration={2} decimals={stat.suffix ? 1 : 0} suffix={stat.suffix || "+"} />
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="mb-24 max-w-7xl mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">Our Journey</h2>

  <div className="grid md:grid-cols-2 gap-12 items-start">
    {/* Left side content */}
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-orange-600">About Our Journey</h3>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Volunteer Hub started as a small idea to bring people together for a greater cause.
        Over the years, we have expanded our reach and improved our platform to better serve
        volunteers and organizations worldwide.
      </p>
      
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        Our commitment is to empower communities and inspire people to give their time and skills
        to causes they care about.
      </p>

      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li><strong>Global Impact:</strong> We have engaged thousands of volunteers globally.</li>
        <li><strong>Trusted Partners:</strong> Collaborating with numerous NGOs and community groups.</li>
        <li><strong>Continuous Growth:</strong> Constantly evolving platform with new features.</li>
      </ul>

      <div>
        <img 
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" 
          alt="Volunteering" 
          className="rounded-lg shadow-lg mt-4 max-w-full h-auto"
        />
      </div>
    </div>

    {/* Right side timeline */}
    <div className="relative pl-8 md:pl-16">
      {/* Vertical line */}
      <div className="hidden md:block absolute top-0 left-4 w-1 bg-orange-500 h-full"></div>

      {/* Timeline items */}
      {timeline.map((item, idx) => (
        <div key={idx} className="mb-16 relative md:flex md:items-start md:space-x-6">
          {/* Dot on the vertical line */}
          <div className="absolute md:static -left-6 top-2 md:top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-gray-50 dark:border-gray-900"></div>

          {/* Content on right side */}
          <div className="md:flex-1">
            <h3 className="text-xl font-semibold text-orange-600">{item.year}</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300 font-semibold">{item.title}</p>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">{item.details}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>




      {/* Core Values */}
      <section className="mb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
              <div className="flex justify-center mb-4">{val.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{val.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
       <section className="mb-24 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-orange-600 dark:text-orange-400">
        Meet Our Team
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {team.map(({ name, role, image, linkedin, twitter }, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 text-center"
          >
            <img
              src={image}
              alt={name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover ring-4 ring-orange-400"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
            <p className="text-orange-600 dark:text-orange-400 font-medium mb-4">{role}</p>
            <div className="flex justify-center space-x-6">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                LinkedIn
              </a>
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} Twitter`}
                className="text-sky-500 hover:text-sky-700 font-medium"
              >
                Twitter
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Testimonials */}
      <section className="mb-24 bg-gray-100 dark:bg-gray-800 rounded-xl p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-orange-600">What Volunteers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, comment }, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
              <p className="italic text-gray-600 dark:text-gray-300 mb-4">“{comment}”</p>
              <h4 className="text-orange-600 font-semibold">{name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-orange-600">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map(({ question, answer }, i) => (
            <details
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow cursor-pointer"
            >
              <summary className="font-semibold text-lg">{question}</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-20">
        <h3 className="text-3xl font-bold mb-6 text-orange-600">Ready to Make a Difference?</h3>
        <button
          onClick={handleCTA}
          className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition"
        >
          {user ? "Go to Home" : "Join Us Now"}
        </button>
      </section>
    </div>
  );
};

export default About;
