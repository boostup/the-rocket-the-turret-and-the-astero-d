import Draggable, * as DraggableContainer from "./Draggable.js";

/*********************************************************/
// Class: Ship

/*********************************************************/
const VELOCITY_INCR = 5;

const { Shape, extend, promote } = createjs;

function Ship() {
  this.shape = null;
  this.setShape();
  this.Draggable_constructor(this.shape);
  this.setKeyboardCommands();
}

const Ship_prototype = extend(Ship, Draggable);
promote(Ship, "Draggable");

Ship_prototype.setShape = function () {
  const WIDTH = 66;
  const HEIGHT = 64;
  this.shape = new Shape();

  this.shape.graphics
    .beginFill("#000000")
    .lineTo(26, 0)
    .lineTo(40, 0)
    .lineTo(43, 35)
    .lineTo(64, 25)
    .lineTo(39, 62)
    .lineTo(25, 62)
    .lineTo(2, 24)
    .lineTo(20, 35);

  this.shape.setBounds(0, 0, WIDTH, HEIGHT);
};

Ship_prototype.moveBy = function (propName, moveBy) {
  this[propName] = this[propName] + moveBy;
};

Ship_prototype.setKeyboardCommands = function () {
  const KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

  const self = this;

  function keyPressed(event) {
    switch (event.keyCode) {
      case KEYCODE_LEFT:
        self.moveBy("x", -VELOCITY_INCR);
        break;
      case KEYCODE_RIGHT:
        self.moveBy("x", VELOCITY_INCR);
        break;
      case KEYCODE_UP:
        self.moveBy("y", -VELOCITY_INCR);
        break;
      case KEYCODE_DOWN:
        self.moveBy("y", VELOCITY_INCR);
        break;
    }
  }

  this.on("added", (e) => {
    document.addEventListener("keydown", keyPressed);
  });
};

export default Ship;
