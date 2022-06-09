import { Observable, of, Subject, } from 'rxjs';
import { share, concatMap, delay, takeUntil } from 'rxjs/operators';
import { Pane } from 'tweakpane';
import { binaryTree } from './generator';
import { Cell, Maze } from './maze';
import { renderToConsole, renderToCanvas } from './renderer';

enum Algorithm {
  BinaryTree = "binaryTree",
  SideWinder = "sideWinder"
}

const GEN_PARAMS = {
  algorithm: Algorithm.BinaryTree,
  gridWidth: 19,
  gridHeight: 13,
};
const REN_PARAMS = {
  cellSize: 10,
  wallColor: '#1a1a1a',
  floorColor: '#c6d6f6',
};

/* Tweakpane setup */
function initPane(resetMaze: Subject<void>) {
  const pane = new Pane();
  const genFolder = pane.addFolder({
    title: 'Generator',
    expanded: true,
  });

  genFolder.addInput(
    GEN_PARAMS, 'algorithm',
    { options: Algorithm }
  );
  genFolder.addInput(
    GEN_PARAMS, 'gridWidth',
    { min: 5, max: 201, step: 1 }
  ).on('change', () => resetMaze.next());
  genFolder.addInput(
    GEN_PARAMS, 'gridHeight',
    { min: 5, max: 201, step: 1 }
  ).on('change', () => resetMaze.next());

  const renFolder = pane.addFolder({
    title: 'Renderer',
    expanded: true,
  });
  renFolder.addInput(
    REN_PARAMS, 'cellSize',
    { min: 5, max: 25, step: 1 }
  ).on('change', () => resetMaze.next());
  renFolder.addInput(REN_PARAMS, 'wallColor');
  renFolder.addInput(REN_PARAMS, 'floorColor');

  pane.addButton({
    title: 'START',
  }).on('click', () => resetMaze.next());
}

function makeGenerator(m: Maze, algo: Algorithm): Observable<Cell> {
  switch (algo) {
    case Algorithm.BinaryTree:
      return binaryTree(m);
    case Algorithm.SideWinder:
      throw new Error('Sidewinder not implemented');
  }
}

function initMaze(resetMaze: Subject<void>) {
  const m = new Maze(GEN_PARAMS.gridWidth, GEN_PARAMS.gridHeight);
  const g = makeGenerator(m, GEN_PARAMS.algorithm).pipe(
    concatMap(c => of(c).pipe(delay(17))),
    takeUntil(resetMaze),
    share());
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  renderToCanvas(canvas, m, g, REN_PARAMS);
  // renderToConsole(m, g);
}

const resetMaze = new Subject<void>();
initPane(resetMaze);
resetMaze.subscribe(() => initMaze(resetMaze));
resetMaze.next();