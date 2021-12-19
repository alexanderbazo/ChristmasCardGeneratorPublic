import UUID from "../utils/UUID.js";

class Frame {

  constructor(image, delay = 100) {
    this.id = new UUID();
    this.image = image;
    this.delay = delay;
  }

}

export default Frame;