import Draggable, * as DraggableContainer from "./Draggable.js";

/*********************************************************/
// Class: Turret
/*********************************************************/
const { Shape, extend, promote } = createjs;

function Turret() {
  this.shape = null;
  this.setShape();
  this.Draggable_constructor(this.shape);
}

const Turret_prototype = extend(Turret, Draggable);
promote(Turret, "Draggable");

Turret_prototype.setShape = function () {
  const WIDTH = 61;
  const HEIGHT = 55;
  this.shape = new Shape();

  this.shape.graphics
    .beginFill("#000000")
    .lineTo(26, 0)
    .lineTo(40, 0)
    .lineTo(46, 21)
    .lineTo(64, 25)
    .lineTo(51, 53)
    .lineTo(9, 52)
    .lineTo(2, 24)
    .lineTo(22, 21);

  this.shape.setBounds(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT);
};

Turret_prototype.trackEnemy = function (enemy) {
  /**
   * TICK TOCK
   */
  createjs.Ticker.on("tick", (e) => {
    /** the heart of this object is pulsating right here */
    self.stage.update(e);
  });
};

export default Turret;
