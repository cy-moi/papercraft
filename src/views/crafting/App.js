import './App.css';
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import ScoreBoard from '../components/ScoreBoard';
/**
 * React's entry point for app
 * @returns {JSX.Element}
 * @constructor
 */

function App() {
  // state for showing the healthbar depending on the current scene (game or crafting)
  // using hooks we can set the state of the healthbar to show or hide
  const [show, setShow] = useState(true);
  useEffect(() => {
    function handleChnageSession() {
      setShow(!show);
    }

    document.addEventListener('changeSession', handleChnageSession);

    return (_) => {
      document.removeEventListener('changeSession', handleChnageSession);
    };
  });

  return (
    <div>
      {show ? (
        <AppLayout />
      ) : (
        <div className="Footer">
          {' '}
          <ScoreBoard />
        </div>
      )}
    </div>
  );
}

export default App;
