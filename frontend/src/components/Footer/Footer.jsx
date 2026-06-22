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
    <footer className="bg-[#020817] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Card */}
        <motion.div variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-[#08152f]/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-10">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand Section */}
            <div>
              <h2 className="text-3xl font-bold text-white">
                E-Learn
              </h2>

              <p className="text-gray-400 mt-4 leading-7">
                Learn modern technologies from industry experts
                and accelerate your career with practical skills.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Categories
              </h3>

              <div className="flex flex-col gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/courses?category=${encodeURIComponent(category.slug)}`}
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Stay Updated
              </h3>

              <p className="text-gray-400 mb-4">
                Subscribe for latest courses and updates.
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-l-xl outline-none"
                />

                <button className="bg-indigo-600 hover:bg-indigo-500 px-5 rounded-r-xl text-white">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-10"/>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} E-Learn Platform. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10"
              >
                <FaFacebook className="text-gray-400 group-hover:text-blue-500" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sicky9304s"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:bg-pink-500/10"
              >
                <FaInstagram className="text-gray-400 group-hover:text-pink-500" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sicky-kumar-059a3b256"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-400/10"
              >
                <FaLinkedin className="text-gray-400 group-hover:text-blue-400" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Sicky9304"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10"
              >
                <FaGithub className="text-gray-400 group-hover:text-white" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919304490856"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-green-500/50 hover:bg-green-500/10"
              >
                <FaWhatsapp className="text-gray-400 group-hover:text-green-500" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-500/10"
              >
                <FaYoutube className="text-gray-400 group-hover:text-red-500" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/Alex9304"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:bg-sky-500/10"
              >
                <FaTelegramPlane className="text-gray-400 group-hover:text-sky-400" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
