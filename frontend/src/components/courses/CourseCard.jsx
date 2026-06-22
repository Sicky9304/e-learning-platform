import { memo } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = memo(({ course }) => {
  // console.log("Course Card:", course.title)
  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      {/* Course Image */}
      <div className="overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=Course+Image';
          }}
          className="w-full h-52 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* level */}
        <span className="bg-purple-300 text-black text-xs font-semibold px-2 py-1 rounded ">
          {course.level}
        </span>
        {/* category */}
        <span className="bg-purple-300 text-black text-xs font-semibold mx-5 px-2 py-1 rounded ">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="text-white text-xl font-bold line-clamp-2">{course.title}</h3>

        {/* Instructor */}
        <p className="text-gray-400 text-sm mt-2">{course.instructor}</p>

        {/* Description */}
        <p className="text-gray-300 text-sm mt-3 line-clamp-3">{course.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-yellow-400 font-bold">{course.rating}</span>

          <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>

          <span className="text-gray-400 text-sm">({course.students})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-white">{course.price}</span>

          <span className="text-red-500 line-through">{course.oldPrice}</span>
        </div>
        {/* duration */}
        <div className="flex gap-2">
          <span className="bg-purple-300 text-black text-xs  font-semibold px-3 py-1 rounded ">
            {course.duration}
          </span>

          <span className="bg-purple-300 text-black text-xs font-semibold  px-3 py-1 rounded ">
            Lessons: {course.lessons}
          </span>

          {/* Bestseller */}
          {course.bestSeller && (
            <span className="bg-purple-300 text-black text-xs font-semibold px-3 py-1 rounded">
              Bestseller
            </span>
          )}
        </div>

        {/* View Course Button */}
        <Link
          to={`/courses/${course._id}`}
          className="block w-full mt-5 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg text-white font-semibold text-center transition"
        >
          View Course
        </Link>
      </div>
    </div>
  );
});

export default CourseCard;
