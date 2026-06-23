const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Full Stack",
  "Design",
  "Business",
  "Marketing",
];

const CategoryFilter = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`relative px-5 sm:px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 backdrop-blur-md border
          ${selected === category
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/30 scale-105"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-indigo-500/30"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
