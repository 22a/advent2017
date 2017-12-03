// As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

// So, the first few squares' values are chosen as follows:

// Square 1 starts with the value 1.
// Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
// Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
// Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
// Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
// Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

// 147  142  133  122   59
// 304    5    4    2   57
// 330   10    1    1   54
// 351   11   23   25   26
// 362  747  806--->   ...
// What is the first value written that is larger than your puzzle input?

// Your puzzle input is still 277678.

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

int first_spiral_val_larger_than_target (int target_value) {
  int array_size = 20;
  int current_y = array_size / 2;
  int current_x = array_size / 2;
  int current_path_length = 1;
  int distance_on_current_path = 0;
  direction current_direction = RIGHT;
  bool current_path_length_seen_before = false;
  int array[array_size][array_size];

  for (int i = 0; i < array_size; i++) {
    for (int j = 0; j < array_size; j++) {
      array[i][j] = 0;
    }
  }
  array[current_y][current_x] = 1;

  while (true) {
    if (distance_on_current_path >= current_path_length) {
      // change direction, set new path length, reset distance on current path
      current_direction = get_next_direction(current_direction);
      if (current_path_length_seen_before) {
        current_path_length++;
        current_path_length_seen_before = false;
      } else {
        current_path_length_seen_before = true;
      }
      distance_on_current_path = 0;
    }

    // move along the current path to next step
    switch (current_direction) {
      case RIGHT:
        current_x++;
        break;
      case UP:
        current_y--;
        break;
      case LEFT:
        current_x--;
        break;
      case DOWN:
        current_y++;
        break;
    }

    // calculate the value at the current step
    int current_neighbour_sum = 0;
    for (int y = current_y - 1; y <= current_y + 1; y++) {
      for (int x = current_x - 1; x <= current_x + 1; x++) {
        current_neighbour_sum += array[y][x];
      }
    }
    distance_on_current_path++;
    array[current_y][current_x] = current_neighbour_sum;
    // check if it is greater than target
    if (current_neighbour_sum > target_value) {
      return current_neighbour_sum;
    }
    current_neighbour_sum = 0;
  }
}

int main () {
  int answer = first_spiral_val_larger_than_target(277678);
  printf("%d\n", answer);

  return 0;
}
