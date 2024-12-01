import React, { useState, useContext, useEffect } from 'react';
import { Calendar, Modal, Input, List, Button, Dropdown, Space, DatePicker, Select, Tag } from 'antd';
import { TasksContext } from '../assets/components/TasksContext';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const CalendarForm = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: null,
    tags: [],
    priority: 'Medium',
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  const onSelect = (date) => {
    const current = dayjs();
    const isDateClick = date.isSame(current, 'month') || date.isSame(selectedDate, 'date');
  
    if (isDateClick) {
      setSelectedDate(date.format('YYYY-MM-DD'));
      setIsModalOpen(true);
    }
  };

  const handleAddTask = () => {
    const { title } = newTask;
    if (!title.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newTask],
    }));
    setNewTask({
      title: '',
      description: '',
      dueDate: null,
      tags: [],
      priority: 'Medium',
    });
  };

  const handleDeleteTask = (index) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter((_, i) => i !== index),
    }));
  };

  const handleEditTask = (index, updatedTask) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map((task, i) =>
        i === index ? updatedTask : task
      ),
    }));
  };

  const menuProps = (index) => ({
    items: [
      {
        key: '1',
        label: (
          <span
            onClick={() => {
              const taskToEdit = tasks[selectedDate][index];
              const updatedTask = { ...taskToEdit, title: prompt('Edit title:', taskToEdit.title) || taskToEdit.title };
              handleEditTask(index, updatedTask);
            }}
          >
            Edit
          </span>
        ),
      },
      {
        key: '2',
        label: <span onClick={() => handleDeleteTask(index)}>Delete</span>,
      },
    ],
  });

  const dateCellRender = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    const taskList = tasks[dateString] || [];
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {taskList.map((task, index) => (
          <li
            key={index}
            style={{
              color: '#1890ff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {task.title} <Tag color={task.priority === 'High' ? 'red' : task.priority === 'Low' ? 'green' : 'blue'}>{task.priority}</Tag>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Calendar onSelect={onSelect} dateCellRender={dateCellRender} />
      <Modal
        title={`Tasks for ${selectedDate}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <List
          dataSource={tasks[selectedDate] || []}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Dropdown menu={menuProps(index)}>
                  <Button>
                    <Space>
                    <EllipsisOutlined />
                    </Space>
                  </Button>
                </Dropdown>,
              ]}
            >
              {item.title}
            </List.Item>
          )}
        />
        <Input
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
        />
        <TextArea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
          style={{ marginTop: '10px' }}
        />
        <DatePicker
          placeholder="Due Date"
          value={newTask.dueDate}
          onChange={(date) => setNewTask((prev) => ({ ...prev, dueDate: date }))}
          style={{ marginTop: '10px', width: '100%' }}
        />
        <Select
          mode="tags"
          placeholder="Add Tags"
          value={newTask.tags}
          onChange={(tags) => setNewTask((prev) => ({ ...prev, tags }))}
          style={{ marginTop: '10px', width: '100%' }}
        />
        <Select
          placeholder="Select Priority"
          value={newTask.priority}
          onChange={(priority) => setNewTask((prev) => ({ ...prev, priority }))}
          style={{ marginTop: '10px', width: '100%' }}
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
        <Button
          type="primary"
          onClick={handleAddTask}
          style={{ marginTop: '10px', width: '100%' }}
        >
          Add Task
        </Button>
      </Modal>
    </>
  );
};

export default CalendarForm;
