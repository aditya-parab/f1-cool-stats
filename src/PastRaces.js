import React, { useState, useEffect } from "react";
import axios from "axios";

function PastRaces() {
  const [pastRaces, setPastRaces] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchPastRaces() {
    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const url = `https://ergast.com/api/f1/${currentYear}/results.json`;

      const response = await axios.get(url);
      const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

      // Filter past races based on date
      const filteredRaces = response.data?.MRData?.RaceTable?.Races?.filter(
        (race) => race.date <= today
      );
      console.log(response.data?.MRData?.RaceTable?.Races);
      setPastRaces(filteredRaces || []);
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
        <ul>
          {/* Map over pastRaces and display details */}
          {pastRaces.map((race) => (
            <li key={race.round}>
              {/* Display race details (e.g., race name, date, winner) */}
              {race.raceName} ({race.date}) - Winner: {race.Results[0]?.Driver?.driverId || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No past races found.</p>
      )}
    </div>
  );
}

export default PastRaces;
