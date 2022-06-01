//TODO 21 | Repräsentation einer einzelnen Zeichenoperation auf dem Canvas
class CanvasCommand {

  //TODO 22 | Konstruktor erhält alle Informationen zum Ausführen der Operation
  constructor(context, model) {
    this.context = context;
    this.precondition = this.context.getImageData(0, 0, this.context.canvas
      .width, this.context.canvas.height);
    this.model = model;
  }

  //TODO 24 | Operation wird rückgängig gemacht
  undo() {
    this.context.putImageData(this.precondition, 0, 0);
  }

  //TODO 23 | Operation wird angewendet
  apply() {
    throw new Error("Not implemented");
  }

  //TODO 24 | Operation wird mit nachfolgender Operation verbunden
  smash(command) {
    this.precondition = command.precondition;
  }

}

//TODO 25 | Zeichnen
class DrawCommand extends CanvasCommand {

  constructor(context, model, from, to) {
    super(context, model);
    this.from = from;
    this.to = to;
  }

  apply() {
    //TODO 3 | Teaser: Hier wird gezeichnet
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

//TODO 26 | Radieren
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

//TODO 27 | Löschen
class ClearCommand extends CanvasCommand {

  apply() {
    this.context.clearRect(0, 0, this.context.canvas
      .width, this.context.canvas.height);
  }
}

//TODO 28 | Füllen
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