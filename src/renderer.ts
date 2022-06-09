import { delay, Observable, pairwise } from "rxjs";
import { Cell, Fill, Maze } from "./maze";

const CHAR_BY_CELL = {
    [Fill.Floor]: '.',
    [Fill.Wall]: '#',
};

export function renderToConsole(m: Maze, g: Observable<Cell>) {
    g.subscribe({
        next(c) {
            console.log('Cleared:', c);
            const rows = [];
            m.cells.forEach(row => {
                rows.push(row.map(cell => CHAR_BY_CELL[cell.fill]).join(''));
            })
            console.log(rows.join('\n'));
        },
        complete() { console.log('Completed!'); }
    })
}

export function renderToCanvas(canvas: HTMLCanvasElement, m: Maze, g: Observable<Cell>, params: any) {
    // Initialize canvas.
    const size = params.cellSize;
    canvas.width = size * m.width;
    canvas.height = size * m.height;

    const drawCell = (c: Cell, color?: string) => {
        const { x, y, fill } = c;
        ctx.fillStyle = color ?? (fill === Fill.Floor ? params.floorColor : params.wallColor);
        ctx.fillRect(x * size, y * size, size, size);
    };

    const ctx = canvas.getContext("2d");
    m.cells.forEach(row => {
        row.forEach(cell => {
            drawCell(cell)
        })
    })

    let final = null;
    g.pipe(pairwise()).subscribe({
        next([p, c]) {
            drawCell(p);
            drawCell(c, '#f05');
            final = c;
        },
        complete() {
            if (final) drawCell(final);
        }
    })
}