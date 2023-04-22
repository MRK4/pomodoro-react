import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { VscDebugStart, VscDebugRestart } from "react-icons/vsc"
import { FaStop, FaVolumeDown, FaVolumeUp } from "react-icons/fa"

function Timer({ selectedSound, selectedAmbiant }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [volumeAmbiant, setVolumeAmbiant] = useState(0.1);

  useEffect(() => {
    let intervalId;
    if (timerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const newIsBreak = !isBreak;
      setIsBreak(newIsBreak);
      setTimeLeft(newIsBreak ? 5 * 60 : 25 * 60);
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

  // Play a song when the timer is equal to 0
  useEffect(() => {
    if (timeLeft === 0) {
      const audio = new Audio(selectedSound);
      audio.volume = volume;
      audio.play();
    }
  }, [timeLeft, selectedSound, volume]);

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
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden group space-y-9">
      <h1 className="text-3xl font-bold text-center transition duration-150 ease-in-out opacity-100 sm:opacity-25 group-hover:opacity-100">{isBreak ? "Take a break ! 🧋" : "Pomodoro ✍️"}</h1>

      {/* TIMER */}
      <section className="text-success radial-progress" style={{"--value":100 - progressPercentage, "--size": "12rem", "--thickness": "1rem"}}>
        <span className="flex gap-3 text-white">
          <div>
            <span className="font-mono text-3xl countdown">
              <span style={{"--value":`${getMinutes(timeLeft)}`}}></span>
            </span>
            min
          </div>
          <div>
            <span className="font-mono text-3xl countdown">
              <span style={{"--value":`${getSeconds(timeLeft)}`}}></span>
            </span>
            sec
          </div>
        </span>
      </section>

      {/* BUTTONS */}
      <section className="flex space-x-6 text-4xl transition duration-150 ease-in-out opacity-100 sm:opacity-25 group-hover:opacity-100">
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
      </section>

      {/* VOLUME */}
      <section className="flex flex-col items-center justify-center gap-8 text-white">
        {/* Notification volume */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-sm">Notification volume</h3>
          <span className="flex items-center justify-center gap-4">
            <FaVolumeDown className="text-lg" />
            <input
              className="range range-sm range-success"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={ev => setVolume(ev.target.value)}
            />
            <FaVolumeUp className="text-2xl" />
          </span>
        </div>
        {/* Ambiant volume */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-sm">Ambiant volume</h3>
          <span className="flex items-center justify-center gap-4">
            <FaVolumeDown className="text-lg" />
            <input
              className="range range-sm range-success"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumeAmbiant}
              onChange={ev => setVolumeAmbiant(ev.target.value)}
            />
            <FaVolumeUp className="text-2xl" />
          </span>
        </div>
      </section>


      {/* PLAYER FOR AMBIANT SOUND */}
      <ReactPlayer className="absolute hidden" url={selectedAmbiant} playing loop volume={volumeAmbiant} />
    </div>
  );
}

export default Timer;