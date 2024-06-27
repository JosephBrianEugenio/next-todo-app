import { useEffect, useState } from "react";
import useBoardStore from "@/app/store/board/boardStore";

const EditBoardComponent = ({ boardId, closeModal, setIsFetchTask, isFetchTask }) => {
  const { editBoardAPI } = useBoardStore();
  const [boardData, setBoardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleEditBoard = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    const result = await editBoardAPI(boardId, boardData);
    setIsLoading(false);
    if (result.success) {
      closeModal();
      setIsFetchTask(!isFetchTask);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Edit Board</h2>
        <form onSubmit={handleEditBoard}>
          <label htmlFor="boardName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Board Name
          </label>
          <input
            type="text"
            id="boardName"
            value={boardData.board_name || ''}
            onChange={(e) => setBoardData({ ...boardData, board_name: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBoardComponent;
