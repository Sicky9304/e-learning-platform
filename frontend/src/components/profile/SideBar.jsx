import { Link } from "react-router-dom";

const SideBar = ({ user }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl h-fit lg:sticky lg:top-24">

      {/* Avatar */}
      <div className="text-center">
        <img
          src={
            user?.avatar?.url ||
            `https://ui-avatars.com/api/?name=${user?.name}`
          }
          alt={user?.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-xl mx-auto"
        />

        <h2 className="mt-4 text-3xl font-bold text-white">
          {user?.name}
        </h2>

        <p className="text-gray-400 mt-2 break-all">
          {user?.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Courses</p>
          <p className="text-indigo-400 text-2xl font-bold">
            {user?.enrolledCourses?.length || 0}
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Role</p>
          <p className="text-green-400 font-semibold capitalize">
            {user?.role}
          </p>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="mt-6 bg-gray-900 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">
          Learning Stats
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Enrolled Courses</span>
            <span className="text-indigo-400 font-semibold">
              {user?.enrolledCourses?.length || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Completed</span>
            <span className="text-green-400 font-semibold">0</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Certificates</span>
            <span className="text-yellow-400 font-semibold">0</span>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="mt-6 bg-gray-900 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">
          Account Info
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 font-medium">
              Active
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Joined</span>
            <span className="text-white">
              {new Date(user?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-4">
          Quick Actions
        </h3>

        <div className="space-y-3">
          <Link
            to="/my-courses"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-xl transition"
          >
            My Courses
          </Link>

          <Link
            to="/courses"
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-xl transition"
          >
            Browse Courses
          </Link>
        </div>
      </div>

    </div>
  );
};

export default SideBar;
