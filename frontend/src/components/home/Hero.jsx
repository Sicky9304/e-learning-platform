import { Link } from 'react-router-dom';
import HeroAnimation from './HeroAnimation';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-sm mt-2">
            #1 Online Learning Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight text-indigo-100">
            Learn Skills
            <span className="text-indigo-500"> That Shape </span>
            Your Future
          </h1>

          <p className="mt-8 text-xl text-gray-400 leading-8">
            Join thousands of learners and gain practical skills through expert-led courses.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-lg mb-3">
              Explore Courses
            </Link>

            <Link
              to="/contact"
              className="border border-slate-700 px-8 py-4 rounded-lg text-indigo-100 mb-3"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div>
          <div className="h-[450px] rounded-2xl bg-[#08152f] mb-3">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
