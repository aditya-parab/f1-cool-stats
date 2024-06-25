import React from 'react';
import PastRaces from './PastRaces';
import UpcomingRaces from './UpcomingRaces';
import CurrentStandings from './CurrentStandings';
import 'milligram'; // Import Milligram styles

function App() {
  return (
    <div className="container">
      <header>
        <h1>F1 Race Info</h1>
      </header>
      <div className="row">
        <div className="column column-6">
          <UpcomingRaces />
        </div>
        <div className="column column-6">
          <PastRaces />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <CurrentStandings />
        </div>
      </div>
    </div>
  );
}

export default App;
