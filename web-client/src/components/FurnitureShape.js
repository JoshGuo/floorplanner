import { useContext, useState } from "react";
import { CanvasContext } from "../utils/Context";

// a and b are the top left and bottom right corners of the shape
function generatePointsString(a, b) {
  return `
    ${a[0]},${a[1]} 
    ${a[0]},${b[1]} 
    ${b[0]},${b[1]} 
    ${b[0]},${a[1]}
  `;
}

function FurnitureShape({x1, y1, x2, y2, rotation, isBeingDrawn, isActive}) {
  const [{scaleState}] = useContext(CanvasContext);
  const {scale} = scaleState;
  const width = Math.abs(x1 - x2) * scale;
  const height = Math.abs(y1 - y2) * scale;

  const [isHovered, setIsHovered] = useState(false);

  const dimensions = (<>
    <text 
      fontSize="20" 
      x={(x1 + x2)/2 - 70} 
      y={Math.min(y1, y2) - 10}
      fill="blue"
      stroke="blue"
    >
      {`${Math.floor(width / 12)}' ${Math.floor(width) % 12}"  |  ${width.toFixed(1)} in`}
    </text>
    <text 
      fontSize="20" 
      x={Math.max(x1, x2) + 10} 
      y={(y1 + y2)/2}
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
        points={generatePointsString([x1, y1], [x2, y2])}
        opacity={isActive ? .75 : 1}
        fill="lightgrey"
        fillOpacity={isHovered ? .9 : .5}
        stroke="black"
        strokeWidth={1}
        pointerEvents={isBeingDrawn ? "none" : "fill"}
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transformBox="fill-box"
        transform={`rotate(${0} ${(x1+x2)/2} ${(y1+y2)/2})`}
        transformOrigin="center"
      />
      {(isHovered || isBeingDrawn ) && !isActive && dimensions}
    </g>
  );
}

export default FurnitureShape;