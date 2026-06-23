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
  const inputClass ="w-full rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white outline-none focus:border-indigo-500 transition";
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm pt-24 px-2 sm:px-4 pb-4 overflow-y-auto">

      <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#08152f]/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#08152f]/95 backdrop-blur-xl px-4 sm:px-6 py-4">

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Add New Mentor
            </h2>

            <p className="text-sm text-gray-400">
              Create a mentor profile for your platform
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            ✕
          </button>

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
                placeholder="Mentor Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="text"
                name="role"
                placeholder="Role (e.g. Senior MERN Developer)"
                value={formData.role}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="text"
                name="image"
                placeholder="Profile Image URL"
                value={formData.image}
                onChange={handleChange}
                className={inputClass}
              />

            </div>

          </div>

          {/* Bio */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              About Mentor
            </h3>

            <textarea
              rows="6"
              name="bio"
              placeholder="Write mentor biography..."
              value={formData.bio}
              onChange={handleChange}
              className={inputClass}
            />

          </div>

          {/* Experience */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Professional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputClass}
              />

              <div className="flex items-center rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-300">
                ⭐ Featured Industry Expert
              </div>

            </div>

          </div>

          {/* Social Links */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Social Profiles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="text"
                name="github"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={handleChange}
                className={inputClass}
              />

            </div>

          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-[#08152f]/95 backdrop-blur-xl pt-4">

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                Add Mentor
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddMentorModal;
