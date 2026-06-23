import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-50 mb-8 flex items-center gap-2">

      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back</span>
      </button>

      <button
        onClick={() => navigate("/")}
        title="Go Home"
        className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300"
      >
        <FaHome />
      </button>

    </div>
  );
};

export default BackButton;
