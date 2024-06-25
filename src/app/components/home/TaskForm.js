import { useState } from "react";

const TaskFormCard = () => {
  const [showForm, setShowForm] = useState(false);
  const statusOptions = ["Todo", "Pending", "Done"];

  const handleAddTaskClick = () => {
    setShowForm(true);
  };
  const handleCancelTaskClick = () => {
    setShowForm(false);
  };
  const onHandleSubmitForm = (event) => {
    event.preventDefault();
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
          />
          <textarea
            id="taskDesc"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            placeholder="Task Description"
          />
          <input
            type="date"
            id="taskDueDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          />
          <select
            id="status"
            name="status"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
