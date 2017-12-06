mod part1;
mod part2;

use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut contents = String::new();
    let mut f = File::open("../input.txt").expect("file not found");
    f.read_to_string(&mut contents)
        .expect("something went wrong reading the file");

    let mem_strs_itr = contents.split_whitespace();
    let mem_ints_itr = mem_strs_itr.map(|s| s.parse::<usize>().unwrap());
    let mem_ints = mem_ints_itr.collect::<Vec<usize>>();

    // println!("{:?}", mem_ints);

    let part1_sol = part1::solution(&mem_ints);
    let part2_sol = part2::solution(&mem_ints);
    println!("Part 1: {}", part1_sol);
    println!("Part 2: {}", part2_sol);
}
