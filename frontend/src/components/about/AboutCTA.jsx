import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto bg-[#08152f] rounded-2xl p-14 text-center">
        <h2 className="text-5xl font-bold text-white">Ready To Start Learning?</h2>

        <p className="mt-6 text-gray-400 text-lg">Join thousands of learners today.</p>

        <Link
          to="/courses"
          className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-lg text-white font-semibold"
        >
          Explore Courses
        </Link>
      </div>
    </section>
  );
};

export default AboutCTA;
