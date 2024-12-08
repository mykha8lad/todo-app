import React, { useState, useEffect, useContext } from 'react';
import {
  List,
  Tag,
  Button,
  Typography,
  Divider,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Modal,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ProjectsContext } from '../assets/components/ProjectsContext';
import dayjs from 'dayjs';

const { Text, Title } = Typography;
const { Option } = Select;

const Projects = () => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tasks: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    tags: [],
    dueDate: null,
    completed: false,
  });
  
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
  
  const handleAddProject = () => {
    if (!newProject.title.trim()) return;

    if (editingProjectIndex !== null) {      
      const updatedProjects = [...projects];
      updatedProjects[editingProjectIndex] = newProject;
      setProjects(updatedProjects);
      setEditingProjectIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }
    
    setNewProject({ title: '', description: '', tasks: [] });
    setIsModalOpen(false);
  };
  
  const handleDeleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };
  
  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    setNewProject((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));

    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      tags: [],
      dueDate: null,
      completed: false,
    });
  };
  
  const handleDeleteTask = (projectIndex, taskIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].tasks = updatedProjects[projectIndex].tasks.filter(
      (_, i) => i !== taskIndex
    );
    setProjects(updatedProjects);
  };
  
  const handleEditProject = (index) => {
    setEditingProjectIndex(index);
    setNewProject(projects[index]);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <Title style={{ marginTop: '0px' }}>Projects</Title>      
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setIsModalOpen(true);
          setNewProject({ title: '', description: '', tasks: [] });
        }}
        style={{
          marginBottom: '24px',
          padding: '10px 20px',
          background: 'linear-gradient(45deg, #28a745, #32cd32)',
          border: 'none',
        }}
      >
        Create Project
      </Button>      
      <List
        itemLayout="vertical"
        size="large"
        dataSource={projects}
        renderItem={(project, index) => (
          <List.Item
            key={index}
            actions={[
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEditProject(index)}
              >
                Edit
              </Button>,
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteProject(index)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<Title level={4}>{project.title}</Title>}
              description={project.description}
            />            
            <Divider orientation="left">Tasks</Divider>
            <List
              size="small"
              bordered
              dataSource={project.tasks}
              renderItem={(task, taskIndex) => (
                <List.Item
                  key={taskIndex}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ flex: 1 }}>
                    <Text strong>{task.title}</Text> - {task.description}
                    <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
                    {task.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={task.completed}
                      onChange={(e) => {
                        const updatedTasks = [...project.tasks];
                        updatedTasks[taskIndex].completed = e.target.checked;
                        const updatedProjects = [...projects];
                        updatedProjects[index].tasks = updatedTasks;
                        setProjects(updatedProjects);
                      }}
                    />
                    <Button
  type="link"
  danger
  icon={<DeleteOutlined />}
  onClick={() => handleDeleteTask(index, taskIndex)}
  style={{ marginLeft: '8px' }}
>
                      Delete Task
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </List.Item>
        )}
      />      
      <Modal
        title={editingProjectIndex !== null ? 'Edit Project' : 'Create Project'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Input
          placeholder="Project Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ marginBottom: '8px' }}
        />
        <Input.TextArea
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ marginBottom: '8px' }}
        />
        <Divider>Add Task to Project</Divider>
        <Input
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ marginBottom: '8px' }}
        />
        <Input
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ marginBottom: '8px' }}
        />
        <DatePicker
          placeholder="Select Due Date"
          value={newTask.dueDate}
          onChange={(date) =>
            setNewTask((prev) => ({ ...prev, dueDate: date }))
          }
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <Select
          placeholder="Select Priority"
          value={newTask.priority}
          onChange={(priority) =>
            setNewTask((prev) => ({ ...prev, priority }))
          }
          style={{ marginBottom: '8px', width: '100%' }}
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
        <Select
          mode="tags"
          placeholder="Add Tags"
          value={newTask.tags}
          onChange={(tags) =>
            setNewTask((prev) => ({ ...prev, tags }))
          }
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <Button
          type="dashed"
          onClick={handleAddTask}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          Add Task
        </Button>
        <Button
          type="primary"
          onClick={handleAddProject}
          style={{ width: '100%' }}
        >
          {editingProjectIndex !== null ? 'Save Changes' : 'Create Project'}
        </Button>
      </Modal>
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'blue';
    case 'Low':
      return 'green';
    default:
      return 'gray';
  }
};

export default Projects;