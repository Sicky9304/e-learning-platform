import { useEffect, useState } from 'react';
import { updateMentor } from '../../api/MentorApi';
import toast from 'react-hot-toast';


const EditMentorModal = ({ isOpen, onClose, selectedMentor, onMentorUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    experience: '',
    linkedin: '',
    github: '',
  });
  // Show form fields when a mentor is selected for editing
  useEffect(() => {
    if (selectedMentor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: selectedMentor.name || '',
        role: selectedMentor.role || '',
        image: selectedMentor.image || '',
        bio: selectedMentor.bio || '',
        experience: selectedMentor.experience || '',
        linkedin: selectedMentor.linkedin || '',
        github: selectedMentor.github || '',
      });
    }
  }, [selectedMentor]);

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle input field changes and update mentor form state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission and update mentor details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateMentor(selectedMentor._id, formData);
      toast.success('Mentor Edited Successfully...');
      onMentorUpdated();

      onClose();
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to add mentor');
    }
  };

  // Prevent modal rendering when the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start md:items-center justify-center p-4">
        <div className="bg-[#08152f] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6 mx-2">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Mentor</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-white"
              >
                Update Mentor
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
    </div>
  );
};

export default EditMentorModal;
