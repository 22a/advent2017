#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>
#include <iterator>

#define magic_number -9000000

using namespace std;

template<typename Out>
void split(const std::string &s, char delim, Out result) {
    std::stringstream ss(s);
    std::string item;
    while (std::getline(ss, item, delim)) {
        *(result++) = item;
    }
}

std::vector<std::string> split(const std::string &s, char delim) {
    std::vector<std::string> elems;
    split(s, delim, std::back_inserter(elems));
    return elems;
}

int main () {
  string scratch_line;
  std::vector< std::vector<int> > points;
  ifstream myfile ("../input.txt");
  if (myfile.is_open()) {
    while (getline(myfile, scratch_line)) {
      std::vector<int> scratch_point;
      std::vector<std::string> string_splits = split(scratch_line, ',');

      /*    0    1     2         3   4   5       6  7 8    */
      /* p=<1199,-2918,1457>, v=<-13,115,-8>, a=<-7,8,-10> */
      string_splits[0] = string_splits[0].substr(3);
      string_splits[2].pop_back();
      string_splits[3] = string_splits[3].substr(4);
      string_splits[5].pop_back();
      string_splits[6] = string_splits[6].substr(4);
      string_splits[8].pop_back();

      /* cout << scratch_line << '\n'; */

      for(auto const& value: string_splits) {
        /* cout << value << '\n'; */
        scratch_point.push_back(atoi(value.c_str()));
      }
      points.push_back(scratch_point);
    }
    myfile.close();
  }
  else {
    cout << "Unable to open file" << '\n';
    return 1;
  }

  /*
   * Acceleration values are constant so all points will diverge from the origin
   * eventually, so whichever is moving away the slowest will be the closest "in
   * the long term"
   */

  /*
   * If there's two points with the same acceleration sum, we need to find out
   * which will start diverging from the origin soonest.
   */

  int closestPoint = 0;
  int lowestAccel = abs(points[0][6]) + abs(points[0][7]) + abs(points[0][8]);
  for (auto point = points.begin(); point != points.end(); ++point) {
    int index = std::distance(points.begin(), point);
    int currentPointAccel = abs(points[index][6]) + abs(points[index][7]) + abs(points[index][8]);
    if (currentPointAccel < lowestAccel) {
      lowestAccel = currentPointAccel;
      closestPoint = index;
    }
    else if (currentPointAccel == lowestAccel) {
      int closestPointPos = abs(points[closestPoint][0]) + abs(points[closestPoint][1]) + abs(points[closestPoint][2]);
      int currentPointPos = abs(points[index][0]) + abs(points[index][1]) + abs(points[index][2]);

      if (currentPointPos < closestPointPos) {
        lowestAccel = currentPointAccel;
        closestPoint = index;
      }
    }
  }

  cout << closestPoint << '\n';

  /* pick a reasonably large number of iterations */
  for (int i = 0; i < 500; i++) {
    for (auto pi = points.begin(); pi != points.end(); ++pi) {
      int ii = std::distance(points.begin(), pi);
      bool shouldDeletePi = false;

      for (auto pj = pi; pj != points.end(); ++pj) {
        int ij = std::distance(points.begin(), pj);
        if (ii != ij && points[ii][0] == points[ij][0]) {
          if (points[ii][1] == points[ij][1]) {
            if (points[ii][2] == points[ij][2]) {
              shouldDeletePi = true;
              /* I tried to delete elements in the array but ran into issues with */
              /* the for loop conditions. I'm not bothered looking up how to best */
              /* use something like an option type so I'll just do this filthy hack */
              /* instead and hope that no point ever gets to exactly -9 million. */
              points[ij][0] = magic_number;
              points[ij][1] = magic_number;
              points[ij][2] = magic_number;
              points[ij][3] = 0;
              points[ij][4] = 0;
              points[ij][6] = 0;
              points[ij][7] = 0;
              points[ij][8] = 0;
            }
          }
        }

      }
      if (shouldDeletePi) {
        points[ii][0] = magic_number;
        points[ii][1] = magic_number;
        points[ii][2] = magic_number;
        points[ii][3] = 0;
        points[ii][4] = 0;
        points[ii][6] = 0;
        points[ii][7] = 0;
        points[ii][8] = 0;
      }
    }

    for (auto point = points.begin(); point != points.end(); ++point) {
      int index = std::distance(points.begin(), point);

      points[index][3] += points[index][6];
      points[index][4] += points[index][7];
      points[index][5] += points[index][8];

      points[index][0] += points[index][3];
      points[index][1] += points[index][4];
      points[index][2] += points[index][5];
    }
  }

  int particles_left = 0;
  for (auto point = points.begin(); point != points.end(); ++point) {
    int index = std::distance(points.begin(), point);
    if (points[index][0] != magic_number) {
      particles_left++;
    }
  }

  cout << particles_left << '\n';

  return 0;
}
