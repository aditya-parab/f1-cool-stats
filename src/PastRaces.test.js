// PastRaces.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PastRaces from './PastRaces'; // Adjust path based on your component location


jest.mock('axios'); // Mock axios to control API calls

describe('PastRaces component', () => {
  it('renders loading state while fetching races', async () => {
    const mockedRaces = []; // Empty array to simulate no past races
    axios.get.mockResolvedValueOnce({ data: { MRData: { RaceTable: { Races: mockedRaces } } } });

    render(<PastRaces />);

    expect(screen.getByText('Loading past races...')).toBeInTheDocument();
  });

  it('renders message when no past races are found', async () => {
    const mockedRaces = []; // Empty array to simulate no past races
    axios.get.mockResolvedValueOnce({ data: { MRData: { RaceTable: { Races: mockedRaces } } } });

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for rendering

    expect(screen.getByText('No past races found.')).toBeInTheDocument();
  });

  it('renders list of past races with basic details', async () => {
    const mockedRaces = [
      {
        raceName: 'Bahrain Grand Prix',
        date: '2024-03-17',
        Results: [{ Driver: { driverId: 'VER' } }], // Mock winner data
      },
      {
        raceName: 'Saudi Arabian Grand Prix',
        date: '2024-03-24',
        Results: [{ Driver: { driverId: 'LEC' } }], // Mock winner data
      },
    ];
    axios.get.mockResolvedValueOnce({ data: { MRData: { RaceTable: { Races: mockedRaces } } } });

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for rendering

    const races = screen.getAllByRole('listitem');
    expect(races.length).toBe(2); // Two mocked races

    expect(screen.getByText('Bahrain Grand Prix (2024-03-17) - Winner: VER')).toBeInTheDocument();
    expect(screen.getByText('Saudi Arabian Grand Prix (2024-03-24) - Winner: LEC')).toBeInTheDocument();
  });
});
