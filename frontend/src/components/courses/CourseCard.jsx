import { memo } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = memo(({ course }) => {
  // console.log("Course Card:", course.title)
  return (
    <div
      className="
    bg-gradient-to-b
    from-slate-900
    to-[#111827]
    rounded-3xl
    border border-white/10
    overflow-hidden
    shadow-xl shadow-black/30
    hover:-translate-y-2
    hover:border-indigo-500/40
    transition-all duration-500
  "
    >
      {/* Course Image */}
      <div className="p-3 pb-0">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400?text=Course+Image";
            }}
            className="
          w-full
          h-52
          object-cover
          transition-transform
          duration-700
          hover:scale-110
        "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {course.bestSeller && (
            <span
              className="
            absolute top-3 left-3
            bg-yellow-400
            text-black
            text-xs
            font-bold
            px-3 py-1
            rounded-full
          "
            >
              ⭐ Bestseller
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category + Level */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/20"
          >
            {course.category}
          </span>

          <span className="bg-purple-500/10 text-purple-300 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-bold leading-tight line-clamp-2"
        >
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-gray-400 text-sm mt-2">
          By{" "}
          <span className="text-indigo-300">
            {course.instructor}
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-3 line-clamp-3">
          {course.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-yellow-400 font-semibold">
            ⭐ {course.rating}
          </span>

          <span className="text-gray-500 text-sm">
            ({course.students} students)
          </span>
        </div>

        {/* Duration & Lessons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-300">
            ⏳ {course.duration}
          </span>

          <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-300">
            📚 {course.lessons} Lessons
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-5">
          <span className="text-3xl font-bold text-white">
            {course.price}
          </span>

          <span className="text-red-400 line-through">
            {course.oldPrice}
          </span>
        </div>

        {/* Button */}
        <Link
          to={`/courses/${course._id}`}
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
        >
          View Course →
        </Link>
      </div>
    </div>
  );
});

export default CourseCard;
