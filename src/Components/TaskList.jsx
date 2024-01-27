// src/components/TaskList.jsx

import PropTypes from "prop-types";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

// Define an array of color classes for the tags
const tagColors = [
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
];

// Function to get a random color class for a tag
const getRandomTagColor = () => {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
};

const TaskList = ({ onEditTask }) => {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks, searchQuery, filteredTasks } = state;

  const tasksToDisplay = searchQuery ? filteredTasks : tasks;

  const handleDeleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleToggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  if (tasksToDisplay.length === 0) {
    return <div className="text-white text-center">Task List is empty!</div>;
  }

  return (
    <div className="text-white overflow-auto">
      <table className="table-fixed w-full border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        <thead>
          <tr>
            <th className="py-8">Title</th>
            <th className="py-8">Description</th>
            <th className="py-8">Tags</th>
            <th className="py-8">Priority</th>
            <th className="py-8">Options</th>
          </tr>
        </thead>
        <tbody>
          {tasksToDisplay.map((task) => (
            <tr
              className="border-b border-[#2E3443] [&>td]:align-middle [&>td]:text-center [&>td]:px-4 [&>td]:py-2"
              key={task.id}
            >
              <td>
                <button
                  onClick={() => handleToggleFavorite(task.id)}
                  className={`inline-block text-lg mr-2 ${
                    task.isFavorite ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
                {task.title}
              </td>
              <td className="text-left">{task.description}</td>
              <td>
                <div className="flex flex-wrap gap-2 justify-center">
                  {task.tags.map((tag, idx) => {
                    // Assign a random color class to each tag
                    const tagColorClass = getRandomTagColor();
                    return (
                      <span
                        key={idx}
                        className={`inline-block h-5 whitespace-nowrap rounded-[45px] ${tagColorClass} px-2.5 text-sm capitalize text-[#F4F5F6]`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td>{task.priority}</td>
              <td>
                <button
                  className="text-red-500 mr-2"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
                <button
                  className="text-blue-500"
                  onClick={() => onEditTask(task)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TaskList.propTypes = {
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;
