import React, { createContext, useState } from "react";

export const TaskStatsContext = createContext();

export const TaskStatsProvider = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState(0);

  const incrementCompletedTasks = () => setCompletedTasks((prev) => prev + 1);
  const decrementCompletedTasks = () => setCompletedTasks((prev) => Math.max(0, prev - 1));

  return (
    <TaskStatsContext.Provider
      value={{ completedTasks, incrementCompletedTasks, decrementCompletedTasks }}
    >
      {children}
    </TaskStatsContext.Provider>
  );
};
