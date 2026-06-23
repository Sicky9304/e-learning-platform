const CoursesHero = () => {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6">

      {/* Background Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs sm:text-sm text-gray-300">
            100+ Premium Courses Available
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
          <span className="text-white">
            Master The Skills
          </span>

          <br />

          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            That Shape The Future
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-sm sm:text-base md:text-lg leading-7">
          Learn from industry experts, build real-world projects, earn
          certificates, and accelerate your career with modern technology
          courses designed for students, developers, and professionals.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
            <h3 className="text-white text-2xl font-bold">100+</h3>
            <p className="text-gray-400 text-sm">Courses</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
            <h3 className="text-white text-2xl font-bold">50K+</h3>
            <p className="text-gray-400 text-sm">Students</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
            <h3 className="text-white text-2xl font-bold">4.9★</h3>
            <p className="text-gray-400 text-sm">Rating</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoursesHero;
