const stats = [
  { number: '15K+', title: 'Students' },
  { number: '120+', title: 'Courses' },
  { number: '50+', title: 'Mentors' },
  { number: '10K+', title: 'Certificates' },
];

const AboutStats = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-[#08152f] p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-indigo-500">{item.number}</h3>

            <p className="text-gray-400 mt-3">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
