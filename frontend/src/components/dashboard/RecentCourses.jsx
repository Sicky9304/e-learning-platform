import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RecentCourses = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="bg-[#08152f] rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Recent Courses</h2>

        <Link
          to="/dashboard/courses"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-3 text-gray-400">Course</th>

              <th className="py-3 text-gray-400">Category</th>

              <th className="py-3 text-gray-400">Price</th>

              <th className="py-3 text-gray-400">Mentor</th>

              <th className="py-3 text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses?.map((course) => (
              <tr key={course._id} className="border-b border-slate-800">
                <td className="py-4 text-white">{course.title}</td>

                <td className="py-4 text-gray-300">{course.category}</td>

                <td className="py-4 text-gray-300">₹{course.price}</td>

                <td className="py-4 text-gray-300">{course.mentor?.name}</td>

                <td className="py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(course)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(course._id)}
                      className="text-red-400 hover:text-red-300"
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
    </div>
  );
};

export default RecentCourses;
