import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <div>
      {/* Manage Courses*/}
      {/* Manage Mentors */}
      
      <Outlet />
    </div>
  );
}

export default DashboardLayout
