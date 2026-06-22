import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { getCourseById } from "../../api/CourseApi";

import BackButton from "../../components/button/BackButton";
import CourseDetailsSkeleton from "../../components/Skeleton/CourseDetailsSkeleton";

import CourseDescription from "../../components/courseDetails/CourseDescription";
import CourseLearningOutcomes from "../../components/courseDetails/CourseLearningOutcomes";
import CourseRequirements from "../../components/courseDetails/CourseRequirements";
import CourseCurriculum from "../../components/courseDetails/CourseCurriculum";
import CourseMentor from "../../components/courseDetails/CourseMentor";


const CourseDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);

        setCourse(response.data);
      } catch (error) {
        console.log(error);

        setError(true);

        toast.error(
          error?.response?.data?.message ||
          "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    navigate("/checkout", {
      state: {
        course,
      },
    });
  };

  if (loading) return <CourseDetailsSkeleton />;

  if (error || !course) {
    return (
      <section className="min-h-screen bg-[#020817] flex justify-center items-center">
        <h1 className="text-white text-3xl">
          Course Not Found
        </h1>
      </section>
    );
  }
  return (
    <section className="min-h-screen bg-[#020817] py-10">
      <div className="max-w-7xl mx-auto px-4">

        <BackButton />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">

          {/* LEFT CONTENT */}

          <div className="lg:col-span-2 space-y-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#08152f] rounded-2xl overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-[450px] object-cover"
              />

              <div className="p-8">

                <div className="flex flex-wrap gap-3">

                  <span className="bg-indigo-600 px-3 py-1 rounded text-white text-sm">
                    {course.category}
                  </span>

                  {course.bestSeller && (
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold">
                      Bestseller
                    </span>
                  )}

                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mt-5">
                  {course.title}
                </h1>

                <p className="text-gray-400 mt-5 leading-8">
                  {course.description}
                </p>

              </div>
            </motion.div>

            <CourseDescription
              description={course.description}
            />

            <CourseLearningOutcomes
              learningOutcomes={
                course.learningOutcomes
              }
            />

            <CourseRequirements
              requirements={course.requirements}
            />

            <CourseCurriculum
              curriculum={course.curriculum}
            />

            <CourseMentor
              mentor={course.mentor}
            />

          </div>
          <div>

            <div className="lg:sticky lg:top-24">

              <div className="bg-[#08152f] rounded-2xl overflow-hidden border border-slate-700">

                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">

                  <div className="mb-6">

                    <span className="text-4xl font-bold text-white">
                      ₹{course.price}
                    </span>

                    {course.oldPrice > 0 && (
                      <span className="text-red-500 line-through ml-3">
                        ₹{course.oldPrice}
                      </span>
                    )}

                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl text-white font-semibold"
                  >
                    Enroll Now
                  </button>

                  <div className="mt-8 space-y-4 text-gray-300">

                    <div className="flex justify-between">
                      <span>⭐ Rating</span>
                      <span>{course.rating}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>👨‍🎓 Students</span>
                      <span>{course.students}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>📚 Lessons</span>
                      <span>{course.lessons}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>⏱ Duration</span>
                      <span>{course.duration}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>🎯 Level</span>
                      <span>{course.level}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>🌐 Language</span>
                      <span>{course.language}</span>
                    </div>

                  </div>

                  <div className="mt-8 border-t border-slate-700 pt-6">

                    <h3 className="text-white font-semibold mb-4">
                      This Course Includes
                    </h3>

                    <ul className="space-y-3 text-gray-400">

                      <li>✔ Lifetime Access</li>

                      <li>✔ Certificate of Completion</li>

                      <li>✔ Mobile & Desktop Access</li>

                      <li>✔ Mentor Support</li>

                      <li>✔ Downloadable Resources</li>

                    </ul>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
