import { FaUsers, FaBookOpen, FaChalkboardTeacher, FaCertificate } from 'react-icons/fa';

const Stats = () => {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        <div className="bg-[#08152f] p-8 rounded-xl text-center">
          <FaUsers className="mx-auto text-4xl text-indigo-500" />
          <h3 className="text-2xl font-bold mt-4 text-indigo-100">15K+</h3>
          <p className="text-gray-400">Students</p>
        </div>

        <div className="bg-[#08152f] p-8 rounded-xl text-center">
          <FaBookOpen className="mx-auto text-4xl text-indigo-500" />
          <h3 className="text-2xl font-bold mt-4 text-indigo-100">120+</h3>
          <p className="text-gray-400">Courses</p>
        </div>

        <div className="bg-[#08152f] p-8 rounded-xl text-center">
          <FaChalkboardTeacher className="mx-auto text-4xl text-indigo-500" />
          <h3 className="text-2xl font-bold mt-4 text-indigo-100 ">50+</h3>
          <p className="text-gray-400">Instructors</p>
        </div>

        <div className="bg-[#08152f] p-8 rounded-xl text-center">
          <FaCertificate className="mx-auto text-4xl text-indigo-500" />
          <h3 className="text-2xl font-bold mt-4 text-indigo-100">10K+</h3>
          <p className="text-gray-400">Certificates</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
