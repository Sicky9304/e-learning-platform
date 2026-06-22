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
    <section className="relative z-[10] min-h-screen bg-[#020817] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton/>
        <div className="grid lg:grid-cols-12 gap-6">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4">
            <CourseSidebar
              curriculum={curriculum}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              completedLessons={completedLessons}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-8 space-y-6">

            <VideoPlayer lesson={currentLesson} />

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
              disableNext={
                currentIndex === allLessons.length - 1
              }
              isCompleted={completedLessons.some(
                (id) =>
                  id.toString() === currentLesson?._id?.toString()
              )}
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default LearnCourse;
