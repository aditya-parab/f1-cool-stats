import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'; // Import the global CSS file

function CurrentStandings(){
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [isLoading, setloading] = useState(false);

    async function fetchStandings() {
        setloading(true);
        try {
            const driverResponse = await axios.get(
                `https://ergast.com/api/f1/current/driverStandings.json`
            );
            const constructorResponse = await axios.get(
                `https://ergast.com/api/f1/current/constructorStandings.json`
            );
            
            setDriverStandings(driverResponse.data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || []);
            setConstructorStandings(constructorResponse.data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings || []);
        } catch (error) {
            console.error("Error fetching standings:", error);
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        fetchStandings();
    }, []);

    return (
        <div className="current-standings-container">
            <h2>Current Standings</h2>
            {isLoading ? (
                <div className="loading">Loading standings...</div>
            ) : (
                <div className="standings-grid">
                    <div className="standings-column">
                        <h3>Drivers Standings</h3>
                        <ol>
                            {driverStandings.map((driver) => (
                                <li key={driver.Driver.driverId}>
                                    {/* Display driver name, position, points (adapt based on API structure) */}
                                    {driver.Driver.code} - {driver.points} pts
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="standings-column">
                        <h3>Constructors Standings</h3>
                        <ol>
                            {constructorStandings.map((constructor) => (
                                <li key={constructor.Constructor.constructorId}>
                                    {/* Display constructor name, position, points (adapt based on API structure) */}
                                    {constructor.Constructor.name} - {constructor.points} pts
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CurrentStandings;