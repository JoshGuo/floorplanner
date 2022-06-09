import { useState, useEffect } from "react";

function generatePointsString(a, b, displacement) {
  return `
    ${a[0] + displacement[0]},${a[1] + displacement[1]} 
    ${a[0] + displacement[0]},${b[1] + displacement[1]} 
    ${b[0] + displacement[0]},${b[1] + displacement[1]} 
    ${b[0] + displacement[0]},${a[1] + displacement[1]}
  `;
}

function EditCanvas({shape, originalLocation, finalizeEditCallback, deleteShapeCallback}) {
  const [displacement, setDisplacement] = useState([0,0]);
  const [isMoving, setIsMoving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const updateDisplacement = ({pageX, pageY}) => {
    if(!isMoving) return;

    let deltaX = pageX - originalLocation[0];
    let deltaY =  pageY - originalLocation[1];

    if(Math.abs(deltaX) < 7)
      deltaX = 0;
    if(Math.abs(deltaY) < 7)
      deltaY = 0;

    setDisplacement([deltaX, deltaY]);
  }

  useEffect(() => {
    const callback = ({code}) => {
      if(code === "Delete" || code === "Backspace") {
        console.log("delete shape");
        deleteShapeCallback()
      }
    };
    document.addEventListener("keydown", callback);
    return(() => {
      document.removeEventListener("keydown", callback)
    });
  }, [])

  return <g>
     <rect 
      width="100%" 
      height="100%"
      opacity={.3}
      fill="white"
      onClick={() => finalizeEditCallback(displacement)}
    />
    <polygon
      strokeLinejoin="round"
      points={generatePointsString([shape[0][0], shape[0][1]], [shape[1][0], shape[1][1]], displacement)}
      stroke="black"
      fill="lightblue"
      opacity={1}
      strokeWidth="2"
      transformBox="fill-box"
      // transform={`rotate(${0} ${(shape[0][0]+shape[1][0])/2 + displacement[0]} ${(shape[0][1]+shape[1][1])/2 + displacement[1]})`}
      transformOrigin="center"
      cursor="move"
      onMouseDown={() => setIsMoving(true)}
      strokeDasharray={5}
    />
    {isMoving &&
      <rect 
        width="100%" 
        height="100%"
        opacity={0}
        fill="white"
        cursor="move"
        onMouseMove={updateDisplacement}
        onMouseUp={() => setIsMoving(false)}
      />
    }
  </g>;
}

export default EditCanvas;