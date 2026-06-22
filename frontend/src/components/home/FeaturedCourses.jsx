const features = [
  {
    icon: '🎓',
    title: 'Certified Instructors',
    desc: 'Learn directly from industry experts.',
  },
  {
    icon: '💻',
    title: 'Practical Projects',
    desc: 'Build real-world portfolio projects.',
  },
  {
    icon: '📱',
    title: 'Flexible Learning',
    desc: 'Access courses anytime, anywhere.',
  },
  {
    icon: '🌎',
    title: 'Global Community',
    desc: 'Join thousands of learners worldwide.',
  },
];

const FeaturedCourses = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white">Featured Courses</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#08152f] border border-slate-700 rounded-2xl p-8 text-center hover:border-indigo-500 transition"
            >
              <div className="w-16 h-16 mx-auto rounded-full border border-indigo-500 flex items-center justify-center text-3xl">
                {feature.icon}
              </div>

              <h3 className="text-white text-xl font-semibold mt-6">{feature.title}</h3>

              <p className="text-gray-400 mt-4 text-sm leading-7">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
