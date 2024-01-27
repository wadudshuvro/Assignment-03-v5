// src/components/TaskForm.jsx

import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Context/TaskContext";

const TaskForm = ({ showModal, setShowModal, editingTask, setEditingTask }) => {
  const { dispatch } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({});

  // Effect to prefill form with editing task's data
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setTags(editingTask.tags.join(", ")); // Assuming tags is an array
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setTags("");
      setPriority("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (title === "") validationErrors.title = "*Please fill up this box";
    if (description === "")
      validationErrors.description = "*Please fill up this box";
    if (tags === "")
      validationErrors.tags = "*Please fill up this box with tags";
    if (priority === "") validationErrors.tags = "*Please select a dropdown";

    if (Object.keys(validationErrors).length === 0) {
      const taskData = {
        id: editingTask ? editingTask.id : Date.now(), // Use a unique ID for new tasks or use the editing task's ID
        title,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
        priority,
        isFavorite: editingTask ? editingTask.isFavorite : false, // Preserve favorite status if editing
      };

      if (editingTask) {
        dispatch({
          type: "EDIT_TASK",
          payload: { id: editingTask.id, data: taskData },
        });
      } else {
        dispatch({ type: "ADD_TASK", payload: taskData });
      }

      // Reset the form state
      setTitle("");
      setDescription("");
      setTags("");
      setPriority("");
      setShowModal(false);
      setEditingTask(null); // Reset the editing task state
    } else {
      setErrors(validationErrors);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          {/* Update the form title based on add/edit mode */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="my-2 w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">{errors.title}</p>
            )}

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="my-2 w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}

            <input
              type="text"
              placeholder="Tags (comma separated ex: Python, Java, Ruby.. )"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="my-2 w-full"
            />
            {errors.tags && (
              <p className="text-red-500 text-xs italic">{errors.tags}</p>
            )}

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="my-2 w-full"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingTask ? "Update Task" : "Create New Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  editingTask: PropTypes.object,
  setEditingTask: PropTypes.func.isRequired,
};

export default TaskForm;
