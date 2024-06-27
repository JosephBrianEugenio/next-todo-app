"use client"
import useAuthenticationStore from "../store/authentication/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const NavigationBar = () => {
  const router = useRouter();
  const { logout } = useAuthenticationStore();

  const handleLogout = () => {
    logout();
    router.push('/')    
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <span className="text-white text-lg font-bold">My App</span>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
          <button
              className="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}
            >
              <FaSignOutAlt className="inline-block mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
