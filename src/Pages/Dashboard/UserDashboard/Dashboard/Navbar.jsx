import { SignOutButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {

  const {user} = useUser();
  const firstName= user.firstName

  return (
    <div style={{
        height: "75px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 12px",
        background: "linear-gradient(135deg, #71b7e6 0%, #9b59b6 100%)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
      <h2 style={{
          color: "white",
          fontSize:"30px",
          fontWeight: "750",
          marginRight: "20px"
        }}>Hello, {firstName}</h2>

      <SignOutButton redirectUrl="/login">
        <button
          style={{
            backgroundColor: "white",
            color: "#9b59b6",
            fontWeight: "600",
            padding: "6px 30px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            
            fontSize:"24px",
          }}
        >
          Logout
        </button>
      </SignOutButton>
    </div>
  );
};

export default Navbar;
