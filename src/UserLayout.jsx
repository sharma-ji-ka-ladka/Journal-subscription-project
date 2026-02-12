import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Dashboard/UserDashboard/Dashboard/Navbar";
import UserSidebar from "./Pages/Dashboard/UserDashboard/Dashboard/UserSidebar";

const UserLayout = () => {
  return (
    <div style={{ display: "flex" }}>

      <UserSidebar />

      <div style={{
        marginLeft: "360px",
        width: "calc(100% - 360px)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>

        <Navbar />

        <div style={{
          padding: "30px",
          flex: 1,
          backgroundColor: "#f4f6f9"
        }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserLayout;
