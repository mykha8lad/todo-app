import React, { createContext, useState, useEffect } from 'react';

export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    if (storedProjects) {
      setProjects(storedProjects);
    }
  }, []);
  
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
