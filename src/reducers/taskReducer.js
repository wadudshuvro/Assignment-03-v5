// src/reducers/taskReducer.js

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      // Assuming each task has a unique id when being added
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "EDIT_TASK": {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload.data };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };
    }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "DELETE_ALL_TASKS":
      return { ...state, tasks: [] };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isFavorite: !task.isFavorite }
            : task
        ),
      };

    case "SEARCH_TASKS": {
      // Now includes a searchQuery state property
      // Also, does not alter the original tasks array
      const searchQuery = action.payload.toLowerCase();
      return {
        ...state,
        searchQuery: action.payload, // Store the current search query
        filteredTasks:
          searchQuery === ""
            ? state.tasks // If the search query is empty, show all tasks
            : state.tasks.filter(
                (
                  task // Otherwise, filter the tasks
                ) => task.title.toLowerCase().includes(searchQuery)
              ),
      };
    }

    default:
      return state; // If none of the actions matched, return the existing state
  }
};

export default taskReducer;
