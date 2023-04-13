import React, { useState, useEffect } from "react";
import {VscDebugStart, VscDebugRestart} from "react-icons/vsc"
import {FaStop} from "react-icons/fa"

function Timer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      new Audio('./assets/songs/bell.mp3').play();
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning, timeLeft, isBreak]);

  const handleStartStopClick = () => {
    setTimerRunning(!timerRunning);
  };

  const handleResetClick = () => {
    setTimerRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculer le pourcentage de progression
  let progressPercentage = ((1500 - timeLeft) / 1500) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <h1 className="text-4xl font-bold">{isBreak ? "Take a break ! 🧋" : "Pomodoro ✍️"}</h1>
      <div className="radial-progress" style={{"--value":100 - progressPercentage}}>
        <h2 className="text-lg font-semibold">{formatTime(timeLeft)}</h2>
      </div>
      <span className="flex space-x-3 text-2xl">
        <button className="p-1 transition transform group hover:scale-75" onClick={handleStartStopClick}>
          {timerRunning ? <FaStop className="group-hover:text-orange-400" /> : <VscDebugStart className="group-hover:text-green-400" />}
        </button>
        <button className="p-1 transition transform group hover:scale-75" onClick={handleResetClick}>
          <VscDebugRestart className="group-hover:text-red-400" />
        </button>
      </span>
    </div>
  );
}

export default Timer