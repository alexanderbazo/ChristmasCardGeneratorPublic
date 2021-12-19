/* global GIF */

import { Observable, Event } from "../utils/Observable.js";
import Frame from "./Frame.js";
import TimelineView from "./TimelineView.js";

function createGif(frames) {
  return new Promise(function(resolve, reject) {
    let gif;
    if(frames.length === 0) {
        reject();
    }
    gif = new GIF({
        workers: 2,
        workerScript: "vendors/gif.js/gif.worker.js",
        width: frames[0].image.width,
        height: frames[0].image.height,
        quality: 10,
      });
    frames.forEach((frame) => gif.addFrame(frame.image, {
        delay: frame.delay}));

    gif.on("finished", function(blob) {
      resolve(URL.createObjectURL(blob));
    });

    gif.render();
  });
}

class GifManager extends Observable {

  constructor(timelineEl, previewEl) {
    super();
    this.frames = [];
    this.timeline = new TimelineView(timelineEl);
    this.timeline.addEventListener("removeFrameButtonClicked", (event) => this
      .onRemoveFrameButtonClicked(event));
    this.timeline.addEventListener("frameDelaySelected", (event) => this
      .onFrameDelaySelected(event));
    this.previewEl = previewEl;
    this.previewEl.querySelector(".download").addEventListener("click", () => this.onDownloadGifButtonClicked());
  }

  addFrame(image) {
    let frame = new Frame(image);
    this.frames.push(frame);
    this.timeline.addFrame(frame);
    createGif(this.frames).then((gif) => this.updatePreview(gif));
  }

  togglePreview() {
    this.previewEl.classList.toggle("hidden");
  }

  updatePreview(gif) {
    this.previewEl.querySelector("img").src = gif;
  }

  onRemoveFrameButtonClicked(event) {
    let indexOfFrameToBeRemoved = this.frames.findIndex((frame) => frame.id
        .equals(event.data.id)),
      removedFrame = this.frames.splice(indexOfFrameToBeRemoved, 1)[0];
    this.timeline.removeFrame(removedFrame);
    createGif(this.frames).then((gif) => this.updatePreview(gif));
  }

  onFrameDelaySelected(event) {
    let frameToBeUpdated = this.frames.find((frame) => frame.id.equals(event
      .data.id));
    frameToBeUpdated.delay = event.data.delay;
    this.timeline.updateFrame(frameToBeUpdated);
    createGif(this.frames).then((gif) => this.updatePreview(gif));
  }

  onDownloadGifButtonClicked() {
    var link = document.createElement("a");
    link.href = this.previewEl.querySelector("img").src;
    link.download = "ChristmasCard.gif";
    link.click();
  }
}

export default GifManager;