import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LessonItem from "./LessonItem";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CourseSidebar = ({
  curriculum,
  currentLesson,
  setCurrentLesson,
  completedLessons = [],
}) => {
  const [openSection, setOpenSection] = useState(0);

  const toggleSection = (index) => {
    setOpenSection(
      openSection === index ? null : index
    );
  };

  return (
    <div className="bg-[#08152f] rounded-2xl p-5 h-fit sticky top-24">
      <h2 className="text-white text-2xl font-bold mb-6">
        Course Content
      </h2>

      <div className="space-y-4">
        {curriculum?.map((section, index) => (
          <div
            key={index}
            className="border border-slate-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-4 bg-slate-900"
            >
              <div className="text-left">
                <h3 className="text-white font-medium">
                  {section.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {section.lessons.length} Lessons
                </p>
              </div>

              {openSection === index ? (
                <ChevronUp
                  size={18}
                  className="text-indigo-400"
                />
              ) : (
                <ChevronDown
                  size={18}
                  className="text-indigo-400"
                />
              )}
            </button>

            <AnimatePresence>
              {openSection === index && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className="overflow-hidden"
                >
                  {section.lessons.map(
                    (lesson) => {
                      const isActive =
                        currentLesson?._id ===
                        lesson._id;

                      const isCompleted =
                        completedLessons.includes(
                          lesson._id
                        );

                      return (
                        <LessonItem
                          key={lesson._id}
                          lesson={lesson}
                          isActive={isActive}
                          isCompleted={isCompleted}
                          onClick={() => setCurrentLesson(lesson)}
                        />
                      );
                    }
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
