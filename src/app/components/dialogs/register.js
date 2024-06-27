import { useState } from "react";
import useAuthenticationStore from "@/app/store/authentication/auth"
const RegisterDialog = ({ isOpen, onClose }) => {
  
    if (!isOpen) return null;

    const [registerFormState, setRegisterFormState] = useState({
      username: "",
      email: "",
      password: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const {registerAPI} = useAuthenticationStore();

    const onHandleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const result = await registerAPI(registerFormState);
      setIsLoading(false);
      if (result.success) {
        onClose(); 
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={onHandleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your Name"
                required
                value={registerFormState.username}
                onChange={(e) => setRegisterFormState({...registerFormState, username: e.target.value})}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="user@email.com"
                required
                value={registerFormState.email}
                onChange={(e) => setRegisterFormState({...registerFormState, email: e.target.value})}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="*****"
                required
                value={registerFormState.password}
                onChange={(e) => setRegisterFormState({...registerFormState, password: e.target.value})}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
            <button
              type="button"
              className="mt-2 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default RegisterDialog;
  