class CanvasCommand {

  constructor(context, model) {
    this.context = context;
    this.precondition = this.context.getImageData(0, 0, this.context.canvas
      .width, this.context.canvas.height);
    this.model = model;
  }

  undo() {
    this.context.putImageData(this.precondition, 0, 0);
  }

  apply() {
    throw new Error("Not implemented");
  }

  smash(command) {
    this.precondition = command.precondition;
  }

}

class DrawCommand extends CanvasCommand {

  constructor(context, model, from, to) {
    super(context, model);
    this.from = from;
    this.to = to;
  }

  apply() {
    this.context.beginPath();
    this.context.moveTo(this.from.x, this.from.y);
    this.context.lineTo(this.to.x, this.to.y);
    this.context.strokeStyle = this.model.color.css;
    this.context.lineCap = this.model.tool.lineCap;
    this.context.lineJoin = this.model.tool.lineJoin;
    this.context.lineWidth = this.model.tool.size;
    this.context.stroke();
    this.context.closePath();
  }

}

class EraseCommand extends CanvasCommand {

  constructor(context, model, at) {
    super(context, model);
    this.at = at;
  }

  apply() {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = "#FFF";
    this.context.arc(this.at.x, this.at.y, this.model.tool.size, 0, Math.PI *
      2, true);
    this.context.fill();
    this.context.closePath();
    this.context.restore();
  }

}

class ClearCommand extends CanvasCommand {

  apply() {
    this.context.clearRect(0, 0, this.context.canvas
      .width, this.context.canvas.height);
  }
}

class FillCommand extends CanvasCommand {

  constructor(context, model, color) {
    super(context, model);
    this.color = color;
  }

  apply() {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.context.canvas
      .width, this.context.canvas.height);
    this.context.closePath();
    this.context.restore();
  }

}

export { DrawCommand, EraseCommand, ClearCommand, FillCommand };