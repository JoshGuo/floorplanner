import { useState } from 'react';

function ScaleCanvas({visible, scaleState}) {
  const {p1, p2 } = scaleState;

  return (
    <g>
      {p1 && p2 && (<>
        <line
          x1={p1[0]} 
          y1={p1[1]} 
          x2={p2[0]} 
          y2={p2[1]} 
          strokeWidth={8}
          stroke="purple"
          strokeOpacity={.7}
        />  
      </>)}
      {p1 && 
        <circle
          r={5}
          cx={p1[0]}
          cy={p1[1]}
          fill="lightblue"
          stroke="grey"
          opacity={.85}
        />
      }
      {p2 && 
        <circle
          r={5}
          cx={p2[0]}
          cy={p2[1]}
          fill="lightblue"
          stroke="grey"
          opacity={.85}
        />
      }
    </g>
  )
}

export default ScaleCanvas;