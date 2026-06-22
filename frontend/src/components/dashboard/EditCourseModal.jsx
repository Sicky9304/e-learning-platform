import { useEffect, useState } from 'react';
import { updateCourse } from '../../api/CourseApi';
import { getMentors } from '../../api/MentorApi';
import { toast } from 'react-hot-toast';

const EditCourseModal = ({ isOpen, onClose, selectedCourse, onCourseUpdated }) => {
  const [mentors, setMentors] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    price: '',
    oldPrice: '',
    rating: '',
    students: '',
    lessons: '',
    duration: '',
    level: '',
    bestSeller: false,
    mentor: '',
  });

  // Show form fields when a Course is selected for editing
  useEffect(() => {
    if (selectedCourse) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: selectedCourse.title || '',
        description: selectedCourse.description || '',
        category: selectedCourse.category || '',
        image: selectedCourse.image || '',
        price: selectedCourse.price || '',
        oldPrice: selectedCourse.oldPrice || '',
        rating: selectedCourse.rating || '',
        students: selectedCourse.students || '',
        lessons: selectedCourse.lessons || '',
        duration: selectedCourse.duration || '',
        level: selectedCourse.level || '',
        bestSeller: selectedCourse.bestSeller || false,
        mentor: selectedCourse.mentor?._id || selectedCourse.mentor || '',
      });
    }
  }, [selectedCourse]);

  // Fetch mentors for mentor dropdown
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await getMentors();
        setMentors(response.data.mentors);
      } catch (error) {
        console.log(error);
        toast.error("Failed to Fetch mentors data");
      }
    };

    fetchMentors();
  }, []);

  // Prevent background page scrolling when Editing modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle input field changes and update form state
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission and update course details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourse(selectedCourse._id, formData);
      toast.success('Course Edited Successfully...');
      onCourseUpdated();

      onClose();
    } catch (error) {
      console.log(error);
       toast.error(error?.response?.data?.message || 'Failed to add course');
    }
  };

  // Prevent modal rendering when the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start md:items-center justify-center p-4">
        <div className="bg-[#08152f] w-full max-w-2xl rounded-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto mx-2">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Course</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              />

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              />

              <input
                type="number"
                name="students"
                value={formData.students}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              />

              <input
                type="number"
                name="lessons"
                value={formData.lessons}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              />

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800 text-white text-base"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <select
              name="mentor"
              value={formData.mentor}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white text-base"
            >
              <option value="">Select Mentor</option>

              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={handleChange}
              />
              Best Seller
            </label>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-white"
              >
                Update Course
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};;;

export default EditCourseModal;
