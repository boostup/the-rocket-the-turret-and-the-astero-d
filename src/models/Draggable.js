const { Container, Shape, extend, promote } = createjs;

function DraggableContainer(displayObj) {
  this.objToDrag = displayObj;
  this.Container_constructor();
  this.addChild(this.objToDrag);

  this.debugLayer = null;
  this.setDebugLayer();
  this.setupDrag();
}

const DraggableContainer_prototype = extend(
  //
  DraggableContainer,
  Container
);
promote(DraggableContainer, "Container");

DraggableContainer_prototype.setupDrag = function () {
  this.on("pressmove", function (evt) {
    this.x = evt.stageX - evt.target.x;
    this.y = evt.stageY - evt.target.y;

    // Dragging works without this, but it is so much smooter with the following instruction
    this.stage.update();
  });
  this.on("pressup", function (evt) {
    console.log("released");
  });
};

export default DraggableContainer;

DraggableContainer_prototype.setDebugLayer = function (show = false) {
  if (show) {
    this.debugLayer = new Shape();
    const pad = 0;
    const bounds = this.objToDrag.getBounds();

    this.debugLayer.graphics
      .beginFill("#ABCD")
      .drawRect(
        pad + bounds.x,
        pad + bounds.y,
        bounds.width + pad,
        bounds.height + pad
      );

    this.addChild(this.debugLayer);
  }
};
