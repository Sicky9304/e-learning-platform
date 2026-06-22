import { useState } from 'react';
import { addMentor } from '../../api/MentorApi';
import toast from 'react-hot-toast';

const AddMentorModal = ({ isOpen, onClose, onMentorAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    experience: '',
    linkedin: '',
    github: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMentor(formData);
      toast.success('Mentor Added Successfully...');
      onMentorAdded();

      onClose();

      setFormData({
        name: '',
        role: '',
        image: '',
        bio: '',
        experience: '',
        linkedin: '',
        github: '',
      });
    } catch (error) {
      console.log(error);
      toast.error("failed to adding Mentor! fill all fields")
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#08152f] w-full max-w-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Add Mentor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Mentor Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
            rows={4}
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-white"
            >
              Add Mentor
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMentorModal;
