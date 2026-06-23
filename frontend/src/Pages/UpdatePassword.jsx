import { useState } from "react";
import { Eye, EyeOff, ChevronDown, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { updatePassword } from "../api/authApi";

const UpdatePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await updatePassword(formData);

      toast.success(
        response.message || "Password updated successfully"
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#08152f] border border-slate-700 rounded-3xl overflow-hidden shadow-xl">

      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left relative overflow-hidden"
      >

        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5" />

        <div className="relative flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={26} className="text-white" />
            </div>

            <div>

              <div className="flex items-center gap-3 flex-wrap">

                <h2 className="text-xl font-bold text-white">
                  Security Center
                </h2>

                <span className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                  Protected
                </span>

              </div>

              <p className="text-gray-400 text-sm mt-1">
                Password • Account Protection • Authentication
              </p>

            </div>

          </div>

          <ChevronDown
            size={22}
            className={`text-gray-400 transition-all duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          />

        </div>

      </button>

      {/* Expand Content */}
      {isOpen && (
        <div className="border-t border-slate-700 p-6">

          {/* Security Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">

              <p className="text-xs text-gray-400">
                Security Score
              </p>

              <h3 className="text-3xl font-black text-green-400 mt-2">
                92%
              </h3>

            </div>

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">

              <p className="text-xs text-gray-400">
                Password Status
              </p>

              <h3 className="text-xl font-bold text-indigo-400 mt-2">
                Strong
              </h3>

            </div>

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">

              <p className="text-xs text-gray-400">
                Protection
              </p>

              <h3 className="text-xl font-bold text-cyan-400 mt-2">
                Active
              </h3>

            </div>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Current Password */}
            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

            </div>

            {/* New Password */}
            <div>

              <label className="block text-sm text-gray-400 mb-2">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

              {/* Strength Bar */}

              <div className="mt-4">

                <div className="flex justify-between mb-2">

                  <span className="text-xs text-gray-400">
                    Password Strength
                  </span>

                  <span className="text-xs text-green-400">
                    Strong
                  </span>

                </div>

                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                  <div className="h-full w-[85%] bg-gradient-to-r from-green-500 via-cyan-500 to-indigo-500 rounded-full" />

                </div>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

            </div>

            {/* Requirements */}

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">

              <h4 className="text-white font-semibold mb-3">
                Password Requirements
              </h4>

              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-400">

                <p>✓ At least 8 characters</p>
                <p>✓ Uppercase letter</p>
                <p>✓ Lowercase letter</p>
                <p>✓ Number & symbol</p>

              </div>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:scale-[1.01] transition-all duration-300 text-white font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-60"
            >
              {loading
                ? "Updating Security..."
                : "Update Password 🔐"}
            </button>

          </form>

        </div>
      )}

    </div>
  );
};

export default UpdatePassword;
