import './App.css'
import React, { useState, useEffect } from 'react';
import Projects from './Layouts/Projects';
import TaskList from './Layouts/ToDoList';
import logo from './assets/images/icon.png';
import ProjectsProvider from './assets/components/ProjectsContext';
import {
  HomeFilled,
  FolderOpenFilled,  
  UnorderedListOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Flex, Spin } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CalendarForm from './Layouts/Calendar';
import CurrentTime from './assets/components/CurrentTime';
import SloganRotator from './assets/components/SloganRotator';
import Home from './Layouts/Home';
dayjs.extend(customParseFormat);
const items = [
  getItem('Home', '1', <HomeFilled />),
  getItem('Projects', '2', <FolderOpenFilled />),
  getItem('To-do list', '3', <UnorderedListOutlined />),
  getItem('Calendar', '4', <CalendarOutlined />),
];


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  useEffect(() => {    
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadData();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Home/>;
      case '2':
        return <Projects/>;
      case '3':
        return <TaskList/>;
      case '4':
        return <CalendarForm/>;
      default:
        return <div>Select an option from the menu.</div>;
    }
  };

  return (
    <>
    <ProjectsProvider>
    {isLoading ? (
        <Flex
          style={{
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
      <Layout
      style={{
        minHeight: '100vh',
      }}
      >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => setSelectedKey(key)}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,            
            background: colorBgContainer,
          }}
        >
            <div className="content-header">
                <div className="logo"> 
                    <img src={logo} alt="logo" />
                    <h1>Taskly</h1>
                </div>
                <SloganRotator/>
                <CurrentTime/>
            </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {/* <Breadcrumb.Item>{items.find((item) => item.key === selectedKey)?.label}</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>  
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Taskly ©{new Date().getFullYear()} Created by STEP
        </Footer>
      </Layout>
    </Layout>)};
    </ProjectsProvider>
    </>
  )
}

export default App
