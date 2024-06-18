import React from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom"; // Import jest-dom matchers

import UpcomingRaces from "./UpcomingRaces";

// Mock axios
jest.mock("axios");

const mockRaces = [
	{
		round: "1",
		raceName: "Australian Grand Prix",
		circuit: { circuitName: "Melbourne Grand Prix Circuit" },
		date: "2024-03-24",
	},
	{
		round: "2",
		raceName: "Emilia Romagna Grand Prix",
		circuit: { circuitName: "Autodromo Enzo e Dino Ferrari" },
		date: "2024-04-14",
	},
	{
		round: "3",
		raceName: "Monaco Grand Prix",
		circuit: { circuitName: "Circuit de Monaco" },
		date: "2024-05-26",
	},
	{
		round: "4",
		raceName: "Azerbaijan Grand Prix",
		circuit: { circuitName: "Baku City Circuit" },
		date: "2024-06-09",
	},
];

test("renders upcoming races when data is fetched successfully", async () => {
	// Mock axios.get to return our mock data
	axios.get.mockResolvedValueOnce({
		data: { MRData: { RaceTable: { Races: mockRaces } } },
	});

	const { getByText, getByRole } = render(<UpcomingRaces />);

	// Wait for the asynchronous data fetching to complete
	await act(async () => {
		// Adding a small timeout to wait for useEffect to complete
		await new Promise((resolve) => setTimeout(resolve, 0));
	});

	// Check for races list after data is fetched
	expect(getByText(/Australian Grand Prix/)).toBeInTheDocument();

	expect(getByText(/Melbourne Grand Prix Circuit/)).toBeInTheDocument();
});
