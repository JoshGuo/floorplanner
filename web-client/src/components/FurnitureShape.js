import { useContext, useState, useEffect } from "react";
import { CanvasContext } from "../utils/Context";

// a and b are the top left and bottom right corners of the shape
function generatePointsString(a, b, displacement) {
  return `
    ${a[0] + displacement[0]},${a[1] + displacement[1]} 
    ${a[0] + displacement[0]},${b[1] + displacement[1]} 
    ${b[0] + displacement[0]},${b[1] + displacement[1]} 
    ${b[0] + displacement[0]},${a[1] + displacement[1]}
  `;
}

function FurnitureShape({x1, y1, x2, y2, isBeingDrawn, isActive}) {
  const [{scaleState}] = useContext(CanvasContext);
  const {scale} = scaleState;
  const width = Math.abs(x1 - x2) * scale;
  const height = Math.abs(y1 - y2) * scale;

  const [isHovered, setIsHovered] = useState(false);
  const [originalPos, setOriginalPos] = useState(null);
  const [displacement, setDisplacement] = useState([0, 0]);

  const moveShape = ({pageX, pageY}) => {
    if(!isActive) return;

    if(!originalPos) {
      setOriginalPos([pageX, pageY]);
      return;
    }
      
    setDisplacement([pageX - originalPos[0], pageY - originalPos[1]]);
  }

  const dimensions = (<>
    <text 
      fontSize="20" 
      x={(x1 + x2)/2 - 70 + displacement[0]} 
      y={Math.min(y1, y2) - 10 + displacement[1]}
      fill="blue"
      stroke="blue"
    >
      {`${Math.floor(width / 12)}' ${Math.floor(width) % 12}"  |  ${width.toFixed(1)} in`}
    </text>
    <text 
      fontSize="20" 
      x={Math.max(x1, x2) + 10 + displacement[0]} 
      y={(y1 + y2)/2 + displacement[1]}
      fill="red"
      stroke="red"
    >
      {`${Math.floor(height / 12)}' ${Math.floor(height) % 12}"  |  ${height.toFixed(1)}`}
    </text>
  </>);

  /**
   * PROBLEM: How can I slide this around? I think I need to attach a full screen canvas to this that can track user mouse position.
   */
  return (
    <g>
      <polygon
        strokeLinejoin="round"
        points={generatePointsString([x1, y1], [x2, y2], displacement)}
        opacity={isActive ? .75 : 1}
        fill="lightgrey"
        fillOpacity={isHovered ? .9 : .5}
        stroke="black"
        strokeDasharray={isActive ? 10 : 0}
        strokeWidth={1}
        pointerEvents={isBeingDrawn ? "none" : "fill"}
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {(isHovered || isBeingDrawn ) && !isActive && dimensions}
    </g>
  );
}

export default FurnitureShape;