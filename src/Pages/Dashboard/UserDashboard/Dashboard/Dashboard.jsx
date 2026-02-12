import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex">

      <UserSidebar />

      <div className="flex-1 ml-24">

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome User!</h1>
          <p className="mb-6">This is your dashboard.</p>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
