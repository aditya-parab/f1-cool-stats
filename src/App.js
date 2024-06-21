import PastRaces from './PastRaces';
import UpcomingRaces from './UpcomingRaces';  // Assuming UpcomingRaces.js is in the same directory

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* ... rest of your header content */}
      </header>

      <PastRaces />
      <UpcomingRaces />  
    </div>
  );
}

export default App;
