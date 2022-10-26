import p5Types from "p5";
import {
  CanvasBase,
  ICanvasBase,
  ICanvasBaseArgs,
} from "../private/CanvasBase";

// feel free to design extra types as needed
type Origin = { x: number; y: number };

// if you need any public properties add them here
export interface ICanvas extends ICanvasBase {
  origin: Origin;
}

// add any additional args here
export interface ICanvasArgs extends ICanvasBaseArgs {
  origin: Origin;
}

export class Canvas extends CanvasBase implements ICanvas {
  // don't forget to define any instance properties needed on your class
  public origin;

  // if you don't need a constructor simply omit it
  constructor(args?: ICanvasArgs) {
    // if you need a constructor make sure to call super with the args
    super(args);
    this.origin = args?.origin || { x: 50, y: 100 };
  }

  // if all you need to do is add instance properties you can assign them directly as so
  private circleWidth = 20;

  // if you don't need to add canvas events you can omit the setup function entirely
  setup = (p5: p5Types, canvasParentRef: Element) => {
    // if you do create a setup function you must call this.init(p5, canvasParentRef);
    // this will initialize the canvas and capture the reference to p5 within the class
    const canvas: p5Types.Element = this.init(p5, canvasParentRef);
    canvas.mouseMoved((event) => {
      console.log(event);
    });
  };

  // create a draw function to generate your own animation!
  public draw = () => {
    // you do not need to call demo()
    this.demo();
    this.drawCircle();
  };

  // add whatever helper methods you need!
  private drawCircle = () => {
    this.p5.ellipse(
      this.origin.x,
      this.origin.y,
      this.circleWidth,
      this.circleWidth
    );
    this.moveOrigin();
  };

  // add as many helper methods as you need!
  private moveOrigin = () => {
    this.origin.x++;
    this.origin.y += 2;
    if (this.origin.x >= this.width) {
      this.origin.x = 0;
    }
    if (this.origin.y >= this.height) {
      this.origin.y = 0;
    }
  };
}

// export a hot canvas which initializes your canvas
// in order to get hot reloads when you make changes
export const hotCanvas = new Canvas();
