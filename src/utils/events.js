// source: https://designer.tankwars.io/scripts/global/mouseevents.js

//Mouse event controller for stage (todo: only bind events when needed) If updated remember to update Game file aswell

export function setEventFunction(name, obj) {
  const arrayName = name + 'Array';
  obj.mouse[arrayName] = [];
  obj.mouse[name] = function (fn) {
    if (fn && typeof fn === 'function') {
      const index = obj.mouse[arrayName].length;
      obj.mouse[arrayName][index] = fn;
    } else {
      for (let i = 0; i < obj.mouse[arrayName].length; i++)
        obj.mouse[arrayName][i](obj.mouse.eventData);
    }
  };
  return obj.mouse[name];
}

export const MouseEvents = (obj) => {
  obj.mouse = this;
  obj.interactive = true;
  this._clicked0 = false;
  this._clicked1 = false;
  this._clicked2 = false;
  this._dragging = false;
  this._button = 0;
  this._currentPos = new Point();
  this._lastPosition = new Point();

  //Event Actions
  this.click = setEventFunction('click', obj);
  this.rightclick = setEventFunction('rightclick', obj);
  this.middleclick = setEventFunction('middleclick', obj);
  this.down = setEventFunction('down', obj);
  this.rightdown = setEventFunction('rightdown', obj);
  this.middledown = setEventFunction('middledown', obj);
  this.up = setEventFunction('up', obj);
  this.rightup = setEventFunction('rightup', obj);
  this.middleup = setEventFunction('middleup', obj);
  this.drag = setEventFunction('drag', obj);
  this.dragend = setEventFunction('dragend', obj);
  this.dragstart = setEventFunction('dragstart', obj);
  this.rightdrag = setEventFunction('rightdrag', obj);
  this.rightdragend = setEventFunction('rightdragend', obj);
  this.rightdragstart = setEventFunction('rightdragstart', obj);
  this.middledrag = setEventFunction('middledrag', obj);
  this.middledragend = setEventFunction('middledragend', obj);
  this.middledragstart = setEventFunction('middledragstart', obj);
  this.over = setEventFunction('over', obj);
  this.out = setEventFunction('out', obj);

  //Events (real events that figures out action events)
  obj._mouseEvent = {
    mousedown: function (e) {
      obj.mouse.eventData = e.data;
      obj.mouse._button = e.data.originalEvent.button;
      obj.mouse._lastPosition.copy(e.data.global);

      //down
      if (obj.mouse._button == 0) {
        obj.mouse.down();
        obj.mouse._clicked0 = true;
      } else if (obj.mouse._button == 1) {
        obj.mouse.middledown();
        obj.mouse._clicked1 = true;
      } else if (obj.mouse._button == 2) {
        obj.mouse.rightdown();
        obj.mouse._clicked2 = true;
      }

      //Cancle current drag from other buttons
      if (obj.mouse._button == 0 && obj.mouse._dragging) {
        obj.mouse.middledragend();
        obj.mouse.rightdragend();
        obj.mouse._clicked2 = false;
        obj.mouse._clicked1 = false;
      }
      if (obj.mouse._button == 1 && obj.mouse._dragging) {
        obj.mouse.dragend();
        obj.mouse.rightdragend();
        obj.mouse._clicked2 = false;
        obj.mouse._clicked0 = false;
      }
      if (obj.mouse._button == 2 && obj.mouse._dragging) {
        obj.mouse.dragend();
        obj.mouse.middledragend();
        obj.mouse._clicked1 = false;
        obj.mouse._clicked0 = false;
      }
    },
    mouseup: function (event, hover) {
      if (hover === undefined) hover = true;

      //up
      obj.mouse.up();

      //click
      if (hover && !obj.mouse._dragging) {
        if (obj.mouse._clicked0) obj.mouse.click();
        else if (obj.mouse._clicked1) obj.mouse.middleclick();
        else if (obj.mouse._clicked2) obj.mouse.rightclick();
      }

      //dragend
      if (obj.mouse._dragging) {
        if (obj.mouse._clicked0) obj.mouse.dragend();
        else if (obj.mouse._clicked1) obj.mouse.middledragend();
        else if (obj.mouse._clicked2) obj.mouse.rightdragend();
        obj.mouse._dragging = false;
      }

      obj.mouse.eventData = null;
      event = null;

      if (obj.mouse._clicked0) obj.mouse._clicked0 = false;
      if (obj.mouse._clicked1) obj.mouse._clicked1 = false;
      if (obj.mouse._clicked2) obj.mouse._clicked2 = false;
    },
    mouseupoutside: function (event) {
      obj._mouseEvent.mouseup(event, false);
    },
    mousemove: function (e) {
      if (obj.mouse._lastPosition.equals(e.data.global)) return;

      obj.mouse._lastPosition.copy(e.data.global);

      if (!obj.mouse._clicked0 && !obj.mouse._clicked1 && !obj.mouse._clicked2)
        return;
      //dragstart

      if (!obj.mouse._dragging) {
        obj.mouse._dragging = true;
        if (obj.mouse._clicked0) obj.mouse.dragstart();
        else if (obj.mouse._clicked1) obj.mouse.middledragstart();
        else if (obj.mouse._clicked2) obj.mouse.rightdragstart();
      }

      //drag
      if (obj.mouse._dragging)
        if (obj.mouse._clicked0) obj.mouse.drag();
        else if (obj.mouse._clicked1) obj.mouse.middledrag();
        else if (obj.mouse._clicked2) obj.mouse.rightdrag();
    },
    mouseover: function () {
      //over
      obj.mouse.over();
    },
    mouseout: function () {
      //out
      obj.mouse.out();
    },
  };

  //Bind document event listeners
  obj
    //mouseover and out
    .on('mouseover', obj._mouseEvent.mouseover)
    .on('mouseout', obj._mouseEvent.mouseout)
    //mousedown
    .on('mousedown', obj._mouseEvent.mousedown)
    .on('rightdown', obj._mouseEvent.mousedown)
    .on('touchstart', obj._mouseEvent.mousedown)
    //mouseup
    .on('mouseup', obj._mouseEvent.mouseup)
    .on('rightup', obj._mouseEvent.mouseup)
    .on('touchend', obj._mouseEvent.mouseup)
    //mouseup outside
    .on('mouseupoutside', obj._mouseEvent.mouseupoutside)
    .on('rightupoutside', obj._mouseEvent.mouseupoutside)
    .on('touchendoutside', obj._mouseEvent.mouseupoutside)
    //mousemove
    .on('mousemove', obj._mouseEvent.mousemove)
    .on('touchmove', obj._mouseEvent.mousemove);
};
