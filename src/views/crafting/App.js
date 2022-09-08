import { Button, Typography } from '@mui/material';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

let code = `it.setSpeed(10)
waitFrameToStop(3000)`;
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <Button variant="outlined"  onClick={()=>window.selectShape("rectangle", {width: 100, height: 100})}>rectangle</Button>
        <Button variant="outlined" onClick={()=>window.selectShape("circle", {}, 100)}>circle</Button>
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
            console.log('value:', value);
          }}
        />
    </div>
  );
}

export default App;
