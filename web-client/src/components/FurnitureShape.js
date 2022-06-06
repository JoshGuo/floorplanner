import { useContext, useState } from "react";
import { CanvasContext } from "../utils/Context";

function FurnitureShape({x1, y1, x2, y2, isBeingDrawn, isActive}) {
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
      {`${Math.floor(width / 12)}' ${Math.floor(width) % 12}"  |  `}
      {`${width.toFixed(1)} in`}
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
  </>)

  return (
    <g>
      <polygon
        strokeLinejoin="round"
        points={`${x1},${y1} ${x1},${y2} ${x2},${y2} ${x2},${y1}`}
        stroke="black"
        fill={isActive ? "lightblue" : isHovered ? "grey" : "lightgrey"}
        strokeWidth="2"
        pointerEvents={isBeingDrawn ? "none" : "fill"}
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {(isHovered || isBeingDrawn) && dimensions}
    </g>
  );
}

export default FurnitureShape;