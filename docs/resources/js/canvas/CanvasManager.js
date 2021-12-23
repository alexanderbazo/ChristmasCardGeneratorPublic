import { Observable } from "../utils/Observable.js";
import CanvasModel from "./CanvasModel.js";
import { Brush, Pencil, Eraser } from "./CanvasTools.js";
import CanvasController from "./CanvasController.js";

class CanvasManager extends Observable {

  constructor(el) {
    super();
    this.model = new CanvasModel();
    this.model.addEventListener("modelChanged", this.onModelChanged.bind(
      this));
    this.controller = new CanvasController(el);
    this.model.init();
  }

  onModelChanged(event) {
    this.controller.setModel(event.data);
    this.notifyAll(event);
  }

  undo() {
    this.controller.undo();
  }

  clear() {
    this.controller.clear();
  }

  getImage() {
    return new Promise((resolve, reject) => {
      let dataURL = this.controller.getImageAsDataURL(),
        image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject();
      image.src = dataURL;
    });
  }

  useBrush() {
    this.model.setTool(Brush);
  }

  usePencil() {
    this.model.setTool(Pencil);
  }

  useEraser() {
    this.model.setTool(Eraser);
  }

  changeColor() {
    this.model.shiftColor();
  }

}

export default CanvasManager;