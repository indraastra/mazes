from maze import Cell, Maze

CHAR_BY_CELL = {
    Cell.FLOOR: '·',
    Cell.WALL: '▓'
}

def render_ascii(maze: Maze):
    print(f'Rendering maze of size {maze.width}w x {maze.height}h')
    for row in maze.grid:
        print(''.join(CHAR_BY_CELL[c] for c in row))