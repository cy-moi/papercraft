import { Button, Typography } from '@mui/material';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

let code = 
`// after RUN CODE
// Press key 'a' to shoot
window.equipShoot("bullet", {x:0, y:0}, 1, 5, 
  {
    radius: 10,
    blurSize: 5
  },"keypress");
window.equipShoot("laser", {x:0, y:0}, 0.5, 20,
  {
    size: { width: 20, height: 2}
  }, "keypress");
it.setSpeed(10);
waitFrameToStop(300);
`;
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <Button variant="outlined" onClick={()=>window.selectShape("rectangle", {width: 100, height: 100})}>rectangle</Button>
        <Button variant="outlined" onClick={()=>window.selectShape("circle", {}, 100)}>circle</Button>
        <Button variant="outlined" onClick={()=>window.addPolygonCraft(3)}>Triangle</Button>
        <Button variant="outlined" onClick={()=>window.addPolygonCraft(5)}>Penta</Button>
        <Button variant="outlined" onClick={()=>window.addPolygonCraft(12)}>Dodecagon</Button>
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
          {/* <Button onClick={()=> window.equipShoot()}>add weapon</Button> */}
          <Button onClick={() => eval(code)}>Run Code</Button>
        </div>
    </div>
  );
}

export default App;
