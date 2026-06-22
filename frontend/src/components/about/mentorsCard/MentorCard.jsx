import { FaGithub, FaLinkedin } from 'react-icons/fa';

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-[#08152f] rounded-xl overflow-hidden border border-slate-700 hover:-translate-y-2 transition">
      <img src={mentor.image} alt={mentor.name} className="w-full h-72 object-cover" />

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white">{mentor.name}</h3>

        <p className="text-indigo-400 mt-2">{mentor.role}</p>

        <p className="text-gray-400 text-sm mt-4 line-clamp-3">{mentor.bio}</p>

        <div className="mt-4">
          <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm text-white">
            {mentor.experience}+ Years Experience
          </span>
        </div>

        <div className="flex gap-4 mt-6">
          {mentor.linkedin && (
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-2xl hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>
          )}

          {mentor.github && (
            <a
              href={mentor.github}
              target="_blank"
              rel="noreferrer"
              className="text-white text-2xl hover:scale-110 transition"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
