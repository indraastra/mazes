import { Observable, Subscriber } from "rxjs";
import { Cell, Maze } from "./maze";

// Returns an Observable of cleared Cells.
export function binaryTree(m: Maze): Observable<Cell> {
    const w = m.width;
    const h = m.height;
    return new Observable(subscriber => {
        const clear = (x: number, y: number) => {
            m.clear(x, y);
            subscriber.next(m.at(x, y));
        }
        for (let y = 1; y < h - 1; y += 2) {
            for (let x = 1; x < w - 1; x += 2) {
                clear(x, y);
                if (y < h - 2 && (Math.random() < 0.5 || x >= w - 2)) {
                    clear(x, y+1);
                } else if (x < w - 2) {
                    clear(x+1, y);
                }
            }
        }
        subscriber.complete();
    });
}
