import { Errors } from "../utils/Log.js";
import { Observable, Event } from "../utils/Observable.js";
import Action from "./Action.js";

class ActionEvent extends Event {

  constructor(action) {
    super("action", {
      actionType: action.type,
    });
  }

}

class Actionbar extends Observable {

  constructor(el) {
    super();
    this.el = el;
    this.items = el.querySelectorAll("li");
    this.items.forEach((element) => {
      element.addEventListener("click", (event) => this.onItemSelected(
        event));
    });
  }

  onItemSelected(event) {
    let actionType = event.target.getAttribute("data-item");
    try {
      let action = new Action(actionType),
        event = new ActionEvent(action);
      this.notifyAll(event);
    } catch (error) {
      Errors.log(error);
    }
  }

}

class SelectableActionbar extends Actionbar {

  constructor(el) {
    super(el);
  }

  setSelectedColor(colorName) {
    let el = Array.from(this.items).find((item) => item.getAttribute(
        "data-item") ===
      "color");
    el.className = `item icon-color ${colorName}-selector`;
  }

  setSelectedTool(toolName) {
    this.items.forEach((element) => {
      if (element.getAttribute("data-item") === toolName) {
        element.classList.add("active");
        return;
      }
      element.classList.remove("active");
    });
  }
}

export default Actionbar;
export { Actionbar, SelectableActionbar };