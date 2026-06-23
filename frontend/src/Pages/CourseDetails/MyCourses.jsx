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
    <section className="min-h-screen bg-[#020817] pt-28 md:pt-32 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#08152f] via-[#0b1736] to-[#111827] p-6 md:p-10 mb-10">

          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
              🚀 Continue Your Learning Journey
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white mt-6">
              My Courses
            </h1>

            <p className="text-gray-400 mt-4 max-w-2xl text-lg">
              Access your enrolled courses, continue lessons,
              earn certificates and level up your skills.
            </p>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Enrolled Courses
            </p>

            <h3 className="text-white text-3xl font-bold mt-2">
              {courses.length}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Total Lessons
            </p>

            <h3 className="text-indigo-400 text-3xl font-bold mt-2">
              {courses.reduce(
                (sum, course) => sum + (course.lessons || 0),
                0
              )}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Learning Hours
            </p>

            <h3 className="text-green-400 text-3xl font-bold mt-2">
              {courses.length * 18}+
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Certificates
            </p>

            <h3 className="text-yellow-400 text-3xl font-bold mt-2">
              0
            </h3>
          </div>

        </div>

        {/* Empty State */}
        {courses.length === 0 ? (
          <div className="bg-[#08152f] border border-slate-800 rounded-3xl p-12 text-center">

            <div className="text-8xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-bold text-white">
              No Courses Yet
            </h2>

            <p className="text-gray-400 mt-4">
              Start learning today and unlock new opportunities.
            </p>

            <button
              onClick={() => navigate('/courses')}
              className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold"
            >
              Browse Courses
            </button>

          </div>
        ) : (
          <>
            {/* Heading */}
            <div className="flex items-center justify-between mb-8">

              <div>
                <h2 className="text-3xl font-bold text-white">
                  Continue Learning
                </h2>

                <p className="text-gray-400 mt-2">
                  Pick up exactly where you left off.
                </p>
              </div>

            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {courses.map((course) => (
                <div
                  key={course._id}
                  className="group bg-[#08152f] border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2"
                >

                  {/* Image */}
                  <div className="relative overflow-hidden">

                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute top-4 left-4">

                      <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                        {course.category}
                      </span>

                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <h3 className="text-white text-2xl font-bold line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-400 mt-3 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="flex justify-between items-center mt-5">

                      <span className="text-yellow-400 font-semibold">
                        ⭐ {course.rating}
                      </span>

                      <span className="text-gray-500 text-sm">
                        {course.students} Students
                      </span>

                    </div>

                    <div className="flex justify-between items-center mt-3">

                      <span className="text-cyan-400 text-sm">
                        📖 {course.lessons} Lessons
                      </span>

                      <span className="text-green-400 text-sm">
                        ⏱ {course.duration}
                      </span>

                    </div>

                    {/* Mentor */}
                    {course.mentor?.name && (
                      <div className="mt-4 text-sm text-gray-400">
                        Instructor:
                        <span className="text-white ml-1">
                          {course.mentor.name}
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <button
                      onClick={() =>
                        navigate(`/learn/${course._id}`)
                      }
                      className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300"
                    >
                      Continue Learning →
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>

    </section>
  );
};

export default MyCourses;
