import React, { createRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './styles.css';

function SketchPad({ it }) {
  const canvas = createRef();

  const applyTexture = () => {
    canvas.current.exportImage('png').then((data) => {
      window.it.setSprite(data);
    });
  };

  // const getImageBase64 = () => {
  //   if (!window.it) throw new Error();
  //   let img = window.it.sprite.texture.baseTexture.source;
  //   let temp = document.creatElement('canvas');
  //
  //   let ctx = temp.getContext("2d");
  //   ctx.putImageData(img, 0, 0);
  //   return temp.toDataUrl();
  // }

  return (
    <div>
      <ReactSketchCanvas
        width={it ? it.width : 100}
        height={it ? it.height : 100}
        ref={canvas}
        canvasColor="transparent"
        exportWithBackgroundImage={false}
        // backgroundImage={() => getImageBase64()}
      />
      <button onClick={() => applyTexture()}>apply texture</button>
    </div>
  );
}

export default SketchPad;
