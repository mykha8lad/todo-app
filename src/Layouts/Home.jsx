import React, { useContext } from "react";
import { Typography, Card, Row, Col, Button, Statistic } from "antd";
import { ProjectOutlined, CalendarOutlined } from "@ant-design/icons";
import { TasksContext } from "../assets/components/TasksContext";
import { ProjectsContext } from "../assets/components/ProjectsContext";
import dayjs from "dayjs";
import './Home.css';

const { Title, Paragraph } = Typography;

const Home = () => {
  const { tasks } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);
  const currentDate = new Date().toLocaleDateString();

  const getInProgressCount = () => {
    return projects.filter(project =>
      project.tasks.some(task => !task.completed)
    ).length;
  };

  const getUpcomingDeadlines = () => {
    const currentDate = dayjs();
    let count = 0;
    
    Object.keys(tasks).forEach(date => {
      tasks[date].forEach(task => {
        if (task.dueDate && dayjs(task.dueDate).isAfter(currentDate)) {
          count++;
        }
      });
    });

    return count;
  };

  const quote = "The secret of getting ahead is getting started.";

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
    </div>
  );
};

export default Home;
