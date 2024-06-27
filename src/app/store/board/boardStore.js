import { useState, useCallback } from "react";
import { HTTP_API } from "@/app/boot/https";
import { toast } from "react-toastify";

const useBoardStore = () => {


  const [boardList, setBoardList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const createBoardAPI = async (payload) => {
    try {
      const response = await HTTP_API().post("api/create_board/", payload);
      console.log("response create", response)
      if(response.status === 201) {
        toast.success("Board Created Successfully");
        return { success: true };
      }
    } catch (e) {
      console.error(e);
      toast.error("There's something wrong...");
      return { success: false };
    }
  };

  const getBoardListAPI = async () => {
    setLoading(true);
    try {
      const response = await HTTP_API().get("api/boards/list/");
      setBoardList(response.data.data)
    } catch (e) {
      // 
    } finally {
      setLoading(false);
    }
  };

  const editBoardAPI = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await HTTP_API().put(
        `api/edit_board/?id=${id}`,
        updatedData
      );
      console.log("response," , response)
      toast.success(response?.message || "Successfully updated Board");
      return { success: true };
    } catch (e) {
      console.error(e);
      setLoading(false);
      toast.error("There's something wrong...");
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const deleteBoardByIdAPI = async (id) => {
    setLoading(true);
    try {
      const response = await HTTP_API().delete(`api/delete_board/?id=${id}`);
      setDeleted(true);
      toast.success("Successfully deleted Board");
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    createBoardAPI,
    getBoardListAPI,
    boardList,
    editBoardAPI,
    deleteBoardByIdAPI,
    loading
  };
};

export default useBoardStore;
