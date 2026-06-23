import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "DevVer R",
    role: "Business Course",
    rating: 5,
    review:
      "This platform helped me switch my career within 6 months. The structured lessons and practical projects made learning simple and effective.",
  },
  {
    name: "Tony Chester",
    role: "Photography Course",
    rating: 5,
    review:
      "The best online learning experience I've ever had. Clear content, supportive mentors, and real-world skills.",
  },
  {
    name: "Sarah Wilson",
    role: "Frontend Development",
    rating: 5,
    review:
      "The React and JavaScript courses completely transformed my development skills and confidence.",
  },
  {
    name: "Michael Brown",
    role: "Digital Marketing",
    rating: 5,
    review:
      "Amazing instructors and practical content. I started getting freelance projects after completing the course.",
  },
  {
    name: "Emily Johnson",
    role: "UI/UX Design",
    rating: 5,
    review:
      "Beautiful course structure, hands-on projects, and very supportive mentors throughout the journey.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            ⭐ Student Success Stories
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          What Our
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Students Say
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-center text-gray-400 mt-6 text-base sm:text-lg leading-8">
          Thousands of learners trust our platform to gain practical skills,
          advance their careers, and achieve their goals.
        </p>

        {/* Slider */}
        <div className="mt-16">

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >

            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>

                <div className="group h-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500">

                  {/* Quote */}
                  <FaQuoteLeft className="text-indigo-400 text-3xl" />

                  {/* Stars */}
                  <div className="flex gap-1 mt-5">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-300 mt-5 leading-8">
                    "{item.review}"
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4 mt-8">

                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 10}`}
                      alt={item.name}
                      className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover"
                    />

                    <div>
                      <h4 className="text-white font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-gray-400 text-sm">
                        {item.role}
                      </p>
                    </div>

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

export default Testimonials;
