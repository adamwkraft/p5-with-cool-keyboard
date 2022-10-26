import { CanvasBase } from "controller/private/CanvasBase";
import React from "react";
import Sketch from "react-p5";

interface CanvasProps {
  canvas: CanvasBase;
}

const CanvasComponent: React.FC<CanvasProps> = ({ canvas }) => {
  // using a random key will cause a new canvas to render when changes are detected
  return <Sketch key={canvas.key} setup={canvas.setup} draw={canvas.draw} />;
};

export default CanvasComponent;
