import { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../../api/CourseApi';

import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

//notification
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState('');

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);



  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      // console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
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

      fetchCourses();
    } catch (error) {
      console.log(error);
       toast.error(error?.response?.data?.message || 'Failed to delete the course');
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);

    setOpenEditModal(true);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020817] p-3 sm:p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Manage Courses
          </h1>

          <p className="text-gray-400 mt-1">
            Create, edit and manage all platform courses
          </p>
        </div>

        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-white font-semibold hover:scale-[1.02] transition"
        >
          <FaPlus />
          Add Course
        </button>

      </div>

      {/* Search */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#08152f] px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
        />

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl">

        <table className="w-full">

          <thead>
            <tr className="border-b border-white/10">

              <th className="p-5 text-left text-gray-400">Image</th>
              <th className="p-5 text-left text-gray-400">Title</th>
              <th className="p-5 text-left text-gray-400">Category</th>
              <th className="p-5 text-left text-gray-400">Price</th>
              <th className="p-5 text-left text-gray-400">Mentor</th>
              <th className="p-5 text-left text-gray-400">Actions</th>

            </tr>
          </thead>

          <tbody>

            {filteredCourses.map((course) => (

              <tr
                key={course._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="p-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-16 w-24 rounded-xl object-cover"
                  />
                </td>

                <td className="p-4 text-white font-medium">
                  {course.title}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-300">
                    {course.category}
                  </span>
                </td>

                <td className="p-4 text-green-400 font-semibold">
                  ₹{course.price}
                </td>

                <td className="p-4 text-gray-300">
                  {course.mentor?.name || "N/A"}
                </td>

                <td className="p-4">

                  <div className="flex gap-3">

                    <button
                      onClick={() => handleEdit(course)}
                      className="rounded-xl bg-yellow-500/20 p-3 text-yellow-400 hover:bg-yellow-500/30 transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="rounded-xl bg-red-500/20 p-3 text-red-400 hover:bg-red-500/30 transition"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile + Tablet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">

        {filteredCourses.map((course) => (

          <div
            key={course._id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl"
          >

            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                  {course.category}
                </span>

                <span className="font-bold text-green-400">
                  ₹{course.price}
                </span>

              </div>

              <h3 className="mt-4 text-lg font-bold text-white">
                {course.title}
              </h3>

              <p className="mt-2 text-gray-400">
                Mentor: {course.mentor?.name || "N/A"}
              </p>

              <div className="mt-5 flex gap-3">

                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 rounded-xl bg-yellow-500/20 py-3 text-yellow-400 font-medium hover:bg-yellow-500/30 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 rounded-xl bg-red-500/20 py-3 text-red-400 font-medium hover:bg-red-500/30 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Modals */}
      <AddCourseModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onCourseAdded={fetchCourses}
      />

      <EditCourseModal
        isOpen={openEditModal}
        selectedCourse={selectedCourse}
        onClose={() => setOpenEditModal(false)}
        onCourseUpdated={fetchCourses}
      />

    </div>
  );
};

export default ManageCourses;
