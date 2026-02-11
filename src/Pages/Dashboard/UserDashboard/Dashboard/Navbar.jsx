import { SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-16 flex items-center justify-end px-6 shadow-md">
      <h2 className="text-xl font-bold text-white mr-6">Hello, User</h2>
      <SignOutButton redirectUrl="/login">
        <button
          className="bg-white text-blue-700 font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </SignOutButton>
    </div>
  );
};

export default Navbar;
