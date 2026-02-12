import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Dashboard/UserDashboard/Dashboard/Navbar";
import UserSidebar from "./Pages/Dashboard/UserDashboard/Dashboard/UserSidebar";

const UserLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      
      <UserSidebar />

      <div style={{ 
        marginLeft: "250px", 
        width: "100%" 
      }}>

        <Navbar />

        <div style={{ padding: "30px" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserLayout;
