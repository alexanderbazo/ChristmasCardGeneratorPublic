import { Brush } from "./CanvasTools.js";
import { Colors } from "./CanvasColors.js";
import { Observable, Event } from "../utils/Observable.js";

class ModelChangedEvent extends Event {

  constructor(model) {
    super("modelChanged", createModelRepresentation(model));
  }

}

function createModelRepresentation(model) {
  return {
    tool: model.tool.getRepresentation(),
    color: {
      name: model.color.name,
      css: model.color.toCSS(),
    },
  };
}

//TODO 6 | Model bündelt alle relevanten Informationen zur aktuellen Zeichenkonfiguration des Canvas
class CanvasModel extends Observable {

  constructor() {
    super();
  }

  init() {
    this.color = Colors[0]; //TODO 7 | Welche Farbe soll verwendet werden?
    this.tool = Brush; //TODO 8 | Welches Werkzeug soll verwendet werden?
    this.notifyAll(new ModelChangedEvent(this));
  }

  setTool(tool) {
    this.tool = tool;
    this.notifyAll(new ModelChangedEvent(this));
  }

  shiftColor() {
    this.color = this.color.next();
    this.notifyAll(new ModelChangedEvent(this));
  }

}

export default CanvasModel;