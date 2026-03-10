import React, { useReducer, useState } from 'react';
import MatchSetup from './components/MatchSetup';
import ScoreBoard from './components/ScoreBoard';
import Controls from './components/Controls';

const initialGameState = {
  isSetup: true,
  team1: { name: 'Home', scoreByInning: [] },
  team2: { name: 'Away', scoreByInning: [] },
  innings: 9,
  currentInning: 1,
  topOfInning: true, // true = Away batting, false = Home batting
  balls: 0,
  strikes: 0,
  outs: 0,
  runs: { team1: 0, team2: 0 },
  hits: { team1: 0, team2: 0 },
  errors: { team1: 0, team2: 0 },
};

function gameReducer(state, action) {
  const currentBattingTeam = state.topOfInning ? 'team2' : 'team1';
  const currentPitchingTeam = state.topOfInning ? 'team1' : 'team2';

  const updateScore = (runsToAdd) => {
    const newState = { ...state };
    newState.runs[currentBattingTeam] += runsToAdd;
    
    const teamObj = newState[currentBattingTeam];
    const innIdx = newState.currentInning - 1;
    const currentInnScore = teamObj.scoreByInning[innIdx] || 0;
    
    teamObj.scoreByInning[innIdx] = currentInnScore + runsToAdd;
    return newState;
  };

  const handleOut = (currentState) => {
    if (currentState.outs + 1 >= 3) {
      // Change inning
      const newState = {
        ...currentState,
        outs: 0,
        balls: 0,
        strikes: 0,
        topOfInning: !currentState.topOfInning,
        currentInning: currentState.topOfInning ? currentState.currentInning : currentState.currentInning + 1,
      };
      
      // Initialize next inning score to 0 if not exists
      const nextTeam = newState.topOfInning ? 'team2' : 'team1';
      const innIdx = newState.currentInning - 1;
      if (newState[nextTeam].scoreByInning[innIdx] === undefined) {
         newState[nextTeam].scoreByInning[innIdx] = 0;
      }

      return newState;
    } else {
      return {
        ...currentState,
        outs: currentState.outs + 1,
        balls: 0,
        strikes: 0
      };
    }
  };

  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialGameState,
        isSetup: false,
        team1: { name: action.payload.team1, scoreByInning: [0] },
        team2: { name: action.payload.team2, scoreByInning: [0] },
        innings: action.payload.innings,
      };

    case 'ADD_BALL':
      if (state.balls + 1 >= 4) {
        // Walk (Base on balls)
        return { ...state, balls: 0, strikes: 0 }; 
      }
      return { ...state, balls: state.balls + 1 };

    case 'ADD_STRIKE':
      if (state.strikes + 1 >= 3) {
        // Strikeout
        return handleOut(state);
      }
      return { ...state, strikes: state.strikes + 1 };

    case 'ADD_FOUL':
      // Foul doesn't add a 3rd strike
      if (state.strikes < 2) {
        return { ...state, strikes: state.strikes + 1 };
      }
      return state;

    case 'ADD_OUT':
      return handleOut(state);

    case 'ADD_HIT':
      return {
        ...state,
        hits: { ...state.hits, [currentBattingTeam]: state.hits[currentBattingTeam] + 1 },
        balls: 0,
        strikes: 0
      };

    case 'ADD_RUN':
      return updateScore(1);

    case 'ADD_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [currentPitchingTeam]: state.errors[currentPitchingTeam] + 1 },
      };

    case 'RESET_COUNT':
      return { ...state, balls: 0, strikes: 0 };

    case 'NEXT_INNING':
      // Force 3 outs to trigger inning change
      return handleOut({ ...state, outs: 2 });

    case 'PREV_INNING':
      // Simple revert to previous half-inning (without score fix for brevity, assumes minimal usage)
      if (state.currentInning === 1 && state.topOfInning) return state;
      return {
        ...state,
        topOfInning: !state.topOfInning,
        currentInning: !state.topOfInning ? state.currentInning : state.currentInning - 1,
        outs: 0, balls: 0, strikes: 0
      };

    case 'RESET_GAME':
      return initialGameState;

    default:
      return state;
  }
}

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const handleStartGame = (config) => {
    dispatch({ type: 'START_GAME', payload: config });
  };

  return (
    <div className="app-container">
      {gameState.isSetup ? (
        <MatchSetup onStart={handleStartGame} />
      ) : (
        <>
          <ScoreBoard gameState={gameState} />
          <Controls gameState={gameState} dispatch={dispatch} />
        </>
      )}
    </div>
  );
}

export default App;
