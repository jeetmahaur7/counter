import { useEffect, useState } from "react";
import "./Counter.css";

export default function Counter() {
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  function handleStart() {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert("Invalid Input");
      return;
    } else {
      setStart(true);
    }
  }

  function handlePause() {
    setPaused(true);
    clearInterval(timerId);
  }

  function handleResume() {
    setPaused(false);
    runTimer(seconds, minutes, hours);
  }

  function handleReset() {
    setStart(false);
    resetTimer();
  }

  function resetTimer() {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  function handleInput(e) {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  }
  function runTimer(sec, min, hr, tid) {
    if (sec > 0) {
      setSeconds(sec - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes(min - 1);
      setSeconds(59);
    } else if (min === 0) {
      setHours(hr - 1);
      setMinutes(59);
      setSeconds(59);
    }
    if (sec === 0 && min === 0 && hr === 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(tid);
      alert("Timer is finished");
    }
  }

  useEffect(() => {
    let tid;
    if (start) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [start, hours, minutes, seconds]);

  return (
    <>
      <h1>Time Counter</h1>
      {!start && (
        <div className="input-container">
          <div className="input-box">
            <input onChange={handleInput} id="hours" placeholder="HH" />
            <input onChange={handleInput} id="minutes" placeholder="MM" />
            <input onChange={handleInput} id="seconds" placeholder="SS" />
          </div>
          <button onClick={handleStart}>Start</button>
        </div>
      )}

      {start && (
        <div className="show-container">
          <div className="timer-box">
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
          <div className="action-box">
            {!paused && <button onClick={handlePause}>Pause</button>}
            {paused && <button onClick={handleResume}>Resume</button>}
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </>
  );
}
