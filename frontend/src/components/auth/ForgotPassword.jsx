import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await forgotPassword(email);

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#08152f] border border-slate-700 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          Forgot Password
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Enter your registered email
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <input
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-[#020817] border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg"
          >
            {loading
              ? "Sending..."
              : "Send Temporary Password"}
          </button>
        </form>

        <p className="text-center mt-4">
          <Link
            to="/login"
            className="text-indigo-400"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
