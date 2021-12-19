import { Observable, Event } from "../utils/Observable.js";

const COLORS = [{
    name: "green",
    css: "rgb(9, 85, 34)",
  }, {
    name: "yellow",
    css: "rgb(245, 162, 42)",
  }, {
    name: "red",
    css: "rgb(219, 40, 42)",
  }, {
    name: "cream",
    css: "rgb(255, 220, 206)",
  }, {
    name: "blue",
    css: "rgb(132, 204, 186)",
  }, {
    name: "gold",
    css: "rgb(255, 198, 77)",
  }],
  TOOLS = [{
    type: "brush",
    lineCap: "round",
    lineWidth: 10,
  }, {
    type: "pencil",
    lineCap: "round",
    lineWidth: 5,
  }, {
    type: "eraser",
    radius: 10,
  }];

function createModelRepresentation(model) {
  return {
    tool: {
      type: model.tool.type,
      size: model.tool.lineWidth || model.tool.radius,
      lineCap: model.tool.lineCap,
    },
    color: {
      name: model.color.name,
      css: model.color.css,
    },
  };
}

class CanvasModel extends Observable {

  constructor() {
    super();
  }

  init() {
    this.color = COLORS[0];
    this.tool = TOOLS[0];
    this.notifyAll(new Event("modelChanged", createModelRepresentation(this)));
  }

  setTool(toolType) {
    let tool = TOOLS.find((tool) => tool.type === toolType);
    if (tool !== undefined) {
      this.tool = tool;
      this.notifyAll(new Event("modelChanged", createModelRepresentation(this)));
    }
  }

  shiftColor() {
    let newColorIndex = COLORS.findIndex((color) => color.name === this
      .color
      .name) + 1;
    if (newColorIndex > COLORS.length - 1) {
      newColorIndex = 0;
    }
    this.color = COLORS[newColorIndex];
    this.notifyAll(new Event("modelChanged", createModelRepresentation(this)));
  }


}

export default CanvasModel;