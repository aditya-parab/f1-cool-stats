import PastRaces from './PastRaces';
import UpcomingRaces from './UpcomingRaces';  // Assuming UpcomingRaces.js is in the same directory
import CurrentStandings from './CurrentStandings';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* ... rest of your header content */}
      </header>

      <PastRaces />
      <UpcomingRaces />
      <CurrentStandings/>  
    </div>
  );
}

export default App;
