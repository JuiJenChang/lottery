import React, { useState } from 'react';
import './Roster.css';

function Roster() {
    const [roster, setRoster] = useState([]);
    const [name, setName] = useState('');
    const [winner, setWinner] = useState('');

    const addName = person => {
        setRoster([...roster, person]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (name !== "") {
            addName(name);
        }
        setName('');
    }

    const removeName = key => {
        const newRoster = roster.filter((name, i) => {
            return i !== key
        });
        setRoster(newRoster);
    }

    const random = () => {
        const winner = Math.floor((Math.random() * roster.length));
        setWinner(roster[winner]);
    }
    return (
        <div>
            <div className="addName">
                <p>輸入抽獎者大名</p>
                <form onSubmit={handleSubmit} >
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Add name"
                    />
                </form>
            </div>
            <div className="roster">
                <p>抽獎者名單</p>
                <ul>
                    {roster.map((name, i) =>
                        <li key={i}>
                            {name}
                            <button onClick={() => removeName(i)}>X</button>
                        </li>
                    )}
                </ul>
            </div>
            <div className="result">
                <button onClick={() => random()}>抽獎結果</button>
                <div className="winner">
                    {winner}
                </div>
            </div>
        </div>
    );
}

export default Roster;