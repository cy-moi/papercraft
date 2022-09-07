import { Button, Typography } from '@mui/material';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

let code = `it.setSpeed(10)
waitFrameToStop(3000)`;

function App() {

  const [openManual, setOpen] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='SpawnButton'>
        <Button variant="outlined" onClick={()=>{window.spawnRandomShape()}}>Spawn Shape</Button>
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
      <div className='Submit'>
        <Button variant="outlined" 
          onClick={()=>{
            eval(code)}}>Submit</Button>
      </div>
      <div className='Manual'>
        <Button variant="outlined"
          onClick={() => {
            setOpen(!openManual)
          }}> { !openManual ? 'Show Manual': 'Hide Manual'}</Button>
      </div>
      <div className='ManualDoc' hidden={!openManual}>
        <Typography variant="h6">
          {`This is a Boilerplate.`}
        </Typography>
      </div>
    </div>
  );
}

export default App;
