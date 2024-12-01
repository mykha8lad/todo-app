// import React, { useContext, useState } from 'react';
// import { List, Tag, Button, Space, Tooltip, Typography, Divider, Input, Select, DatePicker } from 'antd';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// import { TasksContext } from '../assets/components/TasksContext';
// import dayjs from 'dayjs';

// const { Text, Title } = Typography;
// const { Option } = Select;

// const TaskList = () => {
//   const { tasks, setTasks } = useContext(TasksContext);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     priority: 'Medium',
//     tags: [],
//     dueDate: null,
//   });
//   const [isAdding, setIsAdding] = useState(false); // Указывает, открыта ли форма добавления задачи.

//   // Обработчик добавления задачи
//   const handleAddTask = () => {
//     const { title, dueDate } = newTask;
//     if (!title.trim() || !dueDate) return; // Проверяем, что введены заголовок и дата.

//     const dateKey = dayjs(dueDate).format('YYYY-MM-DD'); // Преобразуем дату в ключ.

//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [dateKey]: [...(prevTasks[dateKey] || []), newTask], // Добавляем задачу к выбранной дате.
//     }));

//     // Сбрасываем форму добавления задачи
//     setNewTask({
//       title: '',
//       description: '',
//       priority: 'Medium',
//       tags: [],
//       dueDate: null,
//     });
//     setIsAdding(false); // Закрываем форму.
//   };

//   // Обработчик удаления задачи
//   const handleDelete = (task, date) => {
//     const { index } = task;
//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [date]: prevTasks[date].filter((_, i) => i !== index),
//     }));
//   };

//   // Обработчик редактирования задачи
//   const handleEdit = (task, date) => {
//     const updatedTitle = prompt('Edit task title:', task.title) || task.title;
//     const updatedDescription =
//       prompt('Edit task description:', task.description) || task.description;

//     const { index } = task;
//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [date]: prevTasks[date].map((t, i) =>
//         i === index
//           ? { ...t, title: updatedTitle, description: updatedDescription }
//           : t
//       ),
//     }));
//   };

//   return (
//     <>
//       <h1 style={{ marginTop: '0' }}>All tasks</h1>

//       {/* Форма добавления задачи */}
//       {isAdding && (
//         <div style={{ marginBottom: '24px' }}>
//           <Divider orientation="center">
//             <Title level={5} style={{ marginBottom: 0 }}>
//               Add New Task
//             </Title>
//           </Divider>
//           <Input
//             placeholder="Task Title"
//             value={newTask.title}
//             onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
//             style={{ marginBottom: '8px' }}
//           />
//           <Input
//             placeholder="Task Description"
//             value={newTask.description}
//             onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
//             style={{ marginBottom: '8px' }}
//           />
//           <DatePicker
//             placeholder="Select Date"
//             value={newTask.dueDate}
//             onChange={(date) => setNewTask((prev) => ({ ...prev, dueDate: date }))}
//             style={{ marginBottom: '8px', width: '100%' }}
//           />
//           <Select
//             placeholder="Select Priority"
//             value={newTask.priority}
//             onChange={(priority) => setNewTask((prev) => ({ ...prev, priority }))}
//             style={{ marginBottom: '8px', width: '100%' }}
//           >
//             <Option value="High">High</Option>
//             <Option value="Medium">Medium</Option>
//             <Option value="Low">Low</Option>
//           </Select>
//           <Select
//             mode="tags"
//             placeholder="Add Tags"
//             value={newTask.tags}
//             onChange={(tags) => setNewTask((prev) => ({ ...prev, tags }))}
//             style={{ marginBottom: '8px', width: '100%' }}
//           />
//           <Button type="primary" onClick={handleAddTask} style={{ width: '100%' }}>
//             Add Task
//           </Button>
//         </div>
//       )}

//       {/* Кнопка добавления задачи */}
//       {!isAdding && (
//         <Button
//           type="dashed"
//           icon={<PlusOutlined />}
//           onClick={() => setIsAdding(true)}
//           style={{ marginBottom: '24px', width: '100%' }}
//         >
//           Add Task
//         </Button>
//       )}

//       {/* Список задач по группам дат */}
//       {Object.entries(tasks)
//   .filter(([date, taskList]) => taskList.length > 0) // Показываем только те даты, у которых есть задачи
//   .map(([date, taskList]) => (
//     <div key={date} style={{ marginBottom: '24px' }}>
//       <Divider orientation="center">
//         <Title level={5} style={{ marginBottom: 0 }}>
//           Tasks for {date}
//         </Title>
//       </Divider>
//       <List
//         size="large"
//         bordered
//         dataSource={taskList}
//         renderItem={(task, index) => (
//           <List.Item
//             actions={[
//               <Tooltip title="Edit Task" key="edit">
//                 <Button
//                   type="link"
//                   icon={<EditOutlined />}
//                   onClick={() => handleEdit(task, date)}
//                 />
//               </Tooltip>,
//               <Tooltip title="Delete Task" key="delete">
//                 <Button
//                   type="link"
//                   danger
//                   icon={<DeleteOutlined />}
//                   onClick={() => handleDelete({ ...task, index }, date)}
//                 />
//               </Tooltip>,
//             ]}
//           >
//             <Space direction="vertical" style={{ width: '100%' }}>
//               <Title level={5} style={{ margin: '0' }}>
//                 {task.title}
//               </Title>
//               <Text type="secondary">{task.description}</Text>
//               <div>
//                 <Text strong>Priority:</Text>{' '}
//                 <Tag color={getPriorityColor(task.priority)}>
//                   {task.priority}
//                 </Tag>
//               </div>
//               <div>
//                 {task.tags.map((tag, tagIndex) => (
//                   <Tag color="blue" key={tagIndex}>
//                     {tag}
//                   </Tag>
//                 ))}
//               </div>
//             </Space>
//           </List.Item>
//         )}
//       />
//     </div>
//   ))}
//     </>
//   );
// };

