const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search courses..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-4 rounded-xl bg-[#08152f] border border-slate-700 text-white outline-none"
    />
  );
};

export default SearchBar;
