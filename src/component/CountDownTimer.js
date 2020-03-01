import React, { useState, useEffect } from 'react';
import './CountDownTimer.css';

function CountDownTimer({ roster }) {
    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0
    });
    const [handle, setHandle] = useState(0);
    const [timeout, setTimeout] = useState(false);
    const [timeup, setTimeup] = useState(false);
    const [start, setStart] = useState(false);
    const [winner, setWinner] = useState('');

    const startTimer = () => {
        setStart(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (handle !== 0) {
            setTime({
                minutes: handle,
                seconds: 0
            })
        }
    }

    const tick = () => {
        if (timeout || timeup) return;
        if (time.minutes === 0 && time.seconds === 0) {
            setTimeup(true);
        }
        else if (time.seconds === 0) {
            setTime({
                minutes: time.minutes - 1,
                seconds: 59
            });
        }
        else {
            setTime({
                minutes: time.minutes,
                seconds: time.seconds - 1
            });
        }
    }

    const timer = () => {
        return new Promise((resolve) => {
            setInterval(() => {
                tick();
                resolve();
            }, 1000)
        })
    }

    const random = () => {
        return new Promise((resolve) => {
            const winner = Math.floor((Math.random() * roster.length));
            resolve(roster[winner]);
        })
    }

    const result = () => {
        Promise.all([timer(), random()]).then((data) => {
            setWinner(data);
        })
    }

    const reset = () => {
        setTime({
            minutes: 0,
            seconds: 0
        });
        setTimeout(false);
        setTimeup(false);
        setStart(false);
    }

    useEffect(() => {
        if (start === true) {
            result();
        }
        return () => clearInterval(result());
    }, [start])

    return (
        <div>
            <div className="timeInput">
                <p>抽獎時間</p>
                <form onSubmit={handleSubmit}>
                    <input
                        value={handle}
                        onChange={e => setHandle(e.target.value)}
                    />
                    <span>分鐘</span>
                </form>
            </div>
            <div className="control-btn">
                <button onClick={() => startTimer()}>Start</button>
                <button onClick={() => setTimeout(!timeout)}>
                    {timeout ? "Resume" : "Pause"}
                </button>
                <button onClick={() => reset()}>Restart</button>
            </div>
            <div className="timer">
                <p>
                    {`${time.minutes.toString().padStart(2, "0")} :
                      ${time.seconds.toString().padStart(2, "0")}`
                    }
                </p>
            </div>
            <div className="result">
                <p>抽獎結果</p>
                <div className="winner">
                    {winner}
                </div>
            </div>
        </div>
    );
}

export default CountDownTimer;