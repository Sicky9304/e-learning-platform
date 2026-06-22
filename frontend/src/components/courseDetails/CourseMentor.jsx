const CourseMentor = ({ mentor }) => {
  if (!mentor) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        Instructor
      </h2>

      <div className="flex items-center gap-4">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
        />

        <div>
          <h3 className="text-xl font-semibold text-white">
            {mentor.name}
          </h3>

          <p className="text-indigo-400">
            {mentor.designation}
          </p>

          <p className="text-gray-400 mt-2">
            {mentor.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseMentor;
