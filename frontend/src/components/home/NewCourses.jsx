import { useEffect, useState } from "react";
import { getLatestCourses } from "../../api/CourseApi";
import CourseCard from "../courses/CourseCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            🚀 Fresh Learning Content
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Newly Added
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Courses
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-center text-gray-400 mt-6 text-base sm:text-lg leading-8">
          Discover the latest industry-focused courses designed to help
          you learn faster, build projects, and stay ahead in your career.
        </p>

        {/* Slider */}
        <div className="mt-16">

          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            navigation
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            spaceBetween={24}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >

            {courses?.map((course) => (
              <SwiperSlide key={course._id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}

          </Swiper>

        </div>

      </div>
    </section>
  );
};

export default NewCourses;
