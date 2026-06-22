import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
} from "lucide-react";

const CourseCurriculum = ({ curriculum }) => {
  const [activeSection, setActiveSection] =
    useState(0);

  const toggleSection = (index) => {
    setActiveSection(
      activeSection === index ? null : index
    );
  };

  if (
    !curriculum ||
    curriculum.length === 0
  )
    return null;

  const totalLessons =
    curriculum.reduce(
      (acc, section) =>
        acc + section.lessons.length,
      0
    );

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Course Curriculum
        </h2>

        <span className="text-gray-400 text-sm">
          {curriculum.length} Sections •{" "}
          {totalLessons} Lessons
        </span>
      </div>

      <div className="space-y-4">
        {curriculum.map(
          (section, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  toggleSection(index)
                }
                className="w-full flex items-center justify-between p-5 bg-gray-900"
              >
                <div className="text-left">
                  <h3 className="text-white font-semibold">
                    {section.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {
                      section.lessons.length
                    }{" "}
                    Lessons
                  </p>
                </div>

                {activeSection ===
                  index ? (
                  <ChevronUp className="text-indigo-400" />
                ) : (
                  <ChevronDown className="text-indigo-400" />
                )}
              </button>

              <AnimatePresence>
                {activeSection ===
                  index && (
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
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-800">
                        {section.lessons.map(
                          (
                            lesson,
                            lessonIndex
                          ) => (
                            <div
                              key={
                                lessonIndex
                              }
                              className="flex items-center gap-3 p-4 border-t border-gray-700"
                            >
                              <PlayCircle
                                size={18}
                                className="text-indigo-400"
                              />

                              <div className="flex-1">
                                <p className="text-gray-200">
                                  {
                                    lesson.title
                                  }
                                </p>
                              </div>

                              <span className="text-xs text-gray-500">
                                {
                                  lesson.duration
                                }
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CourseCurriculum;
