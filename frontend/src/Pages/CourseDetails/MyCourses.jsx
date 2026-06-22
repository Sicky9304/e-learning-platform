//@ts-nocheck

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { getMyCourses } from '../../api/authApi';
import BackButton from '../../components/button/BackButton';

const MyCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMyCourses();

        setCourses(data.courses || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          'Failed to load courses'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#020817] flex justify-center items-center">
        <h2 className="text-white text-xl">
          Loading Your Courses...
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#020817] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <BackButton/>
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            My Learning
          </h1>

          <p className="text-gray-400 mt-2">
            Continue learning from your enrolled courses.
          </p>
        </div>

        {/* Empty State */}
        {courses.length === 0 ? (
          <div className="bg-[#08152f] rounded-2xl p-10 text-center">
            <div className="text-7xl mb-4">📚</div>

            <h2 className="text-white text-2xl font-bold">
              No Courses Yet
            </h2>

            <p className="text-gray-400 mt-4">
              You haven't enrolled in any course.
            </p>

            <button
              onClick={() => navigate('/courses')}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg"
            >
              Browse Courses
            </button>
          </div>
        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-[#08152f] rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500 transition"
              >
                {/* Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />

                {/* Content */}
                <div className="p-5">

                  <span className="bg-indigo-600 text-white px-3 py-1 rounded text-xs">
                    {course.category}
                  </span>

                  <h2 className="text-white text-xl font-bold mt-4">
                    {course.title}
                  </h2>

                  <p className="text-gray-400 mt-3 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mt-5">

                    <span className="text-yellow-400">
                      ⭐ {course.rating}
                    </span>

                    <span className="text-gray-400 text-sm">
                      {course.students} Students
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/learn/${course._id}`)
                    }
                    className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCourses;
