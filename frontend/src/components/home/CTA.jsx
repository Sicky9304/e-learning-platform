import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />

      <div className="relative max-w-5xl mx-auto">

        <div className="relative overflow-hidden rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 lg:p-16 text-center">

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

          <div className="relative">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
              🚀 Join The Future Of Learning
            </span>

            {/* Heading */}
            <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Start Learning
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Today
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-2xl mx-auto mt-6 text-gray-400 text-base sm:text-lg leading-8">
              Unlock your potential with expert-led courses, real-world
              projects, certificates, and a global learning community.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">

              <div>
                <h3 className="text-3xl font-bold text-white">
                  15K+
                </h3>
                <p className="text-gray-400 text-sm">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  120+
                </h3>
                <p className="text-gray-400 text-sm">
                  Courses
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  50+
                </h3>
                <p className="text-gray-400 text-sm">
                  Mentors
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                to="/courses"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Browse Courses →
              </Link>

              <Link
                to="/register"
                className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300"
              >
                Join Free
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;
