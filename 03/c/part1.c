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
