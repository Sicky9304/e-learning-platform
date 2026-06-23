import { useEffect, useState } from "react";
import { getCategoryCount } from "../../api/CourseApi";
import categoryIcons from "../data/categoryIcons";
import { FaCode } from "react-icons/fa";
import { toast } from "react-hot-toast";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryCount();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            🚀 Explore Learning Paths
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Top
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Categories
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-center text-gray-400 mt-6 text-base sm:text-lg leading-8">
          Discover the most popular categories chosen by thousands of
          learners and start building real-world skills today.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-16">

          {categories?.map((item) => {
            const Icon = categoryIcons[item._id] || FaCode;

            return (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500"
              >

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition duration-500">
                  <Icon />
                </div>

                {/* Category Name */}
                <h3 className="relative text-center text-white font-bold text-lg mt-6">
                  {item._id}
                </h3>

                {/* Course Count */}
                <p className="relative text-center text-gray-400 mt-2">
                  {item.totalCourses} Courses
                </p>

                {/* Bottom Line */}
                <div className="relative mt-5 flex justify-center">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default TopCategories;
