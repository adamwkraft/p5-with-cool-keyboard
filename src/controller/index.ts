import * as Demo from "./animations/Demo";
import * as MazeGeneration from "./animations/MazeGeneration";
import * as MengerSponge3D from "./animations/MengerSponge3D";

export const animations = [
  { hotCanvas: Demo.hotCanvas, name: "Demo" },
  { hotCanvas: MazeGeneration.hotCanvas, name: "MazeGeneration" },
  { hotCanvas: MengerSponge3D.hotCanvas, name: "MengerSponge3D" },
];
