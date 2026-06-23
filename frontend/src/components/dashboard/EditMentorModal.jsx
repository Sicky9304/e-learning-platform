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

  const inputClass ="w-full rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white outline-none focus:border-indigo-500 transition";
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm pt-24 px-2 sm:px-4 pb-4 overflow-y-auto">

      <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#08152f]/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">

        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/10">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Edit Mentor
              </h2>

              <p className="text-sm text-gray-400">
                Update mentor profile information
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
            >
              ✕
            </button>

          </div>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-8">

          {/* Basic Information */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Basic Information
            </h3>

            <div className="grid gap-4">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mentor Name"
                className={inputClass}
              />

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
                className={inputClass}
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className={inputClass}
              />

            </div>

          </div>

          {/* Biography */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              About Mentor
            </h3>

            <textarea
              rows="6"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write mentor biography..."
              className={inputClass}
            />

          </div>

          {/* Professional Details */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Professional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className={inputClass}
              />

              <div className="flex items-center rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-300">
                ⭐ Mentor Profile Active
              </div>

            </div>

          </div>

          {/* Social Profiles */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Social Profiles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className={inputClass}
              />

              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className={inputClass}
              />

            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">

            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
            >
              Update Mentor
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditMentorModal;
