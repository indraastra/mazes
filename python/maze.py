from enum import Enum
from enum import Enum

class Cell(Enum):
    WALL = 0
    FLOOR = 1

class Maze:

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.grid = [[Cell.WALL] * width for _ in range(height)]

    def clear(self, x, y):
        self.grid[self.height-y-1][x] = Cell.FLOOR

