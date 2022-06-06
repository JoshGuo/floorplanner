import {ButtonGroup, Button} from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { CanvasContext } from '../utils/Context';
import { SVG_CANVAS_MODE } from '../utils/Enums';
import ScaleOverlay from './ScaleOverlay';

function Overlay() {
  const [context, updateContext] = useContext(CanvasContext);
  const {mode} = context;

  return (<>
    <Box position="absolute">
      <ButtonGroup>
        <Button variant={mode === 0 ? "contained": ''} onClick={() => updateContext({mode: SVG_CANVAS_MODE.SET_SCALE})}>Set Scale</Button>
        <Button variant={mode === 1 ? "contained": ''} onClick={() => updateContext({mode: SVG_CANVAS_MODE.RULER})}>Measure</Button>
        <Button variant={mode === 2 ? "contained": ''} onClick={() => updateContext({mode: SVG_CANVAS_MODE.MODE_3})}>Build</Button>
      </ButtonGroup>
    </Box>
    {mode === SVG_CANVAS_MODE.SET_SCALE && <ScaleOverlay />}
  </>)
}

export default Overlay;