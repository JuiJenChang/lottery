import React, { useState } from 'react';
import Roster from './component/Roster';
import CountDownTimer from './component/CountDownTimer';

function App() {
  const [roster, setRoster] = useState([]);

  const addName = person => {
    setRoster([...roster, person]);
  }

  const removeName = key => {
    const newRoster = roster.filter((name, i) => {
      return i !== key
    });
    setRoster(newRoster);
  }
  return (
    <div>
      <Roster
        roster={roster}
        addName={addName}
        removeName={removeName}
      />
      <CountDownTimer
        roster={roster}
      />
    </div>
  );
}

export default App;
