import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';

const RecentCourses = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Recent Courses
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Latest courses added to the platform
          </p>
        </div>

        <Link
          to="/dashboard/courses"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white font-medium hover:scale-[1.02] transition"
        >
          View All
          <FaArrowRight size={12} />
        </Link>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 bg-white/5">

              <th className="p-4 text-left text-gray-400">
                Course
              </th>

              <th className="p-4 text-left text-gray-400">
                Category
              </th>

              <th className="p-4 text-left text-gray-400">
                Price
              </th>

              <th className="p-4 text-left text-gray-400">
                Mentor
              </th>

              <th className="p-4 text-left text-gray-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {courses?.map((course) => (

              <tr
                key={course._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-14 w-20 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="text-white font-medium">
                        {course.title}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {course.lessons} Lessons
                      </p>
                    </div>

                  </div>

                </td>

                <td className="p-4">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                    {course.category}
                  </span>
                </td>

                <td className="p-4 text-green-400 font-semibold">
                  ₹{course.price}
                </td>

                <td className="p-4 text-gray-300">
                  {course.mentor?.name || "N/A"}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(course)}
                      className="rounded-xl bg-yellow-500/20 p-3 text-yellow-400 hover:bg-yellow-500/30 transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(course._id)}
                      className="rounded-xl bg-red-500/20 p-3 text-red-400 hover:bg-red-500/30 transition"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">

        {courses?.map((course) => (

          <div
            key={course._id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >

            <div className="flex gap-4">

              <img
                src={course.image}
                alt={course.title}
                className="h-20 w-24 rounded-xl object-cover"
              />

              <div className="flex-1 min-w-0">

                <h3 className="text-white font-semibold line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {course.mentor?.name || "N/A"}
                </p>

                <div className="flex items-center justify-between mt-3">

                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                    {course.category}
                  </span>

                  <span className="text-green-400 font-semibold">
                    ₹{course.price}
                  </span>

                </div>

              </div>

            </div>

            <div className="mt-4 flex gap-3">

              <button
                onClick={() => onEdit(course)}
                className="flex-1 rounded-xl bg-yellow-500/20 py-3 text-yellow-400 font-medium hover:bg-yellow-500/30 transition"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(course._id)}
                className="flex-1 rounded-xl bg-red-500/20 py-3 text-red-400 font-medium hover:bg-red-500/30 transition"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentCourses;
