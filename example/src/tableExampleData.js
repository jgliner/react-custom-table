import React from 'react';

export default {
  headers: [
    'Rank',
    'Team',
    'W',
    'L',
    '% Games Won',
  ],
  stats: [
    {
      rank: 4,
      team: (
        <div className="team-name">
          <img src="./assets/sd.png" alt="sd" />
          <span>San Diego Chargers</span>
        </div>
      ),
      wins: 5,
      losses: 11,
      win_percentage: `${((5 / 16) * 100).toFixed(2)}%`,
    },
    {
      rank: 3,
      team: (
        <div className="team-name">
          <img src="./assets/den.png" alt="den" />
          <span>Denver Broncos</span>
        </div>
      ),
      wins: 9,
      losses: 7,
      win_percentage: `${((9 / 16) * 100).toFixed(2)}%`,
    },
    {
      rank: 2,
      team: (
        <div className="team-name">
          <img src="./assets/oak.png" alt="oak" />
          <span>Oakland Raiders</span>
        </div>
      ),
      wins: 12,
      losses: 4,
      win_percentage: `${((12 / 16) * 100).toFixed(2)}%`,
    },
    {
      rank: 1,
      team: (
        <div className="team-name">
          <img src="./assets/kc.png" alt="kc" />
          <span>Kansas City Chiefs</span>
        </div>
      ),
      wins: 12,
      losses: 4,
      win_percentage: `${((12 / 16) * 100).toFixed(2)}%`,
    },
  ],
};
