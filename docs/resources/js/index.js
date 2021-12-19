import Actionbar from "./ui/Actionbar.js";
import SelectableActionbar from "./ui/SelectableActionbar.js";
import Canvas from "./canvas/Canvas.js";
import GifManager from "./gif/GifManager.js";

let canvas,
  actionbar,
  toolbar,
  gif;

function init() {
  initCanvas();
  initItembars();
  initGifGenerator();
}

function initCanvas() {
  let canvasEl = document.querySelector("canvas");
  canvas = new Canvas(canvasEl);
  canvas.addEventListener("canvasModelChanged", onCanvasModelChanged);
}

function initItembars() {
  let actionbarEl = document.querySelector(".actions"),
    toolbarEl = document.querySelector(".toolbar");
  actionbar = new Actionbar(actionbarEl);
  actionbar.addEventListener("action", onActionSelected);
  toolbar = new SelectableActionbar(toolbarEl);
  toolbar.addEventListener("action", onToolSelected);
}

function initGifGenerator() {
  let timelineEl = document.querySelector(".timeline .frames"),
    previewEl = document.querySelector(".preview");
  gif = new GifManager(timelineEl, previewEl);
}

function onCanvasModelChanged(event) {
  toolbar.setSelectedColor(event.data.color.name);
  toolbar.setSelectedTool(event.data.tool.type);
}

function onActionSelected(event) {
  switch (event.data) {
    case "undo":
      canvas.undo();
      break;
    case "clear":
      canvas.clear();
      break;
    case "save":
      canvas.getImage().then((image) => gif.addFrame(image));
      break;
    case "preview":
      gif.togglePreview();
      break;
    default:
      return;
  }
}

function onToolSelected(event) {
  switch (event.data) {
    case "color":
      canvas.changeColor();
      break;
    case "brush":
      canvas.useBrush();
      break;
    case "pencil":
      canvas.usePencil();
      break;
    case "eraser":
      canvas.useEraser();
      break;
    default:
      return;
  }
}

init();