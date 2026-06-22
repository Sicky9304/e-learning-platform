import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
  { name: 'Courses', to: '/courses' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      <div className="bg-gray-900">
        <header className="fixed bg-gray-900  inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">E LEARN LMS</span>

                <img
                  alt="Logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              >
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link key={item.name} to={item.to} className="text-sm font-semibold text-white">
                  {item.name}
                </Link>
              ))}

              {user?.role === 'admin' && (
                <Link to="/dashboard" className="text-sm font-semibold text-white">
                  Dashboard
                </Link>
              )}
            </div>

            {/*Desktop Auth Button section */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
              {user ? (
                <>
                  <button onClick={() => {
                    if (location.pathname !== "/profile") {
                      navigate("/profile");
                    }
                  }} className="group">
                    <img
                      src={user?.avatar?.url || `https://ui-avatars.com/api/?name=${user?.name}`}
                      alt={user?.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500 hover:border-indigo-400 hover:scale-110 transition-all duration-300 shadow-lg"
                    />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl text-white">
                    Login
                  </Link>

                  <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-white">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* mobile views */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
              <div className="flex items-center justify-between">
                <Link to="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">E Learn PlatForm</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-200"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  {/* ================= MOBILE NAVIGATION ================= */}

                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Admin Dashboard Link */}
                    {user?.role === 'admin' && (
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-indigo-400 hover:bg-white/5"
                      >
                        Dashboard
                      </Link>
                    )}
                  </div>

                  {/* ================= MOBILE AUTH SECTION ================= */}

                  <div className="py-6">
                    {user ? (
                      <div className="relative">
                        <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                          <img
                            src={
                              user?.avatar?.url || `https://ui-avatars.com/api/?name=${user?.name}`
                            }
                            alt={user?.name}
                            className=" w-10 h-10 rounded-full object-cover border-2 border-indigo-500 hover:border-indigo-400 transition"
                          />
                        </button>

                        {profileMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          >
                            <div className=" absolute right-0 mt-3 w-64 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md ">
                              <div className="p-4 border-b border-gray-700">
                                <p className="font-semibold text-white">{user.name}</p>

                                <p className="text-sm text-gray-400 truncate">{user.email}</p>
                              </div>

                              <Link
                                to="/profile"
                                onClick={() => setProfileMenuOpen(false)}
                                className=" block px-4 py-3 text-gray-200 hover:bg-gray-700 transition"
                              >
                                Profile
                              </Link>

                              <Link
                                to="/my-courses"
                                onClick={() => setProfileMenuOpen(false)}
                                className=" block px-4 py-3 text-gray-200 hover:bg-gray-700 transition"
                              >
                                My Courses
                              </Link>

                              <button
                                onClick={handleLogout}
                                className=" w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
                              >
                                Logout
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/login"
                          className="block rounded-lg bg-indigo-500 px-3 py-2.5 text-center font-semibold text-white"
                        >
                          Login
                        </Link>

                        <Link
                          to="/register"
                          className="block rounded-lg bg-green-500 px-3 py-2.5 text-center font-semibold text-white"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
