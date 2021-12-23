class CanvasTool {

  constructor(type, properties) {
    this.type = type;
    properties.forEach((property) => {
      this[property.name] = property.value;
    });
    Object.freeze(this);
  }

  getRepresentation() {
    return {
      type: this.type,
      size: this.lineWidth || this.radius,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
    };
  }

}

export let Brush = new CanvasTool("brush", [{
    name: "lineCap",
    value: "round",
  }, {
    name: "lineJoin",
    value: "round",
  }, {
    name: "lineWidth",
    value: 10,
  }]),
  Pencil = new CanvasTool("pencil", [{
    name: "lineCap",
    value: "round",
  }, {
    name: "lineJoin",
    value: "round",
  }, {
    name: "lineWidth",
    value: 5,
  }]),
  Eraser = new CanvasTool("eraser", [{
    name: "radius",
    value: 10,
  }]);