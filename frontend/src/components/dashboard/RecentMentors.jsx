import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RecentMentors = ({ mentors, onEdit, onDelete }) => {
  return (
    <div className="bg-[#08152f] rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Recent Mentors</h2>

        <Link
          to="/dashboard/mentors"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-3 text-gray-400">Mentor</th>

              <th className="py-3 text-gray-400">Role</th>

              <th className="py-3 text-gray-400">Experience</th>

              <th className="py-3 text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mentors?.map((mentor) => (
              <tr key={mentor._id} className="border-b border-slate-800">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <span className="text-white">{mentor.name}</span>
                  </div>
                </td>

                <td className="py-4 text-gray-300">{mentor.role}</td>

                <td className="py-4 text-gray-300">{mentor.experience} Years</td>

                <td className="py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(mentor)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(mentor._id)}
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

export default RecentMentors;
