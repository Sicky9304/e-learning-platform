import { useEffect, useMemo, useState } from "react";
import CourseSidebar from "../../components/learn-course/CourseSidebar";
import VideoPlayer from "../../components/learn-course/VideoPlayer";
import CourseProgress from "../../components/learn-course/CourseProgress";
import LessonNavigation from "../../components/learn-course/LessonNavigation";
import LessonNotes from "../../components/learn-course/LessonNotes";
import { getCourseById } from "../../api/CourseApi";
import { useParams } from 'react-router-dom';
import BackButton from './../../components/button/BackButton';
import { getCourseProgress, markLessonComplete } from "../../api/authApi";
import CourseCertificate from "../../components/learn-course/CourseCertificate";
import { useAuth } from "../../context/AuthContext";

const LearnCourse = () => {
  // Get course id from URL
  const { id } = useParams();

  const { user } = useAuth()

  // Store course data
  const [course, setCourse] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Current playing lesson
  const [currentLesson, setCurrentLesson] = useState(null);

  // Completed lessons
  const [completedLessons, setCompletedLessons] = useState([]);

  // Progress data from DB
  const [progress, setProgress] = useState(null);

  // Get curriculum from database
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const curriculum = course?.curriculum || [];

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Flatten all lessons from all sections
  const allLessons = useMemo(() => {
    return curriculum.flatMap((section) => section.lessons);
  }, [curriculum]);

  // Auto select first lesson after data loads
  useEffect(() => {
    if (allLessons.length > 0 && !currentLesson) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentLesson(allLessons[0]);
    }
  }, [allLessons, currentLesson]);

  // Current lesson index
  const currentIndex = currentLesson ? allLessons.findIndex((lesson) => lesson._id === currentLesson._id): -1;

  // Next lesson
  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentIndex + 1]);
    }
  };

  // Previous lesson
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentLesson(allLessons[currentIndex - 1]);
    }
  };

  // =====================================
  // FETCH USER PROGRESS
  // =====================================
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (!course?._id) return;

        const data = await getCourseProgress(course._id);

        if (data?.progress) {
          setProgress(data.progress);

          setCompletedLessons(
            data.progress.completedLessons || []
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProgress();
  }, [course?._id]);

  // =====================================
  // MARK LESSON AS COMPLETE
  // =====================================
  const handleComplete = async () => {
    // console.log(data);
    try {

      if (!currentLesson || !course?._id) return;

      const alreadyCompleted =
        completedLessons.some(
          (id) =>
            id.toString() === currentLesson._id.toString()
        );

      if (alreadyCompleted) return;

      const data = await markLessonComplete(
        course._id,
        currentLesson._id
      );

      setCompletedLessons((prev) => [
        ...prev,
        currentLesson._id,
      ]);

      setProgress(data.progress);

    } catch (error) {
      console.log(error);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading lesson...
      </div>
    );
  }
  return (
    <section className="relative z-[10] min-h-screen bg-[#020817] pt-28 md:pt-32 pb-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#08152f] via-[#0b1736] to-[#111827] p-6 md:p-10 mb-8">

          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <div className="flex flex-wrap gap-3 mb-5">

              <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                📚 {course?.category}
              </span>

              <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
                ⭐ {course?.rating}
              </span>

              <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                {progress?.percentage || 0}% Completed
              </span>

            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {course?.title}
            </h1>

            <p className="text-gray-400 mt-5 max-w-3xl text-base md:text-lg">
              {course?.description}
            </p>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Total Lessons
            </p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {allLessons.length}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-green-400 mt-2">
              {completedLessons.length}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Progress
            </p>

            <h3 className="text-3xl font-bold text-indigo-400 mt-2">
              {progress?.percentage || 0}%
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Duration
            </p>

            <h3 className="text-2xl font-bold text-cyan-400 mt-2">
              {course?.duration}
            </h3>
          </div>

        </div>

        {/* Main Layout */}
        <div className="grid xl:grid-cols-12 gap-6">

          {/* Sidebar */}
          <div className="xl:col-span-4">

            <div className="sticky top-24">
              <CourseSidebar
                curriculum={curriculum}
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                completedLessons={completedLessons}
              />
            </div>

          </div>

          {/* Main Content */}
          <div className="xl:col-span-8 space-y-6">

            <div className="overflow-hidden rounded-3xl border border-slate-800">
              <VideoPlayer lesson={currentLesson} />
            </div>

            <CourseProgress
              completedLessons={completedLessons}
              totalLessons={allLessons.length}
              percentage={progress?.percentage || 0}
            />

            <CourseCertificate
              progress={progress}
              userName={user?.name}
              courseTitle={course?.title}
            />

            <LessonNotes lesson={currentLesson} />

            <LessonNavigation
              onPrev={handlePrev}
              onNext={handleNext}
              onComplete={handleComplete}
              disablePrev={currentIndex === 0}
              disableNext={currentIndex === allLessons.length - 1}
              isCompleted={completedLessons.some(
                (id) =>
                  id.toString() ===
                  currentLesson?._id?.toString()
              )}
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default LearnCourse;
