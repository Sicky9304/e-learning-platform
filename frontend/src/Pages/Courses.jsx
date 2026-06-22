import { useEffect, useState } from 'react';
import { getCourses } from './../api/CourseApi';
import CoursesHero from './../components/courses/CoursesHero';
import SearchBar from './../components/courses/SearchBar';
import CategoryFilter from './../components/courses/CategoryFilter';
import CoursesGrid from './../components/courses/CoursesGrid';
import toast from 'react-hot-toast';
import CourseSkeleton from '../components/Skeleton/CourseSkeleton';
import { useSearchParams } from 'react-router-dom';

const Courses = () => {
  // console.log(getCourses());
  // console.log("Courses Page Render");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(categoryFromUrl || 'All');
  const [loading, setLoading] = useState(true);



  // Load courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();

        setCourses(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Update selected category whenever category changes in URL
  useEffect(() => {
    if (categoryFromUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(decodeURIComponent(categoryFromUrl));
    } else {
      setSelected('All');
    }
  }, [categoryFromUrl]);


  //search courses with matchesSearch
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selected === 'All' || course.category.toLowerCase() === selected.toLowerCase();

    return matchesSearch && matchesCategory;
  });


  return (
    <main className="bg-[#020817] min-h-screen pb-20">
      <CoursesHero />

      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Category Filter */}
        <CategoryFilter
          selected={selected}
          setSelected={setSelected}
        />

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
            {[...Array(8)].map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-4">📚</div>

            <h2 className="text-3xl font-bold text-white">
              No Courses Found
            </h2>

            <p className="text-gray-400 mt-3 max-w-md">
              We couldn't find any courses matching your search.
              Try changing the category or search keyword.
            </p>

            <button
              onClick={() => {
                setSearch('');
                setSelected('All');
              }}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg text-white font-medium transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Courses Grid */
          <CoursesGrid courses={filteredCourses} />
        )}
      </div>
    </main>
  );
}

export default Courses;
