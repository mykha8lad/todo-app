import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const Home = ({ user, onLogout }) => {
  return (
    <div style={styles.container}>
      <Title level={2}>Welcome, {user.name}!</Title>
      <Button type="primary" onClick={onLogout} style={styles.button}>
        Log out
      </Button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20%',
  },
  button: {
    marginTop: 20,
  },
};

export default Home;
