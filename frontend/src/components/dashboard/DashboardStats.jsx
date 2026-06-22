import { FaBook, FaChalkboardTeacher, FaLayerGroup, FaFire } from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: 'Total Courses',
      value: stats?.totalCourses || 0,
      icon: <FaBook />,
    },
    {
      title: 'Total Mentors',
      value: stats?.totalMentors || 0,
      icon: <FaChalkboardTeacher />,
    },
    {
      title: 'Categories',
      value: stats?.totalCategories || 0,
      icon: <FaLayerGroup />,
    },
    {
      title: 'Latest Course',
      value: stats?.latestCourse?.title || 'No Course',
      icon: <FaFire />,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-[#08152f] rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{card.title}</p>

              <h3 className="text-white text-2xl font-bold mt-2">{card.value}</h3>
            </div>

            <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
