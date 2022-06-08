import { useEffect, useState } from "react";

function generatePointsString(a, b, displacement) {
  return `
    ${a[0] + displacement[0]},${a[1] + displacement[1]} 
    ${a[0] + displacement[0]},${b[1] + displacement[1]} 
    ${b[0] + displacement[0]},${b[1] + displacement[1]} 
    ${b[0] + displacement[0]},${a[1] + displacement[1]}
  `;
}

function EditCanvas({shape, originalLocation, finalizeEditCallback}) {
  const [displacement, setDisplacement] = useState([0,0]);

  const updateDisplacement = ({pageX, pageY}) => {
    let deltaX = pageX - originalLocation[0];
    let deltaY =  pageY - originalLocation[1];

    if(Math.abs(deltaX) < 7)
      deltaX = 0;
    if(Math.abs(deltaY) < 7)
      deltaY = 0;

    setDisplacement([deltaX, deltaY]);
  }

  return <g>
     <rect 
      width="100%" 
      height="100%"
      opacity={.4}
      fill="white"
    />
    <polygon
      strokeLinejoin="round"
      points={generatePointsString([shape[0][0], shape[0][1]], [shape[1][0], shape[1][1]], displacement)}
      stroke="black"
      fill="lightblue"
      opacity={.7}
      strokeWidth="2"
    />
    <rect 
      width="100%" 
      height="100%"
      opacity={0}
      fill="white"
      cursor="move"
      onMouseMove={updateDisplacement}
      onMouseUp={() => finalizeEditCallback(displacement)}
    />
  </g>;
}

export default EditCanvas;