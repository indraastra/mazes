export enum Fill {
    Floor,
    Wall
}

export interface Cell {
    readonly x: number;
    readonly y: number;
    fill: Fill;
}

export class Maze {
    readonly cells: Cell[][];

    constructor(public readonly width: number, public readonly height: number) {
        this.cells = [...Array(height).keys()].map(
            (i) => [...Array(width).keys()].map((j) => {
                return { x: j, y: i, fill: Fill.Wall };
            }));
    }

    fill(x: number, y: number) {
        this.cells[y][x].fill = Fill.Wall;
    }

    clear(x: number, y: number) {
        this.cells[y][x].fill = Fill.Floor;
    }

    at(x: number, y: number): Cell {
        return this.cells[y][x];
    }
}