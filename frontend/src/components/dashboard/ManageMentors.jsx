import { useEffect, useState } from 'react';
import { getMentors, deleteMentor } from '../../api/MentorApi';

import AddMentorModal from './AddMentorModal';
import EditMentorModal from './EditMentorModal';

import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageMentors = () => {
  const [mentors, setMentors] = useState([]);

  const [search, setSearch] = useState('');

  const [selectedMentor, setSelectedMentor] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);



  const fetchMentors = async () => {
    try {
      const response = await getMentors();

      setMentors(response.data.mentors);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load mentor data");
    }
  };

   useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
     fetchMentors();
   }, []);

  const handleEdit = (mentor) => {
    setSelectedMentor(mentor);

    setOpenEditModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Mentor?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMentor(id);

      toast.success('Mentor deleted successfully');

      fetchMentors();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete Mentor');
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020817] p-3 sm:p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Manage Mentors
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all mentors and instructors on your platform
          </p>
        </div>

        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-white font-semibold hover:scale-[1.02] transition"
        >
          <FaPlus />
          Add Mentor
        </button>

      </div>

      {/* Search */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Search mentors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#08152f] px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
        />

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl">

        <table className="w-full">

          <thead>
            <tr className="border-b border-white/10">

              <th className="p-5 text-left text-gray-400">Mentor</th>
              <th className="p-5 text-left text-gray-400">Role</th>
              <th className="p-5 text-left text-gray-400">Experience</th>
              <th className="p-5 text-left text-gray-400">Actions</th>

            </tr>
          </thead>

          <tbody>

            {filteredMentors.map((mentor) => (

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

                      <p className="text-gray-500 text-sm">
                        Instructor
                      </p>
                    </div>

                  </div>

                </td>

                <td className="p-4 text-gray-300">
                  {mentor.role}
                </td>

                <td className="p-4">

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300">
                    {mentor.experience} Years
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-3">

                    <button
                      onClick={() => handleEdit(mentor)}
                      className="rounded-xl bg-yellow-500/20 p-3 text-yellow-400 hover:bg-yellow-500/30 transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(mentor._id)}
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

      {/* Mobile & Tablet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">

        {filteredMentors.map((mentor) => (

          <div
            key={mentor._id}
            className="rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl p-5"
          >

            <div className="flex items-center gap-4">

              <img
                src={mentor.image}
                alt={mentor.name}
                className="h-16 w-16 rounded-full object-cover border border-white/10"
              />

              <div>

                <h3 className="text-lg font-bold text-white">
                  {mentor.name}
                </h3>

                <p className="text-gray-400">
                  {mentor.role}
                </p>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300">
                {mentor.experience} Years Experience
              </span>

            </div>

            <div className="mt-5 flex gap-3">

              <button
                onClick={() => handleEdit(mentor)}
                className="flex-1 rounded-xl bg-yellow-500/20 py-3 text-yellow-400 font-medium hover:bg-yellow-500/30 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(mentor._id)}
                className="flex-1 rounded-xl bg-red-500/20 py-3 text-red-400 font-medium hover:bg-red-500/30 transition"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Modals */}
      <AddMentorModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onMentorAdded={fetchMentors}
      />

      <EditMentorModal
        isOpen={openEditModal}
        selectedMentor={selectedMentor}
        onClose={() => setOpenEditModal(false)}
        onMentorUpdated={fetchMentors}
      />

    </div>
  );
};

export default ManageMentors;
