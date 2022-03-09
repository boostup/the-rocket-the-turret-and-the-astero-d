/*********************************************************/
// Class: Turret
/*********************************************************/
const WIDTH = 61;
const HEIGHT = 55;

function Turret() {
  this.Container_constructor();
  this.shape = null;
  this.setShape();
  this.setBounds(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT);
  this.addChild(this.shape);
}

const p = createjs.extend(Turret, createjs.Container);
window.Turret = createjs.promote(Turret, "Container");

p.setShape = function () {
  this.shape = new createjs.Shape();
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
};

// p.trackEnemy(enemy) = function () {
//     /**
//      * TICK TOCK
//      */
//      createjs.Ticker.on("tick", (e) => {
//       /** the heart of this object is pulsating right here */
//       self.stage.update(e);
//     });
// }

export default Turret;
