import * as Actions from "./ui/Action.js";
import { Actionbar, SelectableActionbar } from "./ui/Actionbar.js";
import CanvasManager from "./canvas/CanvasManager.js";
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
  canvas = new CanvasManager(canvasEl);
  canvas.addEventListener("modelChanged", onCanvasModelChanged);
}

function initItembars() {
  let actionbarEl = document.querySelector(".actions"),
    toolbarEl = document.querySelector(".toolbar");
  actionbar = new Actionbar(actionbarEl);
  actionbar.addEventListener("action", onAction);
  toolbar = new SelectableActionbar(toolbarEl);
  toolbar.addEventListener("action", onAction);
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

function onAction(event) {
  let action = event.data;
  switch (action.actionType) {
    case Actions.CHANGE_COLOR_ACTION:
      canvas.changeColor();
      break;
    case Actions.USE_BRUSH_ACTION:
      canvas.useBrush();
      break;
    case Actions.USE_PENCIL_ACTION:
      canvas.usePencil();
      break;
    case Actions.USE_ERASER_ACTION:
      canvas.useEraser();
      break;
    case Actions.UNDO_ACTION:
      canvas.undo();
      break;
    case Actions.SAVE_FRAME_ACTION:
      canvas.getImage().then((image) => gif.addFrame(image));
      break;
    case Actions.CLEAR_CANVAS_ACTION:
      canvas.clear();
      break;
    case Actions.SHOW_PREVIEW_ACTION:
      gif.togglePreview();
      break;
    default:
      break;
  }
}

init();