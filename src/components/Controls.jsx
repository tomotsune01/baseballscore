import React from 'react';
import './Controls.css';

function Controls({ gameState, dispatch }) {
  const { topOfInning, balls, strikes, outs } = gameState;

  // Render BSO indicators
  const renderDots = (count, max, colorClass) => {
    return Array.from({ length: max }, (_, i) => (
      <div 
        key={i} 
        className={`indicator-dot ${i < count ? colorClass : 'dot-empty'}`}
      />
    ));
  };

  return (
    <div className="controls-container">
      {/* BSO Display */}
      <div className="bso-board flex-col mb-4">
        <div className="bso-row">
          <span className="bso-label text-ball">B</span>
          <div className="bso-dots flex-center">
            {renderDots(balls, 3, 'dot-ball')}
          </div>
        </div>
        <div className="bso-row">
          <span className="bso-label text-strike">S</span>
          <div className="bso-dots flex-center">
            {renderDots(strikes, 2, 'dot-strike')}
          </div>
        </div>
        <div className="bso-row">
          <span className="bso-label text-out">O</span>
          <div className="bso-dots flex-center">
            {renderDots(outs, 2, 'dot-out')}
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="action-grid main-actions">
        <button className="btn-action btn-ball" onClick={() => dispatch({ type: 'ADD_BALL' })}>Ball</button>
        <button className="btn-action btn-strike" onClick={() => dispatch({ type: 'ADD_STRIKE' })}>Strike</button>
        <button className="btn-action btn-foul" onClick={() => dispatch({ type: 'ADD_FOUL' })}>Foul</button>
        <button className="btn-action btn-out" onClick={() => dispatch({ type: 'ADD_OUT' })}>Out</button>
      </div>

      {/* Game Progression Buttons */}
      <div className="action-grid game-actions mt-4">
        <button className="btn-action btn-hit" onClick={() => dispatch({ type: 'ADD_HIT' })}>Hit</button>
        <button className="btn-action btn-run" onClick={() => dispatch({ type: 'ADD_RUN' })}>Run (+1)</button>
        <button className="btn-action btn-error flex-col flex-center" onClick={() => dispatch({ type: 'ADD_ERROR' })}>
          Error
          <small className="btn-subtext">(No batter update)</small>
        </button>
        <button className="btn-action btn-clear" onClick={() => dispatch({ type: 'RESET_COUNT' })}>Reset BSO</button>
      </div>

      {/* Inning Controls */}
      <div className="inning-controls flex-between mt-4">
        <button className="btn-secondary" onClick={() => dispatch({ type: 'PREV_INNING' })}>
          ◀ 前のイニング
        </button>
        <button className="btn-secondary" onClick={() => dispatch({ type: 'NEXT_INNING' })}>
          チェンジ ▶
        </button>
      </div>

      {/* Utility Actions */}
      <div className="utility-actions mt-4 flex-center">
          <button className="btn-danger-outline" onClick={() => {
            if(window.confirm('試合をリセットしますか？')) {
               dispatch({ type: 'RESET_GAME' });
            }
          }}>試合リセット</button>
      </div>

    </div>
  );
}

export default Controls;
