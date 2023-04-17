import React, { useState, useEffect } from "react";
import { VscDebugStart, VscDebugRestart } from "react-icons/vsc"
import { FaStop } from "react-icons/fa"

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
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Play a song when the timer is equal to 0
  useEffect(() => {
    console.log(timeLeft);
    if (timeLeft === 0) {
      new Audio('./assets/songs/bell.mp3').play();
    }
  });

  // Calculate the percentage of progress
  let progressPercentage = ((1500 - timeLeft) / 1500) * 100;

  const getMinutes = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    return minutes;
  };

  const getSeconds = (timeInSeconds) => {
    let seconds = timeInSeconds % 60;
    return seconds;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full group space-y-9">
      <h1 className="text-4xl font-bold text-center transition duration-150 ease-in-out opacity-25 group-hover:opacity-100">{isBreak ? "Take a break ! 🧋" : "Pomodoro ✍️"}</h1>
      <div className="radial-progress" style={{"--value":100 - progressPercentage, "--size": "15rem", "--thickness": "1.5rem"}}>
        <span className="flex gap-3">
          <div>
            <span className="font-mono text-4xl countdown">
              <span style={{"--value":`${getMinutes(timeLeft)}`}}></span>
            </span>
            min
          </div>
          <div>
            <span className="font-mono text-4xl countdown">
              <span style={{"--value":`${getSeconds(timeLeft)}`}}></span>
            </span>
            sec
          </div>
        </span>
      </div>
      <span className="flex space-x-6 text-4xl transition duration-150 ease-in-out opacity-25 group-hover:opacity-100">
        <div className="tooltip tooltip-bottom" data-tip={timerRunning ? 'Stop' : 'Start'}>
          <button className="p-1 transition transform group/btn hover:scale-75" onClick={handleStartStopClick}>
            {timerRunning ? <FaStop className="group-hover/btn:text-orange-500" /> : <VscDebugStart className="group-hover/btn:text-green-500" />}
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Reset">
          <button className="p-1 transition transform group/btn hover:scale-75" onClick={handleResetClick}>
            <VscDebugRestart className="group-hover/btn:text-red-500" />
          </button>
        </div>
      </span>
    </div>
  );
}

export default Timer;