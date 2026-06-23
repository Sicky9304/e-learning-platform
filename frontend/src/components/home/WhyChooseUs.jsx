import {
  FaUserTie,
  FaLaptopCode,
  FaBriefcase,
  FaRocket,
} from "react-icons/fa";

const reasons = [
  {
    icon: FaUserTie,
    title: "Expert Mentors",
    desc: "Learn from experienced industry professionals and top educators.",
  },
  {
    icon: FaLaptopCode,
    title: "Hands-On Projects",
    desc: "Build real-world portfolio projects that employers value.",
  },
  {
    icon: FaBriefcase,
    title: "Career Support",
    desc: "Get resume reviews, interview preparation, and career guidance.",
  },
  {
    icon: FaRocket,
    title: "Fast Growth",
    desc: "Accelerate your learning journey with structured roadmaps.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            🔥 Why Learners Love Us
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Why Choose
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            E-Learn
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-center text-gray-400 mt-6 text-base sm:text-lg leading-8">
          We combine expert mentorship, practical learning, career guidance,
          and a thriving community to help you achieve your goals faster.
        </p>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition duration-500">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="relative text-white text-xl font-bold text-center mt-6">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-400 text-center mt-4 leading-7">
                  {item.desc}
                </p>

                {/* Accent Line */}
                <div className="relative mt-6 flex justify-center">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
