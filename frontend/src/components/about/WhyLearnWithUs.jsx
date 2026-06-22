import { FaUsers, FaBookOpen, FaAward, FaLaptopCode } from 'react-icons/fa';

const features = [
  {
    icon: <FaLaptopCode />,
    title: 'Practical Learning',
    desc: 'Build real-world projects while learning.',
  },
  {
    icon: <FaUsers />,
    title: 'Expert Mentors',
    desc: 'Learn from industry professionals.',
  },
  {
    icon: <FaBookOpen />,
    title: 'Updated Courses',
    desc: 'Content based on industry standards.',
  },
  {
    icon: <FaAward />,
    title: 'Certification',
    desc: 'Earn certificates after completion.',
  },
];

const WhyLearnWithUs = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white">Why Learn With Us?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((item, index) => (
            <div key={index} className="bg-[#08152f] p-8 rounded-xl">
              <div className="text-4xl text-indigo-500">{item.icon}</div>

              <h3 className="text-xl font-semibold text-white mt-6">{item.title}</h3>

              <p className="text-gray-400 mt-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearnWithUs;
