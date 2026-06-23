
import CourseCard from './CourseCard';

const CoursesGrid = ({ courses }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 blur-3xl" />

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-12">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
