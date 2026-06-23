import { useEffect, useState } from 'react';
import { addCourse } from '../../api/CourseApi';
import { getMentors } from '../../api/MentorApi';
import toast from 'react-hot-toast';

const AddCourseModal = ({ isOpen, onClose, onCourseAdded }) => {
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
    level: 'Beginner',
    bestSeller: false,
    mentor: '',
    learningOutcomes: '',
    requirements: '',
    curriculum: '',
    language: 'English',
  });



  const fetchMentors = async () => {
    try {
      const response = await getMentors();

      setMentors(response.data.mentors);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load mentors");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMentors();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        learningOutcomes: formData.learningOutcomes
          .split(',')
          .map(item => item.trim())
          .filter(Boolean),

        requirements: formData.requirements
          .split(',')
          .map(item => item.trim())
          .filter(Boolean),

        curriculum: formData.curriculum
          ? JSON.parse(formData.curriculum)
          : [],
      };
      await addCourse(payload);
      toast.success('Course Added Successfully...');
      onCourseAdded();
      onClose();

      setFormData({
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
        level: 'Beginner',
        bestSeller: false,
        mentor: '',
        learningOutcomes: '',
        requirements: '',
        curriculum: '',
        language: 'English',
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to adding course! fill all fields ")
    }
  };

  if (!isOpen) return null;
  const inputClass ="w-full rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white outline-none focus:border-indigo-500 transition";

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm pt-24 sm:pt-28 px-2 sm:px-4 pb-4 flex items-start justify-center">

      <div className="w-full max-w-5xl max-h-[calc(100vh-120px)] overflow-y-auto rounded-3xl border border-white/10 bg-[#08152f]/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#08152f]/95 backdrop-blur-xl px-4 sm:px-6 py-4">

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Add New Course
            </h2>

            <p className="text-sm text-gray-400">
              Create and publish a new course
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            ✕
          </button>

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
                placeholder="Course Title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                rows="4"
                name="description"
                placeholder="Course Description"
                value={formData.description}
                onChange={handleChange}
                className={inputClass}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
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
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="number"
                name="oldPrice"
                placeholder="Old Price"
                value={formData.oldPrice}
                onChange={handleChange}
                className={inputClass}
              />

            </div>

          </div>

          {/* Stats */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Course Statistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="number"
                name="students"
                placeholder="Students"
                value={formData.students}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="number"
                name="lessons"
                placeholder="Lessons"
                value={formData.lessons}
                onChange={handleChange}
                className={inputClass}
              />

            </div>

          </div>

          {/* Learning Details */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Learning Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
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

              <textarea
                rows="4"
                name="learningOutcomes"
                placeholder="Learning Outcomes (comma separated)"
                value={formData.learningOutcomes}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                rows="4"
                name="requirements"
                placeholder="Requirements (comma separated)"
                value={formData.requirements}
                onChange={handleChange}
                className={inputClass}
              />

            </div>

          </div>

          {/* Mentor & Settings */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Mentor & Settings
            </h3>

            <div className="grid gap-4">

              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
              </select>

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
          <div className="sticky bottom-0 bg-[#08152f]/95 backdrop-blur-xl pt-4">

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                Add Course
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddCourseModal;
