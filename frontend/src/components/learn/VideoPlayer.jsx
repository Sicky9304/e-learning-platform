const VideoPlayer = ({ lecture }) => {
  return (
    <div className="relative z-10 bg-[#08152f] rounded-xl overflow-hidden">
      <iframe
        className="w-full"
        height="500"
        src={lecture.videoUrl}
        title={lecture.title}
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
