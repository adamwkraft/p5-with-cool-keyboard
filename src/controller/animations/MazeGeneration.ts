// Duplicate it and make changes in the duplicated

import p5Types from "p5";
import {
  CanvasBase,
  ICanvasBase,
  ICanvasBaseArgs,
} from "../private/CanvasBase";


class MazeCell {
  public topNeighbor: MazeCell | null = null;
  public bottomNeighbor: MazeCell | null = null;
  public leftNeighbor: MazeCell | null = null;
  public rightNeighbor: MazeCell | null = null;

  // make some getters / setters
}


// if you need any public properties add them here
export interface ICanvas extends ICanvasBase {

}

// add any additional args here
export interface ICanvasArgs extends ICanvasBaseArgs {
}

export class Canvas extends CanvasBase implements ICanvas {
  private numRows: number = 50;
  private numCols: number = 60;
  private cells: MazeCell[][] = [];
  private cellWidth: number;
  private cellHeight: number;

  // if you don't need a constructor simply omit it
  constructor(args?: ICanvasArgs) {
    super(args);
    // Calculate the size of cells with respect to te canvas size
    this.cellWidth = this.width / this.numCols;
    this.cellHeight = this.height / this.numRows;

    // Initialize the cells
    for (let i = 0; i < this.numRows; i++) {
      const curRow: MazeCell[] = [];
      for (let j = 0; j < this.numCols; j++) {
        const curCell: MazeCell = new MazeCell();
        curRow.push(curCell);
      }
      this.cells.push(curRow);
    }

    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        // Randomly connect bottom neighbor
        if (Math.random() > 0.5 && i < this.numRows - 1) {
          const curCell = this.cells[i][j];
          const botCell = this.cells[i + 1][j];
          curCell.bottomNeighbor = botCell;
          botCell.topNeighbor = curCell;
        }
        // Randomly connect right neighbor
        if (Math.random() > 0.5 && j < this.numCols - 1) {
          const curCell = this.cells[i][j];
          const rightCell = this.cells[i][j + 1];
          curCell.rightNeighbor = rightCell;
          rightCell.leftNeighbor = curCell;
        }

      }
    }
  }

  // create a draw function to generate your own animation!
  public draw = () => {
    // draw a box around the canvas
    // this.p5.background(155);
    // draw each cell
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        const curCell = this.cells[i][j];
        const left = j * this.cellWidth;
        const right = (j + 1) * this.cellWidth;
        const top = i * this.cellHeight;
        const bottom = (i + 1) * this.cellHeight;
        if (i === 0) {
          // Draw the top wall
          this.p5.line(left, top, right, top);
        }
        if (j === 0) {
          // Draw the left wall
          this.p5.line(left, top, left, bottom);
        }
        if (i === this.numRows - 1 || !curCell.bottomNeighbor) {
          // Draw this bottom wall
          this.p5.line(left, bottom, right, bottom);
        }
        if (j === this.numCols - 1 || !curCell.rightNeighbor) {
          // Draw the right wall
          this.p5.line(right, top, right, bottom);
        }
      }
    }
  };
}

// export a hot canvas which initializes your canvas
// in order to get hot reloads when you make changes
export const hotCanvas = new Canvas();