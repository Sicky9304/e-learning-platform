import { CheckCircle } from "lucide-react";

const CourseLearningOutcomes = ({
  learningOutcomes,
}) => {
  if (
    !learningOutcomes ||
    learningOutcomes.length === 0
  )
    return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        What You'll Learn
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {learningOutcomes.map(
          (item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <CheckCircle
                className="text-green-400 mt-1"
                size={18}
              />

              <p className="text-gray-300">
                {item}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CourseLearningOutcomes;
