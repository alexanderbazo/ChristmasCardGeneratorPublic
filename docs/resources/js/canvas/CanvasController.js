import { Brush, Pencil, Eraser } from "./CanvasTools.js";
import { Observable, Event } from "../utils/Observable.js";
import {
  DrawCommand,
  EraseCommand,
  ClearCommand,
  FillCommand
} from "./CanvasCommand.js";

let history = [],
  active = false,
  shouldStartNewCommand = true,
  lastMousePosition;

class HistoryChangedEvent extends Event {

  constructor() {
    super("historyChanged");
  }

}

function getInCanvasCoordinates(event, canvas) {
  return {
    x: event.clientX - canvas.offsetLeft,
    y: event.clientY - canvas.offsetTop,
  };
}

function getCommand(context, model, currentMousePosition, lastMousePosition) {
  if (model.tool.type === Brush.type || model.tool.type === Pencil.type) {
    return new DrawCommand(context, model, lastMousePosition,
      currentMousePosition);
  }
  if (model.tool.type === Eraser.type) {
    return new EraseCommand(context, model, currentMousePosition);
  }
  return undefined;
}

function applyCommand(command) {
  command.apply();
  if (shouldStartNewCommand) {
    history.push(command);
    shouldStartNewCommand = false;
  } else {
    command.smash(history[history.length - 1]);
    history[history.length - 1] = command;
  }
}

class CanvasController extends Observable {

  constructor(el) {
    super();
    this.canvas = el;
    this.canvas.width = el.clientWidth;
    this.canvas.height = el.clientHeight;
    this.context = this.canvas.getContext("2d");
    this.canvas.addEventListener("mousemove", (event) => this
      .onMouseMovedInCanvas(event));
    this.canvas.addEventListener("mousedown", (event) => this
      .onMousePressedDownInCanvas(event));
    this.canvas.addEventListener("mouseup", (event) => this
      .onMouseReleasedInCanvas(event));
    this.canvas.addEventListener("mouseleave", (event) => this
      .onMouseLeftCanvas(event));
    applyCommand(new FillCommand(this.context, this.model, "#FFF"));
  }

  setModel(model) {
    this.model = model;
  }

  getImageAsDataURL() {
    return this.canvas.toDataURL();
  }

  undo() {
    if (history.length < 1) {
      return;
    }
    history.pop().undo();
    this.notifyAll(new HistoryChangedEvent());
  }

  clear() {
    applyCommand(new ClearCommand(this.context, this.model));
    applyCommand(new FillCommand(this.context, this.model, "#FFF"));
  }

  onMouseMovedInCanvas(event) {
    let command, mousePosition;
    if (!active) {
      return;
    }
    if (lastMousePosition === undefined) {
      lastMousePosition = getInCanvasCoordinates(event, this.canvas);
      return;
    }
    mousePosition = getInCanvasCoordinates(event, this.canvas);
    command = getCommand(this.context, this.model, mousePosition,
      lastMousePosition);
    applyCommand(command);
    lastMousePosition = mousePosition;
  }

  onMousePressedDownInCanvas() {
    active = true;
  }

  onMouseReleasedInCanvas() {
    active = false;
    shouldStartNewCommand = true;
    lastMousePosition = undefined;
  }

  onMouseLeftCanvas() {
    active = false;
    shouldStartNewCommand = true;
    lastMousePosition = undefined;
  }

}

export default CanvasController;