import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const features = [
  {
    icon: "🎓",
    title: "Certified Instructors",
    desc: "Learn directly from experienced industry professionals.",
  },
  {
    icon: "💻",
    title: "Practical Projects",
    desc: "Build real-world applications and portfolio projects.",
  },
  {
    icon: "📱",
    title: "Flexible Learning",
    desc: "Access courses anytime, anywhere on any device.",
  },
  {
    icon: "🌎",
    title: "Global Community",
    desc: "Connect with learners and mentors worldwide.",
  },
  {
    icon: "🚀",
    title: "Career Growth",
    desc: "Gain skills that help you grow faster professionally.",
  },
  {
    icon: "🏆",
    title: "Certificates",
    desc: "Earn verified certificates after course completion.",
  },
];

const FeaturedCourses = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            ✨ Learning Experience
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Why Students
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Love Us
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-center text-gray-400 mt-6 text-base sm:text-lg leading-8">
          Everything you need to learn modern skills, build projects,
          earn certificates, and grow your career.
        </p>

        {/* Slider */}
        <div className="mt-16">

          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            spaceBetween={24}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >

            {features.map((feature, index) => (
              <SwiperSlide key={index}>

                <div className="group h-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500">

                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition duration-500">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl font-bold text-center mt-6">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-center mt-4 leading-7">
                    {feature.desc}
                  </p>

                  {/* Accent */}
                  <div className="mt-6 flex justify-center">
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  </div>

                </div>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCourses;
