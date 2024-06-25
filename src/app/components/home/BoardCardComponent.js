"use client";
import { useState } from "react";
import TaskFormCard from "./TaskForm";

const BoardCardComponent = () => {
  const [hasTask, setHasTask] = useState(true);

  const statusOptions = ["Todo", "Pending", "Done"];

  return (
    <div className="flex gap-3 p-4">
      <div className="flex-none w-64 h-full bg-white p-4 rounded-lg shadow-xl border-2 card">
        <div className="mb-2 text-lg font-medium text-gray-900 border-b-2 border-gray-200">
          Card Title
        </div>

        {/* Draggable card containers */}
        {hasTask ? (
          <div className="draggable-card text-sm text-gray-700 bg-gray-200 p-4 rounded-lg shadow-md border-2 max-w-sm overflow-hidden mb-2">
            <div className="py-4">
              <div className="mb-2 text-lg font-medium text-gray-900">
                The Coldest Sunset
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
              <div className="text-xs text-gray-500 mb-2">Due Date:</div>
              <div className="text-xs text-gray-500">Status: </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-700 bg-gray-200 py-2 px-1 rounded-lg shadow-md border-2 max-w-sm overflow-hidden">
          <TaskFormCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardCardComponent;
