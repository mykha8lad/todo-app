import React, { useState, useEffect } from 'react';
import './SloganRotator.css';

const slogans = [
  "Conquer your day, one task at a time – stay focused and unstoppable!",
  "Plan smarter, live better – organize your world with ease.",
  "Small steps every day lead to big achievements tomorrow.",
  "Your goals, your timeline – master them all with precision.",
  "Unlock your productivity – one checkmark at a time.",
  "A clutter-free mind starts with an organized list.",
  "Turn your to-dos into ta-das – let’s make it happen!",
  "Simplify, focus, achieve – your tasks, your way.",
  "Dream it, list it, do it – success starts here.",
  "Stay on track, stress less – your productivity companion.",
];

const SloganRotator = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      console.log('Component mounted');
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slogans.length);
      }, 7000);
      return () => clearInterval(interval);
    }, []);
  
    console.log('Rendering with slogan:', slogans[currentIndex]);
  
    return (
      <div className="slogans">
        <p>{slogans[currentIndex]}</p>
      </div>
    );
  };
  
  export default SloganRotator;
