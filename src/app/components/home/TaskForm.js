import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useTaskStore from "@/app/store/task/task";
import { useRouter } from "next/navigation";

const TaskFormCard = ({ boardId, setIsFetchTask, isFetchTask }) => {
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  const { createTaskAPI } = useTaskStore();

  const handleAddTaskClick = () => {
    setShowForm(true);
  };
  const handleCancelTaskClick = () => {
    setShowForm(false);
  };
  const handleSwitchChange = (e) => {
    setTaskFormState({
      ...taskFormState,
      task_is_complete: e.target.checked,
    });
  };

  const [taskFormState, setTaskFormState] = useState({
    task_name: "",
    task_due_date: "",
    task_description: "",
    task_is_complete: false,
  });

  const toggleSwitch = () => {
    setTaskFormState((prevState) => ({
      ...prevState,
      task_is_complete: !prevState.task_is_complete,
    }));
  };

  const onHandleSubmitForm = async (event) => {
    event.preventDefault();
    const result = await createTaskAPI(boardId, taskFormState);
    if (result.success) {
      setShowForm(false);
      setIsFetchTask(!isFetchTask);
    }
  };
  return (
    <>
      {!showForm ? (
        <div className="text-center">
          <button
            onClick={handleAddTaskClick}
            className="btn bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add task
          </button>
        </div>
      ) : (
        <form className="py-4 px-1" onSubmit={onHandleSubmitForm}>
          <p className="text-sm text-gray-700 mb-2">Create a task</p>
          <input
            type="text"
            id="taskName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            placeholder="Task name"
            value={taskFormState.task_name}
            onChange={(e) =>
              setTaskFormState({ ...taskFormState, task_name: e.target.value })
            }
          />
          <textarea
            id="taskDesc"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            placeholder="Task Description"
            value={taskFormState.task_description}
            onChange={(e) =>
              setTaskFormState({
                ...taskFormState,
                task_description: e.target.value,
              })
            }
          />
          <input
            type="date"
            id="taskDueDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            value={taskFormState.task_due_date}
            onChange={(e) =>
              setTaskFormState({
                ...taskFormState,
                task_due_date: e.target.value,
              })
            }
          />
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
                checked={taskFormState.task_is_complete}
                onChange={toggleSwitch}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700`}
              ></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                  taskFormState.task_is_complete
                    ? "transform translate-x-full"
                    : ""
                }`}
              ></div>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 mr-2 rounded-lg"
            >
              Add
            </button>
            <button
              type="button"
              className="pt-1"
              onClick={handleCancelTaskClick}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default TaskFormCard;
