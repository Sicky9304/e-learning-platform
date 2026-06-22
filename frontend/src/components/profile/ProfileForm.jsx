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
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6"
    >
      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-400">
            Name
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
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-400">
            Email
          </label>

          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-400">
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
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-400">
            Role
          </label>

          <input
            value={user?.role}
            readOnly
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <div className=" rounded-xl p-4 bg-gray-900 border border-gray-700">
            <h3 className="font-semibold text-white">
              Enrolled Courses
            </h3>

            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {user?.enrolledCourses?.length || 0}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className=" w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Save Changes
        </button>
      </div>
    </motion.form>
  );
};

export default ProfileForm;
