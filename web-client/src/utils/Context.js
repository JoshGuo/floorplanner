import { createContext } from "react";
import { SVG_CANVAS_MODE } from "./Enums";

const defaultCanvasContext = {
  mode: SVG_CANVAS_MODE.MODE_3,
  scaleState: {
    p1: null,
    p2: null, 
    realDist: null,
    // scale: .473,
    scale: .4125
  },
  buildState: {
    shapes: [],
    currShape: null
  },
  updatePointer: true
}

const CanvasContext = createContext(defaultCanvasContext);

export {CanvasContext, defaultCanvasContext};