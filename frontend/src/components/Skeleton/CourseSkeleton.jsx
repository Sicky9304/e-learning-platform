const CourseSkeleton = () => {
  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-700" />

      <div className="p-4">
        <div className="h-4 w-20 bg-slate-700 rounded mb-3" />

        <div className="h-6 bg-slate-700 rounded mb-3" />

        <div className="h-4 bg-slate-700 rounded mb-2" />

        <div className="h-4 bg-slate-700 rounded mb-2" />

        <div className="h-4 w-3/4 bg-slate-700 rounded mb-4" />

        <div className="h-8 w-28 bg-slate-700 rounded" />
      </div>
    </div>
  );
};

export default CourseSkeleton;
