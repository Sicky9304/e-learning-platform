import {
  FaUsers,
  FaBookOpen,
  FaChalkboardTeacher,
  FaCertificate,
} from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    value: "15K+",
    label: "Students",
  },
  {
    icon: FaBookOpen,
    value: "120+",
    label: "Courses",
  },
  {
    icon: FaChalkboardTeacher,
    value: "50+",
    label: "Mentors",
  },
  {
    icon: FaCertificate,
    value: "10K+",
    label: "Certificates",
  },
];

const Stats = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            📈 Platform Growth
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-4xl sm:text-5xl font-extrabold text-white">
          Trusted By
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Thousands
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-center text-gray-400 mt-6 text-base sm:text-lg leading-8">
          Join a thriving learning community and gain practical skills
          through expert-led courses and hands-on projects.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-16">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 text-center hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition duration-500">
                  <Icon />
                </div>

                {/* Number */}
                <h3 className="relative text-3xl sm:text-4xl font-extrabold text-white mt-6">
                  {item.value}
                </h3>

                {/* Label */}
                <p className="relative text-gray-400 mt-2">
                  {item.label}
                </p>

                {/* Bottom Accent */}
                <div className="relative mt-5 flex justify-center">
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

export default Stats;
