//TODO 11 | Abstrakte Repräsentation möglicher Zeichenoperationen als Werkzeug
class CanvasTool {

  constructor(type, properties) {
    this.type = type;
    properties.forEach((property) => {
      this[property.name] = property.value;
    });
    Object.freeze(this);
  }

  //TODO 12 | Mapping der konkreten Canvas-Parameter für dieses Werkzeug
  getRepresentation() {
    return {
      type: this.type,
      size: this.lineWidth || this.radius,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
    };
  }

}

//TODO 13 | Festlegen der verfügbaren Werkzeuge
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