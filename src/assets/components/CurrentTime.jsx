import React, { useState, useEffect } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval); // Очищаем таймер при размонтировании
  }, []);

  return (
    <div className="time">
      <TimePicker value={currentTime} format="HH:mm:ss" disabled />
    </div>
  );
};

export default CurrentTime;