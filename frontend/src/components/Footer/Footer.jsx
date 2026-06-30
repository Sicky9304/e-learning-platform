import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
  FaTelegramPlane
} from "react-icons/fa";
import { motion } from 'framer-motion';


const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Courses', to: '/courses' },
  { name: 'Contact', to: '/contact' },
];

const categories = [
  { name: 'Frontend', slug: 'Frontend' },
  { name: 'Backend', slug: 'Backend' },
  { name: 'Full Stack', slug: 'Full Stack' },
  { name: 'Database', slug: 'Database' },
  { name: 'Design', slug: 'Design' },
];

// Footer Animation
const footerVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
    },
  },
};

const Footer = () => {

  return (
    <footer className="relative bg-[#020817] px-4 sm:px-6 py-20 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto">

        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#08152f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12"
        >

          {/* CTA */}
          <div className="text-center mb-14">

            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
              🚀 Ready To Learn?
            </span>

            <h2 className="mt-6 text-3xl sm:text-5xl font-extrabold text-white">
              Transform Your Future With
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                E-Learn Platform
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-gray-400 mt-6 text-base sm:text-lg leading-8">
              Join thousands of learners building skills, earning certificates,
              and growing their careers with industry-focused courses.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Courses →
            </Link>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-12" />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand */}
            <div>

              <h2 className="text-4xl font-extrabold text-white">
                E-Learn
              </h2>

              <p className="text-gray-400 mt-5 leading-8">
                Learn modern technologies, build real-world projects,
                and accelerate your career through practical,
                industry-ready education.
              </p>

              {/* Stats */}
              <div className="flex gap-6 mt-8 flex-wrap">

                <div>
                  <h4 className="text-white text-2xl font-bold">
                    15K+
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Students
                  </p>
                </div>

                <div>
                  <h4 className="text-white text-2xl font-bold">
                    120+
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Courses
                  </p>
                </div>

                <div>
                  <h4 className="text-white text-2xl font-bold">
                    50+
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Mentors
                  </p>
                </div>

              </div>

            </div>

            {/* Quick Links */}
            <div>

              <h3 className="text-white font-semibold text-xl mb-5">
                Quick Links
              </h3>

              <div className="flex flex-col gap-4">

                {quickLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-400 hover:text-indigo-400 transition duration-300"
                  >
                    {item.name}
                  </Link>
                ))}

              </div>

            </div>

            {/* Categories */}
            <div>

              <h3 className="text-white font-semibold text-xl mb-5">
                Popular Categories
              </h3>

              <div className="flex flex-col gap-4">

                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/courses?category=${encodeURIComponent(category.slug)}`}
                    className="text-gray-400 hover:text-indigo-400 transition duration-300"
                  >
                    {category.name}
                  </Link>
                ))}

              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-12" />

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <FaFacebook className="text-gray-400 group-hover:text-blue-500" />
            </a>

            <a
              href="https://www.instagram.com/sicky9304s"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:bg-pink-500/10"
            >
              <FaInstagram className="text-gray-400 group-hover:text-pink-500" />
            </a>

            <a
              href="https://www.linkedin.com/in/sicky-kumar-059a3b256"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-400/10"
            >
              <FaLinkedin className="text-gray-400 group-hover:text-blue-400" />
            </a>

            <a
              href="https://github.com/Sicky9304"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10"
            >
              <FaGithub className="text-gray-400 group-hover:text-white" />
            </a>

            <a
              href="https://wa.me/919304490856"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-green-500/50 hover:bg-green-500/10"
            >
              <FaWhatsapp className="text-gray-400 group-hover:text-green-500" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-500/10"
            >
              <FaYoutube className="text-gray-400 group-hover:text-red-500" />
            </a>

            <a
              href="https://t.me/Alex9304"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:bg-sky-500/10"
            >
              <FaTelegramPlane className="text-gray-400 group-hover:text-sky-400" />
            </a>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-12" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} E-Learn Platform. All Rights Reserved.
            </p>

            {/* <p className="text-gray-500 text-center">
              Built with ❤️ by Sicky Kumar
            </p> */}

          </div>

        </motion.div>

      </div>

    </footer>
  );
};

export default Footer;
