import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowRight, FaLinkedin, FaGithub } from 'react-icons/fa';

const RecentMentors = ({ mentors, onEdit, onDelete }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Recent Mentors
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Latest mentors added to your platform
          </p>
        </div>

        <Link
          to="/dashboard/mentors"
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
              <th className="p-4 text-left text-gray-400">Mentor</th>
              <th className="p-4 text-left text-gray-400">Role</th>
              <th className="p-4 text-left text-gray-400">Experience</th>
              <th className="p-4 text-left text-gray-400">Social</th>
              <th className="p-4 text-left text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>

            {mentors?.map((mentor) => (

              <tr
                key={mentor._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="h-14 w-14 rounded-full object-cover border border-white/10"
                    />

                    <div>
                      <h3 className="text-white font-medium">
                        {mentor.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        Instructor
                      </p>
                    </div>

                  </div>

                </td>

                <td className="p-4 text-gray-300">
                  {mentor.role}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                    {mentor.experience} Years
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-blue-500/20 p-2 text-blue-400 hover:bg-blue-500/30 transition"
                      >
                        <FaLinkedin />
                      </a>
                    )}

                    {mentor.github && (
                      <a
                        href={mentor.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20 transition"
                      >
                        <FaGithub />
                      </a>
                    )}

                  </div>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(mentor)}
                      className="rounded-xl bg-yellow-500/20 p-3 text-yellow-400 hover:bg-yellow-500/30 transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(mentor._id)}
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

        {mentors?.map((mentor) => (

          <div
            key={mentor._id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >

            <div className="flex items-center gap-4">

              <img
                src={mentor.image}
                alt={mentor.name}
                className="h-16 w-16 rounded-full object-cover border border-white/10"
              />

              <div className="flex-1">

                <h3 className="text-white font-semibold">
                  {mentor.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {mentor.role}
                </p>

                <span className="inline-block mt-2 rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                  {mentor.experience} Years Experience
                </span>

              </div>

            </div>

            {/* Social Links */}
            <div className="flex gap-2 mt-4">

              {mentor.linkedin && (
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-blue-500/20 p-3 text-blue-400 hover:bg-blue-500/30 transition"
                >
                  <FaLinkedin />
                </a>
              )}

              {mentor.github && (
                <a
                  href={mentor.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white/10 p-3 text-white hover:bg-white/20 transition"
                >
                  <FaGithub />
                </a>
              )}

            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3">

              <button
                onClick={() => onEdit(mentor)}
                className="flex-1 rounded-xl bg-yellow-500/20 py-3 text-yellow-400 font-medium hover:bg-yellow-500/30 transition"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(mentor._id)}
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

export default RecentMentors;
