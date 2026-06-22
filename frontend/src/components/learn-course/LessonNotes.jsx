const LessonNotes = ({ lesson }) => {
  if (!lesson?.notes) return null;

  return (
    <div className="bg-[#08152f] rounded-2xl p-5">
      <h3 className="text-white text-xl font-semibold mb-4">Lesson Notes</h3>
      <p className="text-gray-300 leading-8 whitespace-pre-wrap">{lesson.notes}</p>
    </div>
  );
};

export default LessonNotes;
