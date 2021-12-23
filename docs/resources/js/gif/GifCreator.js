/* global GIF */
import { Observable, Event } from "../utils/Observable.js";
import AUID from "../utils/AUID.js";

class GifCreatedEvent extends Event {

  constructor(gif) {
    super("gifCreated", gif);
  }

}

const DEFAULTS = {
  delay: 100,
  numberOfWorkers: 2,
  workerScript: "vendors/gif.js/gif.worker.js",
  quality: 10,
};

function createGif(frames) {
  return new Promise(function(resolve, reject) {
    let gif;
    gif = new GIF({
      workers: DEFAULTS.numberOfWorkers,
      workerScript: DEFAULTS.workerScript,
      width: frames[0].image.width,
      height: frames[0].image.height,
      quality: DEFAULTS.quality,
    });
    frames.forEach((frame) => gif.addFrame(frame.image, {
      delay: frame.delay,
    }));
    gif.on("finished", (blob) => resolve(URL.createObjectURL(blob)));
    gif.on("abort", () => reject());
    gif.render();
  });
}

class Frame {

  constructor(image, delay = DEFAULTS.delay) {
    this.id = new AUID();
    this.image = image;
    this.delay = delay;
  }

}

class GifCreator extends Observable {

  constructor() {
    super();
    this.frames = [];
  }

  addFrameFromImage(image) {
    let frame = new Frame(image);
    this.frames.push(frame);
    this.render();
    return frame;
  }

  removeFrameWithId(id) {
    let indexOfFrameToBeRemoved = this.frames.findIndex((frame) => frame.id
        .equals(id)),
      removedFrame = this.frames.splice(indexOfFrameToBeRemoved, 1)[0];
    this.render();
    return removedFrame;
  }

  setDelayForFrameWithId(id, delay) {
    let updatedFrame = this.frames.find((frame) => frame.id.equals(id));
    updatedFrame.delay = delay;
    this.render();
    return updatedFrame;
  }

  getCurrentGif() {
    return this.gif;
  }

  render() {
    if (this.frames.length === 0) {
      return;
    }
    createGif(this.frames).then((gif) => {
      this.gif = gif;
      this.notifyAll(new GifCreatedEvent(gif));
    });
  }

}

export default GifCreator;