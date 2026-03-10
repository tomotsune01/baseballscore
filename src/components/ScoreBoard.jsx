import React from 'react';
import './ScoreBoard.css';

function ScoreBoard({ gameState }) {
  const { team1, team2, innings, currentInning, topOfInning, runs, hits, errors } = gameState;

  // Generate an array of inning numbers (e.g., [1, 2, 3, ...])
  // Ensure we at least show the configured number of innings, or more if extra innings
  const totalInningsToShow = Math.max(innings, currentInning);
  const inningArray = Array.from({ length: totalInningsToShow }, (_, i) => i + 1);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header flex-between mb-4">
        <h2 className="current-inning">
          {topOfInning ? '▲' : '▼'} {currentInning}回
        </h2>
      </div>

      <div className="scoreboard-table-wrapper">
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th className="team-col text-left">Team</th>
              {inningArray.map((i) => (
                <th key={`header-inn-${i}`}>{i}</th>
              ))}
              <th className="total-col">R</th>
              <th className="stat-col">H</th>
              <th className="stat-col">E</th>
            </tr>
          </thead>
          <tbody>
            <tr className={topOfInning ? 'active-team' : ''}>
              <td className="team-col text-left font-bold">{team2.name}</td>
              {inningArray.map((i) => (
                <td key={`away-inn-${i}`}>{team2.scoreByInning[i - 1] !== undefined ? team2.scoreByInning[i - 1] : ''}</td>
              ))}
              <td className="total-col font-bold score-highlight">{runs.team2}</td>
              <td className="stat-col">{hits.team2}</td>
              <td className="stat-col">{errors.team2}</td>
            </tr>
            <tr className={!topOfInning ? 'active-team' : ''}>
              <td className="team-col text-left font-bold">{team1.name}</td>
              {inningArray.map((i) => (
                <td key={`home-inn-${i}`}>{team1.scoreByInning[i - 1] !== undefined ? team1.scoreByInning[i - 1] : ''}</td>
              ))}
              <td className="total-col font-bold score-highlight">{runs.team1}</td>
              <td className="stat-col">{hits.team1}</td>
              <td className="stat-col">{errors.team1}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreBoard;
