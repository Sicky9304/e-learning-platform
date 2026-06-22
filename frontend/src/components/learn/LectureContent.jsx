const LectureContent = ({ lecture }) => {
  return (
    <div className="mt-8 px-6 bg-[#08152f] p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-3">
        {lecture.title}
      </h2>

      <p className="text-gray-300">
        {lecture.content}
      </p>
    </div>
  );
};

export default LectureContent;
