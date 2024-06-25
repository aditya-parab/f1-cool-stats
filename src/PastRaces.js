import React, { useState, useEffect } from "react";
import axios from "axios";



function PastRaces() {
  const [pastRaces, setPastRaces] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const today = new Date(); // Get today's date in YYYY-MM-DD format
  const todaysyear = today.getFullYear();

  async function fetchPastRaces() {
    setLoading(true);
    try {
      const url = `https://ergast.com/api/f1/${todaysyear}/results/1.json`;
    
      const response = await axios.get(url);
      const data = response.data?.MRData?.RaceTable?.Races;
      setPastRaces(data);
      console.log(data);

    } catch (error) {
      console.error("Error fetching past races:", error);
    } finally {
      setLoading(false);
    }


    
  }


  useEffect(() => {
    fetchPastRaces();
  }, []);

  function handleRefresh() {
    fetchPastRaces();
  }


 



  return (
    <div>
      <h2>Past Races</h2>
      <button onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh Races"}
      </button>
      {isLoading ? (
        <div className="loading">Loading past races...</div>
      ) : pastRaces.length > 0 ? (
        <ol>
          {/* Map over pastRaces and display details */}
          {pastRaces.map((race) => (
            <li key={race.round}>
              {/* Display race details (e.g., race name, date, winner) */}
              {race.raceName} : {race.Results[0].Driver.familyName}
              
            </li>
          ))}
        </ol>
      ) : (
        <p>No past races found.</p>
      )}
    </div>
  );
}

export default PastRaces;
