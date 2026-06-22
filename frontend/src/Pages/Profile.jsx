import { useEffect, useState } from 'react';
import { getProfile } from '../api/authApi';
import { updateProfile } from '../api/authApi';
import { toast } from 'react-hot-toast';
import Dropzone from '../components/profile/AvatarDropzone';
import ProfileForm from '../components/profile/ProfileForm';
import { useAuth } from '../context/AuthContext';
import UpdatePassword from './UpdatePassword';
import SideBar from '../components/profile/SideBar';

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

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="relative z-[10] max-w-6xl mx-auto px-4 py-10 ">
        <h1 className="text-3xl font-bold mb-8 text-indigo-500">My Profile</h1>
        <div className="grid lg:grid-cols-3 gap-8">

          <SideBar user={user} />

          <div className="lg:col-span-2 space-y-8">

            <Dropzone
              file={file}
              setFile={setFile}
              currentAvatar={user?.avatar?.url}
            />

            <ProfileForm
              user={user}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />

            <UpdatePassword />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
