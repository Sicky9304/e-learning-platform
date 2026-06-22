import { Link } from 'react-router-dom';
import HeroAnimation from './HeroAnimation';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 items-center">

            <span className="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-sm">
              #1 Online Learning Platform
            </span>

            <span className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/10 animate-pulse">
              🚀 Beta Version 1.0
            </span>

          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight text-indigo-100">
            Learn Skills
            <span className="text-indigo-500"> That Shape </span>
            Your Future
          </h1>

          {/* Description */}
          <p className="mt-8 text-xl text-gray-400 leading-8">
            Join thousands of learners and gain practical skills through
            expert-led courses. Learn at your own pace, earn certificates,
            and build skills that help you grow professionally.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/courses"
              className="bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 hover:scale-105 px-8 py-4 rounded-lg text-white font-medium"
            >
              Explore Courses
            </Link>

            <Link
              to="/contact"
              className="border border-slate-700 hover:border-indigo-500 transition-all duration-300 px-8 py-4 rounded-lg text-indigo-100 hover:bg-indigo-500/10"
            >
              Contact Us
            </Link>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div>
          <div className="h-[450px] rounded-2xl bg-[#08152f] mb-3 border border-slate-800 overflow-hidden">
            <HeroAnimation />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