// // Функция для получения цвета для уровня приоритета
// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case 'High':
//       return 'red';
//     case 'Medium':
//       return 'blue';
//     case 'Low':
//       return 'green';
//     default:
//       return 'gray';
//   }
// };

// export default TaskList;


import React, { useContext, useState } from 'react';
import { List, Tag, Button, Space, Tooltip, Typography, Divider, Input, Select, DatePicker, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TasksContext } from '../assets/components/TasksContext';
import dayjs from 'dayjs';

const { Text, Title } = Typography;
const { Option } = Select;

const TaskList = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    tags: [],
    dueDate: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Обработчик добавления задачи
  const handleAddTask = () => {
    const { title, dueDate } = newTask;
    if (!title.trim() || !dueDate) return; // Проверяем, что введены заголовок и дата.

    const dateKey = dayjs(dueDate).format('YYYY-MM-DD'); // Преобразуем дату в ключ.

    setTasks((prevTasks) => ({
      ...prevTasks,
      [dateKey]: [...(prevTasks[dateKey] || []), newTask], // Добавляем задачу к выбранной дате.
    }));

    // Сбрасываем форму добавления задачи
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      tags: [],
      dueDate: null,
    });
    setIsModalOpen(false); // Закрываем модальное окно.
  };

  // Обработчик удаления задачи
  const handleDelete = (task, date) => {
    const { index } = task;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].filter((_, i) => i !== index),
    }));
  };

  // Обработчик редактирования задачи
  const handleEdit = (task, date) => {
    const updatedTitle = prompt('Edit task title:', task.title) || task.title;
    const updatedDescription =
      prompt('Edit task description:', task.description) || task.description;

    const { index } = task;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].map((t, i) =>
        i === index
          ? { ...t, title: updatedTitle, description: updatedDescription }
          : t
      ),
    }));
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Кнопка для открытия модального окна */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: 'linear-gradient(45deg, #007BFF, #1E90FF)',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          zIndex: 10,
        }}
      >
        Add Task
      </Button>

      <h1 style={{ marginTop: '0' }}>All tasks</h1>

      {/* Список задач по группам дат */}
      {Object.entries(tasks)
        .filter(([date, taskList]) => taskList.length > 0) // Показываем только те даты, у которых есть задачи
        .map(([date, taskList]) => (
          <div key={date} style={{ marginBottom: '24px' }}>
            <Divider orientation="center">
              <Title level={5} style={{ marginBottom: 0 }}>
                Tasks for {date}
              </Title>
            </Divider>
            <List
              size="large"
              bordered
              dataSource={taskList}
              renderItem={(task, index) => (
                <List.Item
                  actions={[
                    <Tooltip title="Edit Task" key="edit">
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(task, date)}
                      />
                    </Tooltip>,
                    <Tooltip title="Delete Task" key="delete">
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete({ ...task, index }, date)}
                      />
                    </Tooltip>,
                  ]}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={5} style={{ margin: '0' }}>
                      {task.title}
                    </Title>
                    <Text type="secondary">{task.description}</Text>
                    <div>
                      <Text strong>Priority:</Text>{' '}
                      <Tag color={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Tag>
                    </div>
                    <div>
                      {task.tags.map((tag, tagIndex) => (
                        <Tag color="blue" key={tagIndex}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        ))}

      {/* Модальное окно добавления задачи */}
      <Modal
        title="Add New Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Input
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
          style={{ marginBottom: '8px' }}
        />
        <Input
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
          style={{ marginBottom: '8px' }}
        />
        <DatePicker
          placeholder="Select Date"
          value={newTask.dueDate}
          onChange={(date) => setNewTask((prev) => ({ ...prev, dueDate: date }))}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <Select
          placeholder="Select Priority"
          value={newTask.priority}
          onChange={(priority) => setNewTask((prev) => ({ ...prev, priority }))}
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
          onChange={(tags) => setNewTask((prev) => ({ ...prev, tags }))}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <Button type="primary" onClick={handleAddTask} style={{ width: '100%' }}>
          Add Task
        </Button>
      </Modal>
    </div>
  );
};

// Функция для получения цвета для уровня приоритета
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

export default TaskList;
