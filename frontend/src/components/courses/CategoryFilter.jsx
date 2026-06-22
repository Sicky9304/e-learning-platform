const categories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Full Stack',
  'Design',
  'Business',
  'Marketing',
];

const CategoryFilter = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-5 py-2 rounded-lg transition
            ${selected === category ? 'bg-indigo-600 text-white' : 'bg-[#08152f] text-gray-300'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
