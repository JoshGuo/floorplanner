import { useContext, useState } from "react";
import { CanvasContext } from "../utils/Context";
import FurnitureShape from "./FurnitureShape";

function BuildCanvas() {
  const [{buildState, scaleState}, , , updateBuildState, pointerPos] = useContext(CanvasContext);
  const {shapes, currShape} = buildState;

  const [activeShape, setActiveShape] = useState(null)

  return(
    <g>
      {
        shapes.map((shape, i) => 
          <g onClick={() => setActiveShape(i)}>
            <FurnitureShape x1={shape[0][0]} y1={shape[0][1]} x2={shape[1][0]} y2={shape[1][1]} isActive={i === activeShape}/>
          </g>
        )
      }
      {currShape && <FurnitureShape x1={currShape[0]} y1={currShape[1]} x2={pointerPos[0]} y2={pointerPos[1]} isBeingDrawn={true}/>}
    </g>
  )
}

export default BuildCanvas;