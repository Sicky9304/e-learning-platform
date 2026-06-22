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
    <div className="relative z-[10] bg-[#020817] min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Mentors</h1>

        <button
          onClick={() => setOpenAddModal(true)}
          className=" relative z-[10] bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg text-white flex items-center gap-2"
        >
          <FaPlus />
          Add Mentor
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Mentor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-[#08152f] text-white border border-slate-700"
      />

      <div className="bg-[#08152f] rounded-xl overflow-hidden border border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4 text-left text-gray-400">Mentor</th>

              <th className="p-4 text-left text-gray-400">Role</th>

              <th className="p-4 text-left text-gray-400">Experience</th>

              <th className="p-4 text-left text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMentors.map((mentor) => (
              <tr key={mentor._id} className="border-b border-slate-800">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <span className="text-white">{mentor.name}</span>
                  </div>
                </td>

                <td className="p-4 text-gray-300">{mentor.role}</td>

                <td className="p-4 text-gray-300">{mentor.experience} Years</td>

                <td className="p-4 relative z-50">
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(mentor)} className="text-yellow-400">
                      <FaEdit />
                    </button>

                    <button onClick={() => handleDelete(mentor._id)} className="text-red-400">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
