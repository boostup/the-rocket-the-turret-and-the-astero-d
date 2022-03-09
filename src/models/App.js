import Ship from "./Ship.js";
import Turret from "./Turret.js";

export default class App {
  constructor(canvasId) {
    this.stageCenterX = null;
    this.stageCenterY = null;
    this.canvasId = canvasId;
    this.stage = null;
    this.ship = null;
    this.shipBounds;
    this.turret = null;
    this.init();
  }

  init() {
    this.stage = new createjs.Stage(this.canvasId);

    this.setStageOriginToCenter();
    this.addShip();
    this.addTurret();

    /**
     * TICK TOCK
     */
    createjs.Ticker.on("tick", (e) => {
      this.turret.trackEnemy(this.shipBounds);
      this.detectTurretCollision();

      /** the heart of the app is pulsating right here */
      this.stage.update(e);
    });
  }

  detectTurretCollision() {
    const pt = this.ship.localToLocal(
      this.shipBounds.width / 2,
      0,
      this.turret
    );
    this.turret.alpha = 0.2;
    if (this.turret.hitTest(pt.x, pt.y)) {
      this.turret.alpha = 1;
      console.log("collision");
    }
  }

  addShip() {
    this.ship = new Ship();
    this.shipBounds = this.ship.getBounds();
    this.addChildAtPoint(this.ship, {
      x: Math.random() * this.stage.canvas.width,
      y: Math.random() * this.stage.canvas.height,
    });
  }

  addTurret() {
    this.turret = new Turret();
    this.addChildAtCenter(this.turret);
  }

  addChildAtPoint(child, pt) {
    this.stage.addChild(child);
    child.x = pt.x;
    child.y = pt.y;
  }

  addChildAtCenter(child) {
    this.addChildAtPoint(child, { x: this.stageCenterX, y: this.stageCenterY });
  }

  setStageOriginToCenter() {
    this.stageCenterX = this.stage.canvas.width / 2;
    this.stageCenterY = this.stage.canvas.height / 2;
  }
}
