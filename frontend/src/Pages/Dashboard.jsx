import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { getDashboardStats } from './../api/dashboardApi';
import { deleteCourse } from '../api/CourseApi';
import { deleteMentor } from '../api/MentorApi';
import DashboardStats from './../components/dashboard/DashboardStats';
import RecentCourses from './../components/dashboard/RecentCourses';
import RecentMentors from './../components/dashboard/RecentMentors';
import EditCourseModal from '../components/dashboard/EditCourseModal';
import EditMentorModal from '../components/dashboard/EditMentorModal';
import RecentOrders from './../components/dashboard/RecentOrders';



const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [selectedMentor, setSelectedMentor] = useState(null);

  const [openEditCourseModal, setOpenEditCourseModal] = useState(false);

  const [openEditMentorModal, setOpenEditMentorModal] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Load Data");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  // Course Edit
  const handleEditCourse = (course) => {
    setSelectedCourse(course);

    setOpenEditCourseModal(true);
  };

  // Handle course deletion with confirmation
  const handleDeleteCourse = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Course?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCourse(id);

      toast.success('Course deleted successfully');

      fetchDashboardData();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || 'Failed to delete course');
    }
  };

  // Mentor Edit
  const handleEditMentor = (mentor) => {
    setSelectedMentor(mentor);

    setOpenEditMentorModal(true);
  };

  // Handle mentor deletion with confirmation
  const handleDeleteMentor = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Mentor?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMentor(id);

      toast.success('Mentor deleted successfully');

      fetchDashboardData();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || 'Failed to delete mentor');
    }
  };

  if (!stats) {
    return (
      <div className="bg-[#020817] min-h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl">Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#020817] min-h-screen p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>

          <p className="text-gray-400 mt-2">Manage Courses, Mentors and Platform</p>
        </div>

        <div className=" relative z-[40] flex gap-4 mt-4 md:mt-0">
          <Link
            to="/dashboard/courses"
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg text-white"
          >
            Manage Courses
          </Link>

          <Link
            to="/dashboard/mentors"
            className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-lg text-white"
          >
            Manage Mentors
          </Link>

          <Link
            to="/dashboard/orders"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Stats */}

      <DashboardStats stats={stats} />

      {/* Latest Course */}

      <div className="bg-[#08152f] border border-slate-700 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Latest Course</h2>

        <div>
          <h3 className="text-xl text-white">{stats.latestCourse?.title}</h3>

          <p className="text-gray-400 mt-2">Category: {stats.latestCourse?.category}</p>

          <p className="text-gray-400">Price: ₹{stats.latestCourse?.price}</p>
        </div>
      </div>

      {/* Recent Orders */}

      <RecentOrders />

      {/* Recent Courses */}

      <div className="mt-10">
        <RecentCourses
          courses={stats.recentCourses}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
        />
      </div>

      {/* Recent Mentors */}

      <div className="mt-10">
        <RecentMentors
          mentors={stats.recentMentors}
          onEdit={handleEditMentor}
          onDelete={handleDeleteMentor}
        />
      </div>

      {/* Edit Course Modal */}

      <EditCourseModal
        isOpen={openEditCourseModal}
        selectedCourse={selectedCourse}
        onClose={() => setOpenEditCourseModal(false)}
        onCourseUpdated={fetchDashboardData}
      />

      {/* Edit Mentor Modal */}

      <EditMentorModal
        isOpen={openEditMentorModal}
        selectedMentor={selectedMentor}
        onClose={() => setOpenEditMentorModal(false)}
        onMentorUpdated={fetchDashboardData}
      />
    </div>
  );
};

export default Dashboard;
