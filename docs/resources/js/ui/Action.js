const CHANGE_COLOR_ACTION = "color",
  USE_BRUSH_ACTION = "brush",
  USE_PENCIL_ACTION = "pencil",
  USE_ERASER_ACTION = "eraser",
  UNDO_ACTION = "undo",
  SAVE_FRAME_ACTION = "save",
  CLEAR_CANVAS_ACTION = "clear",
  SHOW_PREVIEW_ACTION = "preview",
  KNOWN_ACTIONS = [CHANGE_COLOR_ACTION, USE_BRUSH_ACTION, USE_PENCIL_ACTION,
    USE_ERASER_ACTION, UNDO_ACTION, SAVE_FRAME_ACTION, CLEAR_CANVAS_ACTION,
    SHOW_PREVIEW_ACTION,
  ];

class Action {

  constructor(type) {
    if (!KNOWN_ACTIONS.includes(type)) {
      throw `Can not construct unkown action: ${type}`;
    }
    this.type = type;
    Object.freeze(this);
  }

}

export default Action;
export {
  CHANGE_COLOR_ACTION,
  USE_BRUSH_ACTION,
  USE_PENCIL_ACTION,
  USE_ERASER_ACTION,
  UNDO_ACTION,
  SAVE_FRAME_ACTION,
  CLEAR_CANVAS_ACTION,
  SHOW_PREVIEW_ACTION,
};