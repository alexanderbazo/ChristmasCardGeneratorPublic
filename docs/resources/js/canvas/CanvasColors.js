const COLORS = [];

class Color {

  constructor(name, rgbValues) {
    this.name = name;
    this.red = rgbValues[0];
    this.green = rgbValues[1];
    this.blue = rgbValues[2];
    Object.freeze(this);
  }

  toCSS() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  next() {
    let newColorIndex = COLORS.findIndex((color) => color.name === this
      .name) + 1;
    if (newColorIndex > COLORS.length - 1) {
      newColorIndex = 0;
    }
    return COLORS[newColorIndex];
  }
}

COLORS.push(new Color("green", [9, 85, 34]));
COLORS.push(new Color("yellow", [245, 162, 42]));
COLORS.push(new Color("red", [219, 40, 42]));
COLORS.push(new Color("cream", [255, 220, 206]));
COLORS.push(new Color("blue", [132, 204, 186]));
COLORS.push(new Color("gold", [255, 198, 77]));

export { COLORS as Colors };