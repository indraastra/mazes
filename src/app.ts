import { Pane } from 'tweakpane';

enum Algorithm {
  BinaryTree = "binaryTree",
  SideWinder = "sideWinder"
}

const PARAMS = {
  algorithm: Algorithm.BinaryTree,
  gridWidth: 80,
  gridHeight: 50,
  cellSize: 10,
};

const pane = new Pane();
pane.addInput(
  PARAMS, 'algorithm',
  { options: Algorithm }
);
pane.addInput(
  PARAMS, 'gridWidth',
  { min: 10, max: 200, step: 10 }
).on('change', resizeCanvas);
pane.addInput(
  PARAMS, 'gridHeight',
  { min: 10, max: 200, step: 10 }
).on('change', resizeCanvas);
pane.addInput(
  PARAMS, 'cellSize',
  { min: 5, max: 25, step: 1 }
).on('change', resizeCanvas);

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = PARAMS.cellSize * PARAMS.gridWidth;
  canvas.height = PARAMS.cellSize * PARAMS.gridHeight;
  ctx.beginPath();
  ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  ctx.stroke();
}

resizeCanvas();