import { motion } from "framer-motion";

const ProfileForm = ({
  user,
  formData,
  setFormData,
  handleSubmit,
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="bg-[#08152f] border border-slate-700 rounded-3xl p-6 md:p-8 shadow-xl"
    >

      {/* Header */}
      <div className="mb-8">

        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
          Account Settings
        </span>

        <h2 className="text-3xl font-bold text-white mt-4">
          Personal Information
        </h2>

        <p className="text-gray-400 mt-2">
          Manage your profile details and account information.
        </p>

      </div>

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block mb-2 text-gray-400 text-sm">
            Full Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-gray-400 text-sm">
            Email Address
          </label>

          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-gray-400 text-sm">
            Phone Number
          </label>

          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                phoneNumber: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
            placeholder="Enter phone number"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-gray-400 text-sm">
            Account Role
          </label>

          <input
            value={user?.role}
            readOnly
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-yellow-400 capitalize cursor-not-allowed"
          />
        </div>

      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Enrolled Courses
          </p>

          <h3 className="text-3xl font-black text-indigo-400 mt-2">
            {user?.enrolledCourses?.length || 0}
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Account Status
          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">
            Active
          </h3>
        </div>

      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg transition-all duration-300 hover:scale-[1.01]"
      >
        Save Changes
      </button>

    </motion.form>
  );
};

export default ProfileForm;
