import { motion } from "framer-motion";

const VideoPlayer = ({ lesson }) => {
  // console.log("Current Lesson =>", lesson);
  if (!lesson) {
    return (
      <div className="bg-[#08152f] rounded-2xl p-8 text-center text-gray-400">
        Select a lesson to start learning
      </div>
    );
  }

  const renderPlayer = () => {
    switch (lesson.videoType) {
      case "youtube": {
        let videoId = "";

        if (lesson.videoUrl.includes("watch?v=")) {
          videoId = lesson.videoUrl.split("watch?v=")[1];
        } else if (lesson.videoUrl.includes("youtu.be/")) {
          videoId = lesson.videoUrl.split("youtu.be/")[1];
        }

        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={lesson.title}
            allowFullScreen
            className="w-full aspect-video rounded-xl"
          />
        );
      }

      case "iframe":
        return (
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            allowFullScreen
            className="w-full aspect-video rounded-xl"
          />
        );

      case "video":
        return (
          <video
            controls
            controlsList="nodownload"
            className="w-full rounded-xl"
          >
            <source
              src={lesson.videoUrl}
              type="video/mp4"
            />
          </video>
        );

      default:
        return (
          <div className="aspect-video flex items-center justify-center bg-slate-900 rounded-xl text-gray-400">
            Video Not Available
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#08152f] rounded-2xl p-5"
    >
      {renderPlayer()}

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-white">
          {lesson.title}
        </h2>

        <p className="text-indigo-400 mt-2">
          Duration: {lesson.duration}
        </p>

        {lesson.description && (
          <p className="text-gray-400 leading-7 mt-4">
            {lesson.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
