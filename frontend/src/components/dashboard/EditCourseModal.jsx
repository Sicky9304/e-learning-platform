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
  const inputClass ="w-full rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white outline-none focus:border-indigo-500 transition";
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm pt-24 px-2 sm:px-4 pb-4 overflow-y-auto">

      <div className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#08152f]/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">

        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/10">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Edit Course
              </h2>

              <p className="text-sm text-gray-400">
                Update course information and settings
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
            >
              ✕
            </button>

          </div>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-8">

          {/* Course Information */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Course Information
            </h3>

            <div className="grid gap-4">

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Course Title"
                className={inputClass}
              />

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Course Description"
                className={inputClass}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className={inputClass}
                />

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className={inputClass}
                />

              </div>

            </div>

          </div>

          {/* Pricing */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Pricing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className={inputClass}
              />

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Old Price"
                className={inputClass}
              />

            </div>

          </div>

          {/* Statistics */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Course Statistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating"
                className={inputClass}
              />

              <input
                type="number"
                name="students"
                value={formData.students}
                onChange={handleChange}
                placeholder="Students"
                className={inputClass}
              />

              <input
                type="number"
                name="lessons"
                value={formData.lessons}
                onChange={handleChange}
                placeholder="Lessons"
                className={inputClass}
              />

            </div>

          </div>

          {/* Course Details */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Course Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                className={inputClass}
              />

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

            </div>

          </div>

          {/* Mentor & Settings */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Mentor & Settings
            </h3>

            <div className="grid gap-4">

              <select
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Mentor</option>

                {mentors.map((mentor) => (
                  <option key={mentor._id} value={mentor._id}>
                    {mentor.name}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white">

                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleChange}
                />

                Best Seller Course

              </label>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">

            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
            >
              Update Course
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditCourseModal;
