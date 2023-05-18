import React, { useState, useEffect } from 'react';
import './App.css';
import { data } from './data/data';
import Top from './components/top/Top';
import { motion } from "framer-motion"
function App() {
  const [active, setActive] = useState(3);
  const [transformValue, setTransformValue] = useState(-11.8125);
  const [count, setCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [pos, setPos] = useState('');
  const [num, setNum] = useState(0);
  const [onPlay, setOnPlay] = useState(false);
  
  let auto;

  const changeNext = (changeTo) => {
    
  setTimeout(() => {
    setActive(changeTo);
  },1);
   
  };

  const handleForwClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (active === data.length - 1) {
      setActive(0);
      setTransformValue(23.625);
    } else {
      setActive((prevActive) => prevActive + 1);
      setTransformValue((prevTransformValue) => prevTransformValue - 11.8125);
    }

    setCount(0);
    setNum(1);

    setTimeout(() => {
      if (timeoutId) {
        handlePlay('nxt');
      }
    }, 0);
  };

  const handlePrevClick = () => {
    if (timeoutId) {
     
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (active === 0) {
      setActive(data.length - 1);
      setTransformValue(-35.4375);
    } else {
      setActive((prevActive) => prevActive - 1);
      setTransformValue((prevTransformValue) => prevTransformValue + 11.8125);
    }

    setCount(0);
    setNum(1);

    setTimeout(() => {
      if (timeoutId) {
        handlePlay('prev');
      }
    }, 0);
  };

  useEffect(() => {
    if (timeoutId && active === data.length - 1 && pos === 'nxt') {
      setTimeout(() => {
        setActive((prevActive) => 0);
        setTransformValue((prevTransformValue) => 23.625);
      }, 3000);
    }
    if (timeoutId && active === 0 && pos === 'prev') {
      setTimeout(() => {
        setActive(data.length - 1);
        setTransformValue(-35.4375);
      }, 3000);
    }
  }, [timeoutId, active, pos]);

  const handlePlay = (act) => {
    if (timeoutId && count > 0 && num > 0) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
      setCount(0);
      return;
    }

    if (act === 'prev') {
      setPos('prev');
      auto = setTimeout(() => {
        if (active === 0) {
          setActive(data.length - 1);
          setTransformValue(-35.4375);
        } else {
          setActive((prevActive) => prevActive - 1);
          setTransformValue((prevTransformValue) => prevTransformValue + 11.8125);
        }
        handlePlay(act);
      }, 3000);
    } else if (act === 'nxt') {
      setPos('nxt');
      auto = setTimeout(() => {
        if (active === 5) {
          setActive((prevActive) => 0);
          setTransformValue((prevTransformValue) => 23.625);
        } else {
          setActive((prevActive) => prevActive + 1);
          setTransformValue((prevTransformValue) => prevTransformValue - 11.8125);
        }
        handlePlay(act);
      }, 3000);
    }

    setTimeoutId(auto);
  };

  const handleRep = () => {
    if (!timeoutId) {
      setOnPlay(true);
      setPos('');
      setCount((prevCount) => prevCount + 1);
      handlePlay('nxt');
    } else {
      setOnPlay(false);
      clearTimeout(timeoutId);
      setTimeoutId(null);
      setCount(0);
      setNum(0);
      setPos('');
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="size">
        <img className="image" src={data[active].image}  alt="" />

        </div>
        <div className="bottom">
          <div className="slide" style={{ display: 'flex', transform: `translateX(${transformValue}rem)` }}>
            {data.map((item, i) => (
              <Top data={item} key={i} active={active} changeNext={changeNext} index={i} />
            ))}
          </div>
        </div>
        <div className="btns">
          <div className="contan">
            <div className="btn" onClick={handlePrevClick}>
              <img src="src/assets/play-button.png" height="20px" alt="" />
              <div className="box1"></div>
            </div>
            <div className="circle" onClick={handleRep}>
              {onPlay ? <img src="src/assets/pause-button.png" height="20px" alt="" /> : <img src="src/assets/play-button.png" height="20px" alt="" />}
            </div>
            <div className="btn2" onClick={handleForwClick}>
              <img src="src/assets/play-button.png" height="20px" alt="" />
              <div className="box2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <h1>{data[active].title}</h1>
        <p>{data[active].detail}</p>
      </div>
    </div>
  );
}

export default App;
