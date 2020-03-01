import React, { useState } from 'react';
import './Roster.css';

function Roster({ roster, addName, removeName }) {
    const [name, setName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (name !== "") {
            addName(name);
        }
        setName('');
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
        </div>
    );
}

export default Roster;