import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function App() {
  const [time, setTime] = useState(5 * 60); // Starting with 5 minutes for short break
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('shortBreak');


  
  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      if (mode === 'work') {
        setMode('shortBreak');
        setTime(5 * 60);
      } else if (mode === 'shortBreak') {
        setMode('work');
        setTime(25 * 60);
      } else if (mode === 'longBreak') {
        setMode('work');
        setTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, mode]);

  // Handle start/pause
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Handle stop/reset
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setTime(25 * 60);
    else if (mode === 'shortBreak') setTime(5 * 60);
    else setTime(15 * 60);
  };

  // Switch modes
  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'work') setTime(25 * 60);
    else if (newMode === 'shortBreak') setTime(5 * 60);
    else setTime(15 * 60);
  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const getProgress = () => {
    const totalTime = mode === 'work' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60;
    return (time / totalTime) * 100;
  };

  return (
    <Container>
      <Title>Pomodoro App</Title>
      <ModeButtons>
        <ModeButton onClick={() => switchMode('work')} active={mode === 'work'}>
          Work
        </ModeButton>
        <ModeButton onClick={() => switchMode('shortBreak')} active={mode === 'shortBreak'}>
          Short Break
        </ModeButton>
        <ModeButton onClick={() => switchMode('longBreak')} active={mode === 'longBreak'}>
          Long Break
        </ModeButton>
      </ModeButtons>
      <TimerContainer>
        <CircularProgressbar
          value={getProgress()}
          text={formatTime(time)}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: '#d67e00',
            trailColor: 'transparent',
            textSize: '3rem',
          })}
        />
        <TimerStatus>{isActive ? 'RUNNING' : 'PAUSE'}</TimerStatus>
      </TimerContainer>
      <Controls>
        <ControlButton onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </ControlButton>
        <ControlButton onClick={resetTimer}>Stop</ControlButton>
      </Controls>
    </Container>
  );
}

export default App;

// Styled components with responsive design
const Container = styled.div`
  background-color: #4a2c2c;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 1rem;

  @media (max-width: 768px) { /* Tablet and mobile */
    padding: 0.5rem;
  }

  @media (max-width: 480px) { /* Mobile */
    padding: 0.3rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #ffffff;
  padding: 0.5rem 0;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const ModeButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
    margin-bottom: 0.8rem;
    flex-wrap: wrap; /* Allow wrapping on very small screens */
  }
`;

const ModeButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
  background-color: ${props => props.active ? '#d67e00' : '#5c4b4b'};
  color: white;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #d67e00;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.8rem;
  }

  .CircularProgressbar {
    width: 250px;
    height: 250px;

    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
    }

    @media (max-width: 480px) {
      width: 150px;
      height: 150px;
    }
  }
`;

const TimerStatus = styled.div`
  font-size: 2rem;
  color: #d67e00;
  text-transform: uppercase;
  margin-top: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-top: 0.4rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.8rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const ControlButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
  background-color: #d67e00;
  color: white;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #b66d00;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;