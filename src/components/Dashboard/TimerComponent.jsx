import React, { useEffect, useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TimerComponent({ name, isActive, phase3voltage }) {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(`timer_${name}`);
    return savedTime ? convertToSeconds(savedTime) : 0;
  });

  useEffect(() => {
    let interval;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem(`timer_${name}`, formatDuration(newTime));
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isActive, name]);

  const convertToSeconds = (formattedTime) => {
    const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString();
  };

  return (
    <Grid item xs={12}>
      {/* {phase3voltage < 50 && ( */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{formatDuration(time)}</TableCell>
                <TableCell>{getCurrentDate()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      {/* )} */}
    </Grid>
  );
}

export default TimerComponent;
