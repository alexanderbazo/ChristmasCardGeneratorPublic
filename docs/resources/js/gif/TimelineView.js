import { Observable, Event } from "../utils/Observable.js";

const FRAME_TEMPLATE = document.querySelector("#frame-template").innerHTML
  .trim();

class RemoveFrameButtonClickedEvent extends Event {

  constructor(frameId) {
    super("removeFrameButtonClicked", {
      id: frameId,
    });
  }

}

class FrameDelaySelectedEvent extends Event {

  constructor(frameId, frameDelay) {
    super("frameDelaySelected", {
      id: frameId,
      delay: frameDelay,
    });
  }

}

function createViewFromFrame(context, frame) {
  let frameEl = document.createElement("div");
  frameEl.innerHTML = FRAME_TEMPLATE;
  frameEl = frameEl.firstChild;
  frameEl.setAttribute("data-id", frame.id.asString());
  frameEl.querySelector("img").src = frame.image.src;
  frameEl.querySelector(`.time-selector [data-delay="${frame.delay}"]`)
    .classList.add("selected");
  frameEl.querySelector(".trash").addEventListener("click",
    onRemoveFrameButtonClicked.bind(context, frame.id));
  frameEl.querySelector(".time-selector").addEventListener("click",
    onFrameDelaySelected.bind(context, frame.id));
  return frameEl;
}

function onRemoveFrameButtonClicked(id) {
  this.notifyAll(new RemoveFrameButtonClickedEvent(id));
}

function onFrameDelaySelected(id, event) {
  if (!event.target.classList.contains("time")) {
    return;
  }
  this.notifyAll(new FrameDelaySelectedEvent(id, event.target.getAttribute(
    "data-delay")));
}

class TimelineView extends Observable {

  constructor(el) {
    super();
    this.el = el;
  }

  addFrame(frame) {
    let view = createViewFromFrame(this, frame);
    this.el.append(view);
  }

  updateFrame(frame) {
    let frameEl = this.el.querySelector(`[data-id="${frame.id.asString()}"]`);
    frameEl.querySelector("img").src = frame.image.src;
    frameEl.querySelector(".time-selector .selected").classList.remove(
      "selected");
    frameEl.querySelector(`.time-selector [data-delay="${frame.delay}"]`)
      .classList.add("selected");
  }

  removeFrame(frame) {
    this.el.querySelector(`[data-id="${frame.id.asString()}"]`).remove();
  }

}

export default TimelineView;