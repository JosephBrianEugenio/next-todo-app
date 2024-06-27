import { useEffect } from "react";
import { useRouter } from "next/router";

const EditTaskComponent = ({ taskId, closeEditTaskModal }) => {
  const router = useRouter();

  useEffect(() => {
    // Fetch task details or perform actions based on taskId
    // For example:
    console.log("Editing task with ID:", taskId);
    // You can use router.query to access query params
  }, [taskId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Edit Task
        </h2>
        {/* Your edit form or content here */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={closeEditTaskModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditTaskComponent;
