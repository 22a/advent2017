# Advent of Code 2017

This repo contains my solutions to the [Advent of Code 2017](https://adventofcode.com/2017) problems.

### Directory structure

I'll be adding a directory for each day `1..25` and storing inside:

1. The Problem Descriptions
2. The Problem Inputs (if any)
3. A directory for each language
    * and maybe a `.gitignore` or other supporting material for running that language

### Approach to problems
My general approach is to solve the problem in [a boring language](https://developer.mozilla.org/bm/docs/Web/JavaScript) (to serve as pseudocode to make sure I actually understand the problem), I'll submit the solution to get some stars, and then I'll port/rewrite it into a more interesting language.

#### Generic solutions?
I'm not super concerned with making the solutions generic (work for all inputs), rather I just want to get it working and learn what I can from the problem itself rather than solving edge cases. This may end up biting me in the later non trivial problems but we'll cross that puddle of milk when we come to it. I have, however, been leaving comments in places where I've cut corners that would make the solution fragile for inputs other than the examples provided.

#### Tests?
Test would likely be very helpful, but for most of the languages I'm using here it takes me a good deal of time to figure out how to compile/run them so figuring out the correct way to test them would take a disproportionate amount of time.

## Advent

Day | Part | Language(s) 
--- | ---  | ---
[1](https://adventofcode.com/2017/day/1)| 1 | [JavaScript](https://github.com/22a/advent2017/blob/master/01/js/part1.js), [OCaml](https://github.com/22a/advent2017/blob/master/01/ocaml/part1.ml)
[1](https://adventofcode.com/2017/day/1)| 2 | [JavaScript](https://github.com/22a/advent2017/blob/master/01/js/part2.js), [OCaml](https://github.com/22a/advent2017/blob/master/01/ocaml/part2.ml)
 | | 
[2](https://adventofcode.com/2017/day/2)| 1 | [JavaScript](https://github.com/22a/advent2017/blob/master/02/js/part1.js), [Clojure](https://github.com/22a/advent2017/blob/master/02/clj/part1/src/part1/core.clj)
[2](https://adventofcode.com/2017/day/2)| 2 | [JavaScript](https://github.com/22a/advent2017/blob/master/02/js/part2.js), [Clojure](https://github.com/22a/advent2017/blob/master/02/clj/part2/src/part2/core.clj)
 | | 
[3](https://adventofcode.com/2017/day/3)| 1 | [JavaScript](https://github.com/22a/advent2017/blob/master/03/js/part1.js), [C](https://github.com/22a/advent2017/blob/master/03/c/part1.c)
[3](https://adventofcode.com/2017/day/3)| 2 | [JavaScript](https://github.com/22a/advent2017/blob/master/03/js/part2.js), [C](https://github.com/22a/advent2017/blob/master/03/c/part2.c)
