import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-88px)] flex items-center px-4 sm:px-6 lg:px-8 py-8">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/15 blur-[180px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/15 blur-[180px] rounded-full" />

        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[150px] rounded-full" />

      </div>

      <div className="relative max-w-7xl mx-auto w-full">

        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left relative hidden lg:block">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">

              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

              <span className="text-indigo-300 text-sm font-medium">
                Trusted by 50,000+ Learners
              </span>

            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95]">

              <span className="block text-white">
                Learn
              </span>

              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills
              </span>

              <span className="block text-white">
                Build Future
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl mx-auto lg:mx-0 text-gray-400 text-lg leading-8">
              Master real-world skills with expert-led courses,
              hands-on projects, certificates and career-focused
              learning paths designed for the next generation.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <Link
                to="/courses"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all duration-300"
              >
                Explore Courses →
              </Link>

              <Link
                to="/contact"
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:border-indigo-500/30 transition-all duration-300"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="block">

            <div className="relative h-[420px] lg:h-[550px] sm:h-[450px] rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#101935] via-[#0f172a] to-[#1e1b4b] shadow-[0_0_70px_rgba(99,102,241,0.15)]">

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/20" />

              <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />

              {/* Rotating Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 w-[340px] h-[340px] border border-indigo-500/20 rounded-full -translate-x-1/2 -translate-y-1/2"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 w-[430px] h-[430px] border border-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"
              />

              {/* Floating Particles */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-24 left-24 w-3 h-3 bg-indigo-400 rounded-full"
              />

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute top-32 right-20 w-2 h-2 bg-purple-400 rounded-full"
              />

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute bottom-28 left-32 w-2 h-2 bg-pink-400 rounded-full"
              />

              {/* Platform */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[420px] h-[170px] rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
              />

              {/* Main Device */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-[320px] h-[220px] rounded-3xl bg-[#111827] border border-white/10 shadow-2xl overflow-hidden">

                  <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>

                  <div className="h-[calc(100%-40px)] flex items-center justify-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(99,102,241,0.6)]">
                      ▶
                    </div>
                  </div>

                </div>

                <div className="w-[360px] h-6 bg-gradient-to-r from-slate-700 to-slate-600 rounded-b-full -mt-1" />
              </motion.div>

              {/* Floating Cards */}

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-10 left-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <FaBookOpen className="text-indigo-400 text-xl" />
                <div>
                  <h4 className="text-white font-semibold">500+</h4>
                  <p className="text-gray-400 text-xs">Courses</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute top-14 right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <FaGraduationCap className="text-yellow-400 text-xl" />
                <div>
                  <h4 className="text-white font-semibold">Certificates</h4>
                  <p className="text-gray-400 text-xs">Earn & Share</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute bottom-14 left-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <FaVideo className="text-pink-400 text-xl" />
                <div>
                  <h4 className="text-white font-semibold">Live Classes</h4>
                  <p className="text-gray-400 text-xs">Interactive Learning</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute bottom-20 right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <FaUsers className="text-green-400 text-xl" />
                <div>
                  <h4 className="text-white font-semibold">25K+</h4>
                  <p className="text-gray-400 text-xs">Learners</p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
