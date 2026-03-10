import React, { useState } from 'react';
import './MatchSetup.css';

function MatchSetup({ onStart }) {
  const [team1, setTeam1] = useState('Home');
  const [team2, setTeam2] = useState('Away');
  const [innings, setInnings] = useState(9);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ team1, team2, innings });
  };

  return (
    <div className="match-setup flex-col flex-center">
      <div className="setup-card">
        <h2 className="text-center">試合設定</h2>
        <form onSubmit={handleSubmit} className="flex-col gap-4 mt-4">
          <div className="form-group flex-col">
            <label htmlFor="team1">先攻 (Away) チーム名</label>
            <input 
              type="text" 
              id="team2" 
              value={team2} 
              onChange={(e) => setTeam2(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group flex-col">
            <label htmlFor="team2">後攻 (Home) チーム名</label>
            <input 
              type="text" 
              id="team1" 
              value={team1} 
              onChange={(e) => setTeam1(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group flex-col">
            <label htmlFor="innings">想定イニング数</label>
            <input 
              type="number" 
              id="innings" 
              value={innings} 
              onChange={(e) => setInnings(Number(e.target.value))} 
              min="1"
              max="12"
              required 
            />
          </div>
          <button type="submit" className="btn-primary mt-4">プレイボール</button>
        </form>
      </div>
    </div>
  );
}

export default MatchSetup;
