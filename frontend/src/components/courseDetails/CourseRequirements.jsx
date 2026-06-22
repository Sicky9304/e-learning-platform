import { Check } from "lucide-react";

const CourseRequirements = ({
  requirements,
}) => {
  if (
    !requirements ||
    requirements.length === 0
  )
    return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        Requirements
      </h2>

      <div className="space-y-3">
        {requirements.map(
          (item, index) => (
            <div
              key={index}
              className="flex gap-3 items-center"
            >
              <Check
                size={18}
                className="text-indigo-400"
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

export default CourseRequirements;
