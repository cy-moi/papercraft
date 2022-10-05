import { Button } from '@mui/material';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import SketchPad from './components/SketchPad';
import React, { useState, useEffect } from 'react';

let code = `// after RUN CODE
// Press key 'a' to shoot
const pistol = window.it.getEquipSlots()[0];
console.log(pistol);
const laser = window.it.getEquipSlots()[1];
window.equipShoot("bullet", pistol.slot, pistol.direction, 5, 
  {
    radius: 10,
    blurSize: 5
  },"keypress");
window.equipShoot("laser", laser.slot, laser.direction, 20,
  {
    size: { width: 20, height: 2}
  }, "keypress");
window.it.setSpeed(10);
waitFrameToStop(300);
`;
function App() {
  const [it, setIt] = useState(window.it);

  useEffect(() => {}, [it]);

  return (
    <div className="App">
      <header className="App-header" />
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            window.selectShape('rectangle', { width: 100, height: 100 });
            setIt(window.it);
          }}
        >
          rectangle
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            window.selectShape('circle', {}, 100);
            setIt(window.it);
          }}
        >
          circle
        </Button>
        <Button variant="outlined" onClick={() => window.addPolygonCraft(3)}>
          Triangle
        </Button>
        <Button variant="outlined" onClick={() => window.addPolygonCraft(5)}>
          Penta
        </Button>
        <Button variant="outlined" onClick={() => window.addPolygonCraft(12)}>
          Dodecagon
        </Button>
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
      <div>
        <SketchPad it={it} />
      </div>
    </div>
  );
}

export default App;
