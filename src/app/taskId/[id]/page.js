"use client";
import { useState, useEffect } from "react";
import useTaskStore from "@/app/store/task/task";
import { FaEdit, FaArrowLeft, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NavigationBar from "@/app/components/NavigationBar";

const TaskID = ({ params }) => {
  const { getTaskByIdAPI, taskById, loading, editTaskAPI, deleteTaskByIdAPI } = useTaskStore();
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskDueDate, setEditedTaskDueDate] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");
  const [editedTaskIsComplete, setEditedTaskIsComplete] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      getTaskByIdAPI(params.id);
    }
  }, [params.id, getTaskByIdAPI]);

  useEffect(() => {
    if (taskById) {
      setEditedTaskName(taskById.task_name);
      setEditedTaskDescription(taskById.task_description);
      setEditedTaskDueDate(taskById.task_due_date);
      setEditedTaskIsComplete(taskById.task_is_complete);
    }
  }, [taskById]);

  // Toggle edit mode function
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Handle input changes
  const handleTaskNameChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setEditedTaskDescription(e.target.value);
  };

  const handleTaskDueDateChange = (e) => {
    setEditedTaskDueDate(e.target.value);
  };

  const handleTaskIsCompleteChange = () => {
    setEditedTaskIsComplete(!editedTaskIsComplete);
  };

  // Handle form submission for edits
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare payload with edited values
    const payload = {
      task_name: editedTaskName,
      task_description: editedTaskDescription,
      task_due_date: editedTaskDueDate,
      task_is_complete: editedTaskIsComplete,
    };

    try {
      // Call API to update task with edited values
      const response = await editTaskAPI(params.id, payload);
      // Update taskById state with the updated task data from response
      if (response) {
        getTaskByIdAPI(params.id); // Fetch updated task details
        setEditMode(false); // Exit edit mode after successful update
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      // Handle error (e.g., notify user, log error)
    }
  };

  const handleDeleteTask = async () => {
    const result = await deleteTaskByIdAPI(params.id);
    if (result.success) {
      router.push('/home')
    }
  };

  const handleBack = () => {
    setEditMode(false); // Exit edit mode
    router.back(); // Navigate back to previous page
  };

  return (
    <>
    <NavigationBar />
    <div className="max-w-lg mx-auto mt-4 p-6 bg-gray-200 p-4 rounded-lg shadow-md border-2">
      {loading && <p>Loading...</p>}
      {taskById && !editMode && (
        <div>
          <div className="flex justify-between">
            <button
              className="text-indigo-500 font-bold py-2 pr-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBack}
            >
              <FaArrowLeft className="inline-block mr-1" /> Back
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Task Name: {taskById.task_name}
          </h2>
          <p className="text-gray-700 mb-2">
            Description: {taskById.task_description}
          </p>
          <p className="text-gray-700 mb-2">
            Due Date: {taskById.task_due_date || "Not available"}
          </p>
          <p className="text-gray-700 mb-4">
            Status: {taskById.task_is_complete ? "Complete" : "Incomplete"}
          </p>
          <button
            className="bg-indigo-500 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleEditMode}
          >
            <FaEdit className="inline-block mr-1" /> Edit
          </button>
        </div>
      )}
      {taskById && editMode && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Task Name:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={editedTaskName}
                onChange={handleTaskNameChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                value={editedTaskDueDate}
                onChange={handleTaskDueDateChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={editedTaskDescription}
                onChange={handleTaskDescriptionChange}
                required
              />
            </label>
          </div>
          <div className="flex items-center mb-2">
            <label
              htmlFor="taskIsComplete"
              className="text-sm text-gray-700 mr-2"
            >
              Complete:
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="taskIsComplete"
                checked={editedTaskIsComplete}
                onChange={handleTaskIsCompleteChange}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700`}
              ></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                  editedTaskIsComplete ? "transform translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleEditMode}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    </>

  );
};

export default TaskID;
