// src/components/TaskSection.jsx

import { useContext, useState } from "react";
import { TaskContext } from "../Context/TaskContext";

import SearchBar from "./SearchBar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskSection = () => {
  const { dispatch } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTaskClick = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteAll = () => {
    dispatch({ type: "DELETE_ALL_TASKS" });
  };

  return (
    <div className="border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-5 md:py-12">
      {/* Row for header and search/actions */}
      <div className="flex flex-wrap items-center justify-between mb-4 md:mb-8">
        {/* "Your Tasks" title section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white">Your Tasks</h2>
        </div>

        {/* Search and Action Buttons section */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <SearchBar />
          <button
            className="rounded-md text-white bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={handleAddTaskClick}
          >
            Add Task
          </button>
          <button
            className="rounded-md text-white bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      </div>

      <TaskList onEditTask={handleEditTask} />

      {showModal && (
        <TaskForm
          showModal={showModal}
          setShowModal={setShowModal}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
      )}
    </div>
  );
};

export default TaskSection;
