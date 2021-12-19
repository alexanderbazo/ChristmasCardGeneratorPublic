import Actionbar from "./Actionbar.js";

class SelectableActionBar extends Actionbar {

  constructor(el) {
    super(el);
  }

  setSelectedColor(colorName) {
    let el = Array.from(this.items).find((item) => item.getAttribute("data-item") ===
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

export default SelectableActionBar;