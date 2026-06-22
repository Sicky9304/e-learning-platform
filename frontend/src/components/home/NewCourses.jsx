import { useEffect, useState } from 'react';
import { getLatestCourses } from '../../api/CourseApi';
import CourseCard from '../courses/CourseCard';

const NewCourses = () => {
  const [courses, setCourses] = useState([]);


  const fetchCourses = async () => {
    try {
      const response = await getLatestCourses();

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
     fetchCourses();
   }, []);

  return (
    <section className="py-20 px-6 bg-[#020817]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white">New Courses</h2>

        <p className="text-center text-gray-400 mt-3">Recently added courses</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {courses?.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCourses;
