import random

from maze import Maze


def binary_tree(w, h):
    m = Maze(w*2+1, h*2+1)
    for x in range(w):
        for y in range(h):
            mx = 2*x+1
            my = 2*y+1
            # Clear all cells.
            m.clear(mx, my)
            # Clear walls selectively.
            if (random.random() < 0.5  or x == w-1) and y != h - 1:
                # Clear below.
                m.clear(mx, my+1)
            elif x != w-1:
                # Clear right.
                m.clear(mx+1, my)
    return m
