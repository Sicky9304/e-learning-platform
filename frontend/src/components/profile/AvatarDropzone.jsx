import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

const Dropzone = ({ file, setFile,currentAvatar }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      },
      onDrop,
    });

  const preview = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#08152f] border border-slate-700 rounded-3xl overflow-hidden shadow-xl"
    >

      {/* Header */}
      <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">

          <div className="relative">

            <img
              src={
                preview ||
                currentAvatar ||
                "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#08152f] shadow-2xl"
            />

            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
              >
                <X size={14} />
              </button>
            )}

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="pt-20 p-6">

        <div className="text-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Profile Picture
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Upload a professional profile image.
          </p>

        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-slate-600 hover:border-indigo-500 hover:bg-slate-800/50"
            }`}
        >

          <input {...getInputProps()} />

          <Upload
            size={42}
            className="mx-auto text-indigo-500 mb-4"
          />

          <p className="text-white font-semibold text-lg">
            Drag & Drop Image Here
          </p>

          <p className="text-gray-400 mt-2">
            or click to upload
          </p>

          <p className="text-xs text-gray-500 mt-3">
            JPG, PNG, WEBP • Max 5MB
          </p>

        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mt-6">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-gray-400 text-xs">
              Format
            </p>

            <h4 className="text-white font-semibold mt-1">
              JPG / PNG
            </h4>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-gray-400 text-xs">
              Recommended
            </p>

            <h4 className="text-white font-semibold mt-1">
              500 x 500
            </h4>
          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default Dropzone;
