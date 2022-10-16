// import { Button } from '@mui/material';
import './App.css';
// import CodeMirror from '@uiw/react-codemirror';
// import { initBattle } from 'Src/views/battle';
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Healthbar from '../components/Healthbar';

// const code = `// after RUN CODE
// // Press key 'a' to shoot
// const pistol = it.getEquipSlots()[0];
// console.log(pistol);
// const laser = it.getEquipSlots()[1];
// window.equipShoot("bullet", 0, 5,
//   {
//     radius: 10,
//     blurSize: 5
//   },"keypress");
// window.equipShoot("laser", 1, 20,
//   {
//     size: { width: 20, height: 2}
//   }, "keypress");
// it.setSpeed(10);
// waitFrameToStop(300);
// `;
function App() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    function handleChnageSession() {
      setShow(false);
    }

    document.addEventListener('changeSession', handleChnageSession);

    return (_) => {
      document.removeEventListener('changeSession', handleChnageSession);
    };
  });

  return (
    <div>
      {/* <header className="App-header" />
      <div>
        <Button
          variant="outlined"
          onClick={() =>
            window.selectShape('rectangle', { width: 100, height: 100 })
          }
        >
          rectangle
        </Button>
        <Button
          variant="outlined"
          onClick={() => window.selectShape('circle', {}, 100)}
        >
          circle
        </Button>
        <Button onClick={() => {}}>Weapon</Button>
      </div>
      <CodeMirror
        value={code}
        options={{
          theme: 'monokai',
          keyMap: 'sublime',
          tabSize: 2,
          mode: 'js',
        }}
        onChange={(value, viewUpdate) => {
          code = value;
          // console.log('value:', value);
        }}
      />
      <div>
        <Button onClick={() => eval(code)}>Run Cod
        </Button>
      </div> */}

      {show ? (
        <AppLayout />
      ) : (
        <div className="Footer">
          {' '}
          <Healthbar />{' '}
        </div>
      )}
    </div>
  );
}

export default App;
