import { useContext, useState, useCallback } from "react";
import { CanvasContext } from "../utils/Context";
import EditCanvas from "./EditCanvas";
import FurnitureShape from "./FurnitureShape";

function BuildCanvas() {
  const [{buildState}, updateContext, , updateBuildState, pointerPos] = useContext(CanvasContext);
  const {shapes, currShape} = buildState;

  const [activeShape, setActiveShape] = useState(null);
  const [originalLocation, setOriginalLocation] = useState(null);

  const initEdit = ({pageX, pageY}, shape) => {
    setActiveShape(shape);
    setOriginalLocation([pageX, pageY]);
  }

  const finalizeEdit = useCallback((displacement) => {  
    const oldShape = shapes[activeShape];
    const updatedShape = [
      [
        oldShape[0][0] + displacement[0], 
        oldShape[0][1] + displacement[1], 
      ],
      [
        oldShape[1][0] + displacement[0], 
        oldShape[1][1] + displacement[1], 
      ]
    ];

    let newShapes = [...shapes];
    newShapes.splice(activeShape, 1);
    newShapes.push(updatedShape);

    setActiveShape(null);
    updateBuildState({
      shapes: newShapes
    });
  }, [activeShape, shapes, updateBuildState]);

  const deleteShape = useCallback(() => {
    let newShapes = [...shapes];
    newShapes.splice(activeShape, 1);

    setActiveShape(null);
    updateBuildState({
      shapes: newShapes
    });
  }, [activeShape, shapes, updateBuildState])

  return(<>
      <g>
        {
          shapes.map((shape, i) => 
            <g onClick={(e) => initEdit(e, i)}>
              <FurnitureShape x1={shape[0][0]} y1={shape[0][1]} x2={shape[1][0]} y2={shape[1][1]} isActive={i === activeShape}/>
            </g>
          )
        }
        {currShape && <FurnitureShape x1={currShape[0]} y1={currShape[1]} x2={pointerPos[0]} y2={pointerPos[1]} rotation={currShape[2]} isBeingDrawn={true}/>}
      </g>
      {activeShape !== null && 
        <svg width="100%" height="100%">
          <EditCanvas shape={shapes[activeShape]} originalLocation={originalLocation} finalizeEditCallback={finalizeEdit} deleteShapeCallback={deleteShape}/>
        </svg>}
    </>
  )
}

export default BuildCanvas;