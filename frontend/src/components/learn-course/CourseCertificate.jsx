import { Award, Download } from "lucide-react";

const CourseCertificate = ({ progress }) => {
  if (progress?.percentage !== 100) return null;

  return (
    <div className="bg-[#08152f] border border-green-500/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className="text-green-400" size={28} />
        <h3 className="text-xl font-bold text-white">
          Course Completed 🎉
        </h3>
      </div>

      <p className="text-gray-400 mb-5">
        Congratulations! You have successfully completed this course.
      </p>

      <a
        href="/certificate-template.png"
        download
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white transition"
      >
        <Download size={18} />
        Download Certificate
      </a>
    </div>
  );
};

export default CourseCertificate;
