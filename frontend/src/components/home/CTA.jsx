import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto text-center bg-[#08152f] rounded-2xl p-14">
        <h2 className="text-5xl font-bold text-white">Start Learning Today</h2>

        <p className="text-gray-400 mt-6">Unlock your potential with our premium courses.</p>

        <Link
          to="/courses"
          className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-lg text-white"
        >
          Browse Courses
        </Link>
      </div>
    </section>
  );
};

export default CTA;
