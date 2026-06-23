import { useEffect, useState } from 'react';
import { getProfile } from '../api/authApi';
import { updateProfile } from '../api/authApi';
import { toast } from 'react-hot-toast';
import Dropzone from '../components/profile/AvatarDropzone';
import ProfileForm from '../components/profile/ProfileForm';
import { useAuth } from '../context/AuthContext';
import UpdatePassword from './UpdatePassword';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [file, setFile] = useState(null);

  // Fetch latest user data from database
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();

        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [setUser]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('phoneNumber', formData.phoneNumber);

      if (file) {
        data.append('avatar', file);
      }

      const response = await updateProfile(data);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      setFile(null);
      toast.success(response.message || 'Profile updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] pt-28 pb-16 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#08152f] via-[#0b1736] to-[#111827] p-6 md:p-10 mb-10">

          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                👨‍🎓 Student Dashboard
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-white mt-6">
                My Profile
              </h1>

              <p className="text-gray-400 mt-4 max-w-2xl text-base md:text-lg">
                Manage your account settings, update your profile,
                upload avatar and secure your account.
              </p>
            </div>

            {/* Quick Access */}
            <div className="min-w-[260px]">

              <button
                onClick={() => window.location.href = "/my-courses"}
                className="group w-full rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-6 hover:bg-indigo-500/20 transition-all duration-300"
              >
                <p className="text-indigo-300 text-sm">
                  Enrolled Courses
                </p>

                <h3 className="text-5xl font-black text-white mt-2">
                  {user?.enrolledCourses?.length || 0}
                </h3>

                <p className="text-gray-400 mt-3 group-hover:text-white transition">
                  View My Courses →
                </p>
              </button>

            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Full Name</p>

            <h3 className="text-white font-bold mt-2 text-xl">
              {user?.name}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Email</p>

            <h3 className="text-indigo-400 font-bold mt-2 text-lg break-all">
              {user?.email}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Phone</p>

            <h3 className="text-green-400 font-bold mt-2 text-xl">
              {user?.phoneNumber || "N/A"}
            </h3>
          </div>

          <div className="bg-[#08152f] border border-slate-800 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Role</p>

            <h3 className="text-yellow-400 font-bold mt-2 text-xl capitalize">
              {user?.role}
            </h3>
          </div>

        </div>

        {/* Main Content */}
        <div className="space-y-8">

          {/* Profile Update */}
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-1">
              <Dropzone
                file={file}
                setFile={setFile}
                currentAvatar={user?.avatar?.url}
              />
            </div>

            <div className="lg:col-span-2">
              <ProfileForm
                user={user}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
              />
            </div>

          </div>

          {/* Password Section */}
          <UpdatePassword />

        </div>

      </div>

    </div>
  );
};

export default Profile;
