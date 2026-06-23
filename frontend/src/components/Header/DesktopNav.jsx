import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Courses", to: "/courses" },
];

const DesktopNav = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* CENTER NAV */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex items-center gap-8 bg-white/5 border border-white/10 rounded-full px-8 py-3 backdrop-blur-md">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-sm font-semibold text-white hover:text-indigo-400 transition"
            >
              {item.name}
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-white hover:text-indigo-400 transition"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="group"
            >
              <img
                src={
                  user?.avatar?.url ||
                  `https://ui-avatars.com/api/?name=${user?.name}`
                }
                alt={user?.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500 shadow-lg shadow-indigo-500/30 hover:scale-110 transition"
              />
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
