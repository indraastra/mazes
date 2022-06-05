from maze import Maze
from render_ascii import render_ascii

if __name__ == '__main__':
    m = Maze(10, 5)
    render_ascii(m)
    print()
    for x in range(4, 9):
        for y in range(2, 4):
            m.clear(x, y)
    render_ascii(m)