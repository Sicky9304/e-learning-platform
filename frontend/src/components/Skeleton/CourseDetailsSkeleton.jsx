const CourseDetailsSkeleton = () => {
  return (
    <section className="bg-[#020817] min-h-screen py-12 px-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Course Image Skeleton */}
          <div className="h-[450px] rounded-2xl bg-slate-800"></div>

          {/* Course Content Skeleton */}
          <div>
            <div className="h-8 w-32 bg-slate-800 rounded mb-6"></div>

            <div className="h-12 w-full bg-slate-800 rounded mb-4"></div>

            <div className="h-5 w-full bg-slate-800 rounded mb-3"></div>
            <div className="h-5 w-full bg-slate-800 rounded mb-3"></div>
            <div className="h-5 w-3/4 bg-slate-800 rounded mb-8"></div>

            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 rounded-lg bg-slate-800"
                ></div>
              ))}
            </div>

            <div className="h-14 w-40 bg-slate-800 rounded mt-10"></div>
          </div>
        </div>

        {/* Mentor Skeleton */}
        <div className="mt-16 bg-[#08152f] rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 rounded-full bg-slate-800"></div>

            <div className="flex-1">
              <div className="h-8 w-52 bg-slate-800 rounded mb-4"></div>

              <div className="h-5 w-full bg-slate-800 rounded mb-2"></div>

              <div className="h-5 w-3/4 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsSkeleton;
