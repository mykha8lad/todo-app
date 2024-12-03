import React, { createContext, useState, useEffect } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : {};
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);


  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
