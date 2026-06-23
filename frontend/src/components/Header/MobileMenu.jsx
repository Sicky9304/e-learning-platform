import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";

const navigation = [
  {
    name: "Home",
    to: "/",
    icon: <FaHome />,
  },
  {
    name: "About",
    to: "/about",
    icon: <FaInfoCircle />,
  },
  {
    name: "Contact",
    to: "/contact",
    icon: <FaPhone />,
  },
  {
    name: "Courses",
    to: "/courses",
    icon: <FaBookOpen />,
  },
];

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  profileMenuOpen,
  setProfileMenuOpen,
  user,
  handleLogout,
}) => {
  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

      <DialogPanel className="fixed top-0 right-0 z-50 h-screen w-full max-w-sm overflow-hidden bg-[#020817]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <div>
            <h2 className="text-xl font-bold text-white">
              E-Learn
            </h2>

            <p className="text-xs text-gray-400">
              Learn • Build • Grow
            </p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-5 py-6">

          {/* User Section */}
          {user && (
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-5 mb-6">

              <div className="flex items-center gap-4">

                <img
                  src={
                    user?.avatar?.url ||
                    `https://ui-avatars.com/api/?name=${user?.name}`
                  }
                  alt={user?.name}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover"
                />

                <div>
                  <h3 className="text-white font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="space-y-3">

            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-4 rounded-2xl px-5 py-4 bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300"
                >
                  <span className="text-indigo-400 text-lg">
                    {item.icon}
                  </span>

                  <span className="text-white font-medium">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}

            {user?.role === "admin" && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 text-indigo-300"
              >
                📊 Dashboard
              </Link>
            )}
          </div>

          {/* Profile Section */}
          {user && (
            <div className="mt-8">

              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-full bg-[#08152f] border border-white/10 rounded-2xl p-4 text-left text-white font-medium"
              >
                Account Settings
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="bg-[#08152f] border border-white/10 rounded-2xl overflow-hidden">

                      <Link
                        to="/profile"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-5 py-4 text-gray-300 hover:bg-white/5 transition"
                      >
                        👤 Profile
                      </Link>

                      <Link
                        to="/my-courses"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-5 py-4 text-gray-300 hover:bg-white/5 transition"
                      >
                        📚 My Courses
                      </Link>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

          {/* Auth Buttons */}
          <div className="mt-8">

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-3">

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-4 rounded-2xl bg-indigo-600 text-white font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold"
                >
                  Sign Up
                </Link>

              </div>
            )}
          </div>

        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MobileMenu;
