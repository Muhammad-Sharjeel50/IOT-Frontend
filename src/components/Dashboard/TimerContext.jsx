import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const [duration, setDuration] = useState(0); // Duration in seconds

  const startTimer = () => {
    if (!timer) {
      const newTimer = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 5000);
      setTimer(newTimer);
    }
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
      setDuration(0);
    }
  };

  return (
    <TimerContext.Provider value={{ duration, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
