const { Container, Shape, extend, promote } = createjs;

function DraggableContainer(displayObj) {
  this.objToDrag = displayObj;
  this.Container_constructor();
  this.addChild(this.objToDrag);

  this.setupDragging();

  this.regPointDisplay = null;
  this.debugLayer = null;
  this.setDebug();
}

const DraggableContainer_prototype = extend(
  //
  DraggableContainer,
  Container
);
promote(DraggableContainer, "Container");

DraggableContainer_prototype.setupDragging = function () {
  this.on("pressmove", function (evt) {
    const bounds = this.objToDrag.getBounds();
    this.x = evt.stageX - bounds.width / 2;
    this.y = evt.stageY - bounds.height / 2;

    // Dragging works without this, but it is so much smooter with the following instruction
    this.stage.update();
  });
  this.on("pressup", function (evt) {
    console.log("released");
  });
};

export default DraggableContainer;

DraggableContainer_prototype.setDebug = function (debug = false) {
  if (debug) {
    this.setDebugLayer(true);
    this.setRegPointVisibility(true);
  }
};

DraggableContainer_prototype.setDebugLayer = function (show = false) {
  if (show) {
    this.debugLayer = new Shape();

    const bounds = this.objToDrag.getBounds();
    this.debugLayer.graphics
      .beginFill("#ABCD")
      .drawRect(0, 0, bounds.width, bounds.height);

    this.addChild(this.debugLayer);
  }
};

DraggableContainer_prototype.setRegPointVisibility = function (show = false) {
  if (show) {
    this.regPointDisplay = new Shape();
    const bounds = this.objToDrag.getBounds();
    this.debugLayer.graphics
      .beginFill("red")
      .drawCircle(bounds.width / 2, bounds.height / 2, 5);
    this.addChild(this.regPointDisplay);
  }
};
