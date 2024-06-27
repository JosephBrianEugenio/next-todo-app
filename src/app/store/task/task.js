import { HTTP_API } from "@/app/boot/https";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const useTaskStore = () => {
  const [loading, setLoading] = useState(false);

  const [taskList, setTaskList] = useState([]);

  const [deleted, setDeleted] = useState(false);

  const [taskById, setTaskById] = useState([]);

  const createTaskAPI = async (boardId, payload) => {
    setLoading(true);
    try {
      const response = await HTTP_API().post(
        `api/create_task/?id=${boardId}`,
        payload
      );
      console.log("response to create task", response);
      toast.success("Successfully Task Created")
      return { success: true };
    } catch (e) {
      console.error(e);
      setLoading(false);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const getTaskListAPI = async () => {
    setLoading(true);
    try {
      const response = await HTTP_API().get("api/tasks/list/");
      console.log("response sa getTAsk list api", response);
      setTaskList(response.data.data);
      return response;
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const editTaskAPI = async (id, payload) => {
    setLoading(true);
    try {
      const response = await HTTP_API().put(`api/edit_task/?id=${id}`, payload);
      console.log("response edit task", response);
      toast.success("Successfully Task Updated")
      return response;
    } catch (e) {
      console.error(e);
      setLoading(false);
      // toast error
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskByIdAPI = async (id) => {
    setLoading(true);
    try {
      const response = await HTTP_API().delete(`api/delete_task/?id=${id}`);
      setDeleted(true);
      toast.success("Successfully Task Deleted")
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const getTaskByIdAPI = useCallback(async (id) => {
    setLoading(true);
    try {
      console.log("iddddd", id);
      const response = await HTTP_API().get(`api/task/detail/${id}/`);
      console.log("response", response);
      setTaskById(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createTaskAPI,
    getTaskListAPI,
    taskList,
    setTaskById,
    editTaskAPI,
    getTaskByIdAPI,
    deleteTaskByIdAPI,
    taskById,
    loading,
  };
};

export default useTaskStore;
