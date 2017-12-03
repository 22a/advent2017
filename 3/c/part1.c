// You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

// Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

// 17  16  15  14  13
// 18   5   4   3  12
// 19   6   1   2  11
// 20   7   8   9  10
// 21  22  23---> ...
// While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

// For example:

// Data from square 1 is carried 0 steps, since it's at the access port.
// Data from square 12 is carried 3 steps, such as: down, left, left.
// Data from square 23 is carried only 2 steps: up twice.
// Data from square 1024 must be carried 31 steps.
// How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

// Your puzzle input is 277678.

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef enum {RIGHT, UP, LEFT, DOWN} direction;

direction get_next_direction (direction current_direction) {
  switch(current_direction){
    case RIGHT:
      return UP;
    case UP:
      return LEFT;
    case LEFT:
      return DOWN;
    case DOWN:
      return RIGHT;
  }
}

int spiral_manhattan_distance (int target_address) {
  int current_address = 1;
  int current_path_length = 1;
  int current_x_distance_from_origin = 0;
  int current_y_distance_from_origin = 0;
  bool current_path_length_seen_before = false;
  direction current_direction = RIGHT;

  while (current_address < target_address) {
    if (current_address + current_path_length <= target_address) {
      switch (current_direction) {
        case RIGHT:
          current_x_distance_from_origin += current_path_length;
          break;
        case UP:
          current_y_distance_from_origin += current_path_length;
          break;
        case LEFT:
          current_x_distance_from_origin -= current_path_length;
          break;
        case DOWN:
          current_y_distance_from_origin -= current_path_length;
          break;
      }

      current_address += current_path_length;
      current_direction = get_next_direction(current_direction);

      if (current_path_length_seen_before) {
        current_path_length++;
        current_path_length_seen_before = false;
      } else {
        current_path_length_seen_before = true;
      }
    } else {
      int final_distance_to_target = target_address - current_address;

      switch (current_direction) {
        case RIGHT:
          current_x_distance_from_origin += final_distance_to_target;
          break;
        case UP:
          current_y_distance_from_origin += final_distance_to_target;
          break;
        case LEFT:
          current_x_distance_from_origin -= final_distance_to_target;
          break;
        case DOWN:
          current_y_distance_from_origin -= final_distance_to_target;
          break;
      }

      current_address = target_address;
    }
  }

  return abs(current_x_distance_from_origin) + abs(current_y_distance_from_origin);
}

int main () {
  int answer = spiral_manhattan_distance(277678);
  printf("%d\n", answer);

  return 0;
}
