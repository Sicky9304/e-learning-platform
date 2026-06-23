import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full group">
      <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" />

      <input
        type="text"
        placeholder="Search courses, mentors, technologies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-14 sm:h-16 pl-14 pr-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
      />

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
