import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

const Dropzone = ({ file, setFile }) => {
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
      transition={{ duration: 0.3 }}
      className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive ? "border-indigo-500 bg-indigo-500/10" : "border-gray-600 hover:border-indigo-500"}`}
      >
        <input {...getInputProps()} />

        <Upload
          size={40}
          className="mx-auto text-indigo-500 mb-4"
        />

        <p className="font-semibold text-lg text-white">
          Drag & Drop Image Here
        </p>

        <p className="text-sm text-gray-400 mt-2">
          or click to upload
        </p>

        <p className="text-xs text-gray-500 mt-2">
          JPG, PNG, WEBP
        </p>
      </div>

      {file && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 shadow-lg"
            />

            <button
              type="button"
              onClick={() => setFile(null)}
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dropzone;
