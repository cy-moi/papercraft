export const keyboard = (value) => {
  const key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  // The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  // The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
};

const upkey = keyboard('ArrowUp');
const downKey = keyboard('ArrowDown');
const leftKey = keyboard('ArrowLeft');
const rightKey = keyboard('ArrowRight');
const stopKey = keyboard('C');

export const bindKeyHandler = (shape) => {
  upkey.press = () => {
    shape.speed += shape.speed >= 20 ? 0 : 1;
  };
  downKey.press = () => {
    shape.speed -= shape.speed <= -20 ? 0 : 1;
  };
  leftKey.press = () => {
    shape.steerDeg = (shape.steerDeg - 5) % 360;
    shape.setSteering(shape.steerDeg);
  };
  rightKey.press = () => {
    shape.steerDeg = (shape.steerDeg + 5) % 360;
    shape.setSteering(shape.steerDeg);
  };
  stopKey.press = () => {
    shape.stop();
  };
};

export const unbindKeyHandler = (shape) => {
  upkey.press = () => {};
  downKey.press = () => {};
  leftKey.press = () => {};
  rightKey.press = () => {};
  stopKey.press = () => {};
};

// export default keyboard;
