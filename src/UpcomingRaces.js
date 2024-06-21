import React, { useState, useEffect } from "react";
import axios from "axios";

function UpcomingRaces() {
  const [races, setRaces] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchUpcomingRaces() {
    setLoading(true);
    try {
      const response = await axios.get("https://ergast.com/api/f1/current/races.json");
      const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
      setRaces(response.data?.MRData?.RaceTable?.Races.filter((race) => race.date >= today) || []);
    } catch (error) {
      console.error("The error is...", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUpcomingRaces();
  }, []);

  function handleRefresh() {
    setLoading(true);
    fetchUpcomingRaces();
  }

  return (
    <div>
      <h2>Upcoming Races</h2>
      <button onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh Races"}
      </button>
      {isLoading ? (
        <div className="loading">Loading upcoming races...</div>
      ) : races.length > 0 ? (
        <ul>
          {races.map((race) => (
            <li key={race.round}>
              {/* Optional chaining for nested properties */}
              {race.raceName} - {race.Circuit?.circuitName || "Circuit name not available"} ({race.date})
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming races found.</p>
      )}
    </div>
  );
}

export default UpcomingRaces;
