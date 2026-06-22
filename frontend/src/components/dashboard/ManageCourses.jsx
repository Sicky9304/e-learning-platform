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
    <div className="relative z-[10] bg-[#020817] min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Courses</h1>

        <button
          onClick={() => setOpenAddModal(true)}
          className="relative z-[10] bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg text-white flex items-center gap-2"
        >
          <FaPlus />
          Add Course
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-[#08152f] text-white border border-slate-700"
      />

      <div className="bg-[#08152f] rounded-xl overflow-hidden border border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4 text-left text-gray-400">Image</th>

              <th className="p-4 text-left text-gray-400">Title</th>

              <th className="p-4 text-left text-gray-400">Category</th>

              <th className="p-4 text-left text-gray-400">Price</th>

              <th className="p-4 text-left text-gray-400">Mentor</th>

              <th className="p-4 text-left text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course._id} className="border-b border-slate-800">
                <td className="p-4 ">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-12 rounded object-cover pointer-events-none"
                  />
                </td>

                <td className="p-4 text-white">{course.title}</td>

                <td className="p-4 text-gray-300">{course.category}</td>

                <td className="p-4 text-gray-300">₹{course.price}</td>

                <td className="p-4 text-gray-300">{course.mentor?.name}</td>

                <td className="p-4 relative z-50">
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(course)} className="text-yellow-400">
                      <FaEdit />
                    </button>

                    <button onClick={() => handleDelete(course._id)} className="text-red-400">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
