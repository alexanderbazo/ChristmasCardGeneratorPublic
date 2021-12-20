/* global GIF */

import GifCreator from "./GifCreator.js";
import TimelineView from "./TimelineView.js";

class GifManager {

  constructor(timelineEl, previewEl) {
    this.creator = new GifCreator();
    this.creator.addEventListener("gifCreated", (event) => this.onGifCreated(event));
    this.timeline = new TimelineView(timelineEl);
    this.timeline.addEventListener("removeFrameButtonClicked", (event) => this
      .onRemoveFrameButtonClicked(event));
    this.timeline.addEventListener("frameDelaySelected", (event) => this
      .onFrameDelaySelected(event));
    this.previewEl = previewEl;
    this.previewEl.querySelector(".download").addEventListener("click", () => this.onDownloadGifButtonClicked());
  }

  addFrame(image) {
    let frame = this.creator.addFrameFromImage(image);
    this.timeline.addFrame(frame);
  }

  togglePreview() {
    this.previewEl.classList.toggle("hidden");
  }

  onGifCreated(event) {
    this.previewEl.querySelector("img").src = event.data;
  }

  onRemoveFrameButtonClicked(event) {
    let frame = this.creator.removeFrameWithId(event.data.id);
    this.timeline.removeFrame(frame);
  }

  onFrameDelaySelected(event) {
      let frame = this.creator.setDelayForFrameWithId(event.data.id, event.data.delay);
      this.timeline.updateFrame(frame);
  }

  onDownloadGifButtonClicked() {
    var link = document.createElement("a");
    link.href = this.creator.getCurrentGif();
    link.download = "ChristmasCard.gif";
    link.click();
  }
}

export default GifManager;