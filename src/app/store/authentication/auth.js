import { HTTP_WEB } from "@/app/boot/https";
import { toast } from "react-toastify";

const useAuthenticationStore = () => {
  const registerAPI = async (payload) => {
    try {
      const response = await HTTP_WEB().post("api/create_user/", payload);
      if (response.status === 201) {
        toast.success("Account Created Successfully");
        return { success: true };
      }
      return response;
    } catch (e) {
      console.error(e.response.data);
      toast.error(
        e?.response.data.username ||
          e?.response.data.email ||
          "There's something wrong..."
      );
      return { success: false };
    }
  };

  const userLoginAPI = async (payload) => {
    try {
      const response = await HTTP_WEB().post("api/login_user/", payload);
      if (response?.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        toast.success(response?.data.message || "There's something wrong...");
        return { success: true };
      }
    } catch (e) {
      toast.error(e?.response.data.error || "There's something wrong...");
      return { success: false };
    }
  };

  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("access_token");
    return accessToken ? true : false;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
  }

  return {
    registerAPI,
    userLoginAPI,
    isAuthenticated,
    logout
  };
};

export default useAuthenticationStore;
