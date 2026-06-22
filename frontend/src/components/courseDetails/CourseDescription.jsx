const CourseDescription = ({ description }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        About This Course
      </h2>

      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default CourseDescription;
