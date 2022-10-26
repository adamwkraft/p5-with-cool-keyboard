import p5Types from "p5";

export interface ICanvasBase {
  key: number;
  width: number;
  height: number;
  setup: (p5: p5Types, canvasParentRef: Element) => void;
  draw: () => void;
}

export interface ICanvasBaseArgs {
  width?: number;
  height?: number;
  hotReloadCanvas?: boolean;
}

export class CanvasBase implements ICanvasBase {
  key: number;
  width: number;
  height: number;
  // @ts-expect-error
  protected p5: p5Types;

  constructor(args: ICanvasBaseArgs = { hotReloadCanvas: true }) {
    // using a random key will ensure that the canvas is reset when hot reloading
    this.key = args.hotReloadCanvas ? Math.random() : 1;
    this.width = args.width || 500;
    this.height = args.height || 500;
  }

  public setup = (p5: p5Types, canvasParentRef: Element) => {
    this.init(p5, canvasParentRef);
  };

  protected init = (p5: p5Types, canvasParentRef: Element) => {
    this.p5 = p5;
    const canvas = p5
      .createCanvas(this.width, this.height)
      .parent(canvasParentRef);

    return canvas;
  };

  public draw = () => {
    this.demo();
  };

  // an example drawing for inspiration
  protected demo = () => {
    this.p5.strokeWeight(10);
    Array.from({ length: 5 }).forEach((_, idx, arr) => {
      const multiplier = arr.length - idx - 1;
      const x = this.width / 2;
      const y = this.height / 2;
      const width = Math.random() * 5 + 70 * multiplier;
      const height = Math.random() * 5 + 70 * multiplier;
      this.p5.ellipse(x, y, width, height * 1);
    });
  };
}
