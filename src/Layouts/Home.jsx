import React, { useContext, useState } from "react";
import { Typography, Card, Row, Col, Button, Statistic, Input, List, Space, Tag, Tooltip } from "antd";
import { ProjectOutlined, CalendarOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TasksContext } from "../assets/components/TasksContext";
import { ProjectsContext } from "../assets/components/ProjectsContext";
import dayjs from "dayjs";
import "./Home.css";

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const currentDate = new Date().toLocaleDateString();

  const getInProgressCount = () => {
    return projects.filter(project =>
      project.tasks.some(task => !task.completed)
    ).length;
  };

  const getUpcomingDeadlines = () => {
    const currentDate = dayjs();
    let count = 0;

    Object.keys(tasks).forEach((date) => {
      tasks[date].forEach((task) => {
        if (task.dueDate && dayjs(task.dueDate).isAfter(currentDate)) {
          count++;
        }
      });
    });

    return count;
  };

  const handleEdit = (task, date) => {
    const updatedTitle = prompt("Edit task title:", task.title) || task.title;
    const updatedDescription = prompt("Edit task description:", task.description) || task.description;

    setTasks(prevTasks => ({
      ...prevTasks,
      [date]: prevTasks[date].map(t => (t === task ? { ...t, title: updatedTitle, description: updatedDescription } : t)),
    }));
  };

  const handleDelete = (task, date) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [date]: prevTasks[date].filter(t => t !== task),
    }));
  };

  const quote = "The secret of getting ahead is getting started.";

  const filteredTasks = Object.entries(tasks)
  .map(([date, taskList]) => ({
    date,
    tasks: taskList.filter(task => {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query)) ||
        task.priority.toLowerCase().includes(query) ||
        (task.dueDate && dayjs(task.dueDate).format('YYYY-MM-DD').includes(query))
      );
    }),
  }))
  .filter(({ tasks }) => tasks.length > 0);

  const getPriorityColor = priority => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "blue";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <Title level={2} className="welcome-title">Welcome to Taskly!</Title>
        <Paragraph className="current-date">Today's date: {currentDate}</Paragraph>
        <Paragraph className="quote">"{quote}"</Paragraph>
      </div>

      <div className="stats-section">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card className="stat-card">
              <Statistic
                title="Total Projects"
                value={projects.length}
                prefix={<ProjectOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="stat-card">
              <Statistic
                title="Projects In Progress"
                value={getInProgressCount()}
                prefix={<ProjectOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="stat-card">
              <Statistic
                title="Upcoming Deadlines"
                value={getUpcomingDeadlines()}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="search-section" style={{ marginTop: "20px" }}>
        <Input
          placeholder="Search tasks by title"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: "100%", maxWidth: "400px", margin: "0 auto", display: "block" }}
        />
      </div>

      {searchQuery.trim().length > 0 && (
        <div className="filtered-tasks" style={{ marginTop: "20px" }}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(({ date, tasks }) => (
              <div key={date} style={{ marginBottom: "24px" }}>
                <Title level={4} style={{ marginBottom: "8px" }}>
                  Tasks for {date}
                </Title>
                <List
                  size="large"
                  bordered
                  dataSource={tasks}
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
                            onClick={() => handleDelete(task, date)}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Title level={5} style={{ margin: 0 }}>{task.title}</Title>
                        <Text type="secondary">{task.description}</Text>
                        <div>
                          <Text strong>Priority:</Text>{" "}
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
                        <Text type="secondary">
                          Due Date: {dayjs(task.dueDate).format("YYYY-MM-DD")}
                        </Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            ))
          ) : (
            <Paragraph>No tasks found</Paragraph>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
