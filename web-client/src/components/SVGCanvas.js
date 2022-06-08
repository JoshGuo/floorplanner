import {useCallback, useMemo, useState} from 'react';
import { CanvasContext, defaultCanvasContext } from '../utils/Context.js';
// import Dot from '../utils/Dot.js';
import { SVG_CANVAS_MODE } from '../utils/Enums.js';
import BuildCanvas from './BuildCanvas.js';
import Overlay from './Overlay.js';
import ScaleCanvas from './ScaleCanvas.js';

const styles= {
  svgContainer: {
    width: '100%',
    height: '100%',
    // height: 'auto',
    // backgroundColor: 'white',
  },
  scaleInput: {
    position: 'absolute',
    left: 10,
    top: 10
  }
};

function SVGCanvas() {
  const [canvasContext, setCanvasContext] = useState(defaultCanvasContext);
  const [pointerPos, setPointerPos] = useState([0,0]);
  const {mode, scaleState, buildState} = canvasContext;
  const {p1, p2} = scaleState;
  const {shapes, currShape} = buildState;

  const updateCanvasContext = useCallback((newContext) => {
    setCanvasContext(prevContext => ({...prevContext, ...newContext}))
  }, [setCanvasContext]);

  const updateScaleState = useCallback((newScaleState) => {
    updateCanvasContext({scaleState: {...scaleState, ...newScaleState}});
  }, [updateCanvasContext, scaleState]);

  const updateBuildState = useCallback((newBuildState) => {
    updateCanvasContext({buildState: {...buildState, ...newBuildState}});
  }, [updateCanvasContext, buildState]);

  // 
  const scaleHandleClick = () => {
    if(p1 && p2) {
      updateScaleState({p1: null, p2: null, scale: null});
      updateCanvasContext({updatePointer: true});
    }

    if(!p1) {
      updateScaleState({p1: [pointerPos[0], pointerPos[1]]})
    }else if(!p2) {
      updateScaleState({p2: [pointerPos[0], pointerPos[1]]})
      updateCanvasContext({updatePointer: false});
    }
  }

  const buildHandleClick = ({pageX, pageY}) => {
    if(!currShape) {
      updateCanvasContext({updatePointer: true});
      updateBuildState({currShape: [pageX, pageY]});
    }else {
      updateBuildState({
        shapes: [...shapes, [currShape, [pointerPos[0], pointerPos[1]]]],
        currShape: null 
      });
      updateCanvasContext({updatePointer: false});
    }
  }

  const handleClick = ((e) => {
    setPointerPos([e.pageX, e.pageY]);
    switch(mode) {
      case SVG_CANVAS_MODE.SET_SCALE: 
        scaleHandleClick(e);
        break;
      case SVG_CANVAS_MODE.MODE_3:
        buildHandleClick(e);
        break;
    }
  });

  const updatePointerPos = ({pageX, pageY}) => {
    // Only update if requested by the canvas marked by state
    if(!canvasContext.updatePointer) return
    let newX = pageX;
    let newY = pageY;

    if(p1 && Math.abs(newX - p1[0]) < 7) {
      newX = p1[0];
    }
    if(p1 && Math.abs(newY - p1[1]) < 7) {
      newY = p1[1];
    }

    setPointerPos([newX, newY]);
  }

  const pointer = (
    <circle 
      r={7}
      cx={pointerPos[0]}
      cy={pointerPos[1]}
      fill="none"
      stroke="grey"
    />
  );


  const ModeInterface = () => {
    switch(mode) {
      case SVG_CANVAS_MODE.SET_SCALE: return <ScaleCanvas scaleState={scaleState}/>
      case SVG_CANVAS_MODE.MODE_3: return <BuildCanvas />
    }
  }

  return (
    <CanvasContext.Provider value={[canvasContext, updateCanvasContext, updateScaleState, updateBuildState, pointerPos]}>
      <Overlay />
      <svg style={styles.svgContainer} onMouseMove={updatePointerPos}>
        <g>
          <image href="floorplan.jpg" height="100%" style={{transform: 'rotate(.35deg)'}}/>
          <rect width="100%" height="100%" opacity={0} onClick={handleClick}/>
          <ModeInterface />
        </g>
        {canvasContext.updatePointer && pointer}
      </svg>
    </CanvasContext.Provider>
  )
}

export default SVGCanvas;