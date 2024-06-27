import { useState, useEffect } from "react";
import TaskFormCard from "./TaskForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import useBoardStore from "@/app/store/board/boardStore";
import { useRouter } from "next/navigation";
import useTaskStore from "@/app/store/task/task";
import EditBoardComponent from "./EditBoardComponent";

const BoardCardComponent = ({ boardList, loading, taskList, setIsFetchTask, isFetchTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const router = useRouter();

  const { deleteBoardByIdAPI } = useBoardStore();
  const { deleteTaskByIdAPI } = useTaskStore();

  const handleDeleteBoard = async (id) => {
    const result = await deleteBoardByIdAPI(id);
    if (result.success) {
      setIsFetchTask(!isFetchTask)
    }
  };

  const handleDeleteTask = async (id) => {
    const result = await deleteTaskByIdAPI(id);
    if (result.success) {
      setIsFetchTask(!isFetchTask)
    }
  };

  const openModal = (id) => {
    setCurrentBoardId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBoardId(null);
    setIsModalOpen(false);
  };

  const openTaskById = (taskId) => {
    router.push(`/taskId/${taskId}`);
  };

  return (
    <div className="flex flex-wrap gap-3 p-4">
      {boardList.map((board) => (
        <div
          key={board.id}
          className="flex-none w-full sm:w-64 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full bg-white p-4 rounded-lg shadow-xl border-2 board_card"
        >
          <div className="mb-2 flex items-center justify-between text-lg font-medium text-gray-900 border-b-2 border-gray-200">
            <span>{board.board_name}</span>
            <div className="flex items-center space-x-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => openModal(board.id)}
              >
                <FaEdit />
              </button>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleDeleteBoard(board.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {taskList
            .filter((task) => task.board_id === board.id)
            .map((task) => (
              <div
                key={task.id}
                className="draggable-card text-sm text-gray-700 bg-gray-200 p-4 rounded-lg shadow-md border-2 max-w-sm overflow-hidden mb-2"
              >
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-500 hover:text-gray-700 edit_task_button"
                    onClick={() => openTaskById(task.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
                <div>
                  <div className="mb-2 text-lg font-medium text-gray-900">
                    {task.task_name}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {task.task_description}
                  </p>
                  <div className="text-xs text-gray-500 mb-2">
                    Due Date: {task.task_due_date}
                  </div>
                  <div className="text-xs text-gray-500">
                    Status: {task.task_is_complete ? "Complete" : "Incomplete"}
                  </div>
                </div>
              </div>
            ))}
          <div className="text-sm text-gray-700 bg-gray-200 py-2 px-1 rounded-lg shadow-md border-2 max-w-sm overflow-hidden">
            <TaskFormCard boardId={board.id} setIsFetchTask={setIsFetchTask} isFetchTask={isFetchTask} />
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <EditBoardComponent
            boardId={currentBoardId}
            closeModal={closeModal}
            setIsFetchTask={setIsFetchTask}
            isFetchTask={isFetchTask}
          />
        </div>
      )}
    </div>
  );
};

export default BoardCardComponent;
