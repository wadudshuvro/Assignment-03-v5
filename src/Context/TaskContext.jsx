// src/context/TaskContext.jsx
import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import taskReducer from "../reducers/taskReducer"; // Ensure the path is correct based on your file structure

// Create the context
export const TaskContext = createContext();

// Define the initial state for your context
const initialState = {
  tasks: [],
  searchQuery: "",
};

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
