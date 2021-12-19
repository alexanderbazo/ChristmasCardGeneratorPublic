import { Observable, Event } from "../utils/Observable.js";

class ActionBar extends Observable {

  constructor(el) {
    super();
    this.el = el;
    this.items = el.querySelectorAll("li");
    this.items.forEach((element) => {
      element.addEventListener("click", (event) => this.onItemSelected(event));
    });
  }

  onItemSelected(event) {
    let actionType = event.target.getAttribute("data-item");
    this.notifyAll(new Event("action", actionType));
  }

}

export default ActionBar;