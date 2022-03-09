import App from "./models/App.js";

(function Appstart(canvasId) {
  "use strict";

  function init() {
    new App(canvasId);
  }
  init();
})("stage");
