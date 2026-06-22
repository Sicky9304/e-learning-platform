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

  return (
    <div className="fixed inset-0 bg-black/70 pt-28 py-20 flex justify-center items-center z-50">
      <div className="bg-[#08152f] w-full max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6 ">Add Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            />

            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={formData.oldPrice}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            />

            <input
              type="number"
              name="students"
              placeholder="Students"
              value={formData.students}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            />

            <input
              type="number"
              name="lessons"
              placeholder="Lessons"
              value={formData.lessons}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            />

            <textarea
              name="learningOutcomes"
              placeholder="Learning Outcomes (comma separated)"
              value={formData.learningOutcomes}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
            />

            <textarea
              name="requirements"
              placeholder="Requirements (comma separated)"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
            />

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
          </select>

          <select
            name="mentor"
            value={formData.mentor}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
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

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-white"
            >
              Add Course
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
  );
};

export default AddCourseModal;
