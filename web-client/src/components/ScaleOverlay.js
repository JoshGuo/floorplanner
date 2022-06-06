import { useContext } from "react";
import { CanvasContext } from "../utils/Context";
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

function ScaleOverlay() {
  const [{scaleState}, , updateScaleState] = useContext(CanvasContext);
  const labelPos = scaleState.p1 && scaleState.p2 ? [(scaleState.p1[0] + scaleState.p2[0]) / 2 + 5, (scaleState.p1[1] + scaleState.p2[1]) / 2 - 15] : null;

  const handleRealDist = (realDist) => {
    const {p1, p2} = scaleState;
    const pxDist = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    updateScaleState({realDist: realDist, scale: realDist / pxDist})
  }

  if(!labelPos) return;
  
  return (
    <Box sx={{position: 'absolute', left: labelPos[0], top: labelPos[1], backgroundColor: 'white'}}>
      <TextField size="small" defaultValue={scaleState.realDist} label="Real Distance" onChange={(e) => handleRealDist(Number(e.target.value))}/>
    </Box>
  );
}

export default ScaleOverlay;