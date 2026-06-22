import { useEffect, useState } from 'react';
import { getCategoryCount } from '../../api/CourseApi';
import categoryIcons from '../data/categoryIcons';
import { FaCode } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryCount();
      // console.log(response.data);
      // console.log(typeof response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Faild to load Categories');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  return (
    <section className="py-20 px-6 bg-[#052c73]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold text-white">Top Categories</h2>

        <p className="text-center text-gray-300 mt-3">Explore our popular categories</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
          {categories?.map((item) => {
            const Icon = categoryIcons[item._id] || FaCode;

            return (
              <div
                key={item._id}
                className="bg-[#143d82] rounded-xl p-8 text-center hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-white mx-auto flex items-center justify-center text-indigo-600 text-xl">
                  <Icon />
                </div>

                <h3 className="text-white font-semibold mt-5">{item._id}</h3>

                <p className="text-gray-300 text-sm mt-2">{item.totalCourses} Courses</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
