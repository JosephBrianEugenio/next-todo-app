"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BoardCardComponent from "@/app/components/home/BoardCardComponent";
import useBoardStore from "@/app/store/board/boardStore";
import useTaskStore from "@/app/store/task/task";
import NavigationBar from "@/app/components/NavigationBar";


const HomePage = () => {
  const { createBoardAPI, getBoardListAPI, boardList, loading: boardLoading } =
    useBoardStore();

  const { getTaskListAPI, taskList, loading: taskLoading } = useTaskStore();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [isFetchTask, setIsFetchTask] = useState(false);

  useEffect(() => {
    getBoardListAPI();
    getTaskListAPI();
  }, [isFetchTask]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await createBoardAPI({ board_name: taskName });
    setIsLoading(false);
    if (result.success) {
      getBoardListAPI();
      setTaskName(""); // Clear input field
    }
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="container flex justify-center items-center">
        <form
          className="bg-white p-4 rounded-lg w-full max-w-md"
          onSubmit={onHandleSubmit}
        >
          <label
            htmlFor="categoryName"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter your Category Board
          </label>
          <input
            type="text"
            id="categoryName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="e.g., Work, Personal, Shopping"
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="text-end">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg"
            >
              Add your category
            </button>
          </div>
        </form>
      </div>
      <div className="container h-screen w-full mx-4">
        <BoardCardComponent
          boardList={boardList}
          loading={boardLoading || taskLoading}
          taskList={taskList}
          setIsFetchTask = {setIsFetchTask}
          isFetchTask = {isFetchTask}
        />
      </div>
    </>
  );
};

export default HomePage;
