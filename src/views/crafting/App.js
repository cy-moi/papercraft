import './App.css';
import React, { useState, useEffect } from 'react';
import HealthBoard from '../components/HealthBoard';
// eslint-disable-next-line import/no-named-as-default
import AppLayout from '../components/AppLayout';
import ScoreCard from '../components/Score';
import { GitHubShareButton } from '../components/GithubButton';
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
          <HealthBoard player={window.it} />
          <ScoreCard />
        </div>
      )}
      <GitHubShareButton />
    </div>
  );
}

export default App;
