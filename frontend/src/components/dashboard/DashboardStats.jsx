import {
  FaBook,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaFire,
} from "react-icons/fa";

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      icon: <FaBook />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Total Mentors",
      value: stats?.totalMentors || 0,
      icon: <FaChalkboardTeacher />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Categories",
      value: stats?.totalCategories || 0,
      icon: <FaLayerGroup />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Latest Course",
      value: stats?.latestCourse?.title || "No Course",
      icon: <FaFire />,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#08152f]/80 backdrop-blur-xl p-6 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500"
        >

          {/* Glow */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r ${card.color} opacity-10 blur-3xl`} />

          {/* Header */}
          <div className="flex items-start justify-between">

            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                {card.title}
              </p>

              <h3 className="text-white font-bold mt-3 break-words text-2xl sm:text-3xl">
                {card.value}
              </h3>
            </div>

            <div
              className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-xl shadow-lg`}
            >
              {card.icon}
            </div>

          </div>

          {/* Bottom Accent */}
          <div className="mt-6 flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Updated Recently
            </span>

            <div
              className={`h-1 w-16 rounded-full bg-gradient-to-r ${card.color}`}
            />
          </div>

        </div>
      ))}

    </div>
  );
};

export default DashboardStats;
