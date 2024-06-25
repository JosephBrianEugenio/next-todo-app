import BoardCardComponent from "@/app/components/home/BoardCardComponent";
const HomePage = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Create your task</h1>
      </header>
      <div className="container flex justify-center items-center ">
        <form className="bg-white p-4 rounded-lg w-full max-w-md">
          <label
            htmlFor="categoryName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter your Category Board
          </label>
          <input
            type="text"
            id="categoryName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="e.g., Work, Personal, Shopping"
            required
          />
          <div className="text-end">
            <button
              type="submit"
              className=" bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg"
            >
              Add your category
            </button>
          </div>
        </form>
      </div>
      <div className="container h-screen w-full mx-4">
        <BoardCardComponent />
      </div>
    </>
  );
};

export default HomePage;
