#![feature(slice_rotate)]

use std::fs::File;
use std::io::prelude::*;
use std::collections::HashMap;

enum Move {
    Spin { amount: usize },
    Exchange { pos_x: usize, pos_y: usize },
    Partner { target_x: char, target_y: char }
}

fn main() {
    let mut contents = String::new();
    let mut f = File::open("../input.txt").expect("file not found");
    f.read_to_string(&mut contents)
        .expect("something went wrong reading the file");

    let contents = contents.trim();
    let move_strings = contents.split(",").collect::<Vec<&str>>();
    let moves = move_strings.iter().map(|s| parse_move(s)).collect::<Vec<Move>>();

    let part_1_chars = do_dances(&moves, 1);

    print!("Part1: ");
    for i in 0..16 {
        print!("{}", part_1_chars[i]);
    }
    print!("\n");

    let part_2_chars = do_dances(&moves, 1000000000);

    print!("Part2: ");
    for i in 0..16 {
        print!("{}", part_2_chars[i]);
    }
    print!("\n");
}

fn do_dances(moves: &Vec<Move>, mut num_dances: usize) -> Vec<char> {
    let (mut replacements, mut reorder) = compress(&moves);
    let mut chars: Vec<char> = Vec::with_capacity(16);
    for i in ('a' as u32)..('p' as u32) + 1 {
        chars.push(std::char::from_u32(i).unwrap());
    }
    while num_dances > 0 {
        if num_dances & 1 == 1 {
            chars = reorder.iter().map(|&i| *(replacements.get(&chars[i]).unwrap())).collect();
        }

        reorder = reorder.iter().map(|&i| reorder[i]).collect();
        let mut scratch_map: HashMap<char, char> = HashMap::new();
        for (key, val) in replacements.iter() {
            scratch_map.insert(*key, *replacements.get(val).unwrap());
        }
        for (key, val) in scratch_map.iter() {
            replacements.insert(*key, *val);
        }

        num_dances >>= 1
    }
    chars
}

fn compress(moves: &Vec<Move>) -> (HashMap<char, char>, Vec<usize>) {
    let mut reorder: Vec<usize> = (0..16).collect();
    let mut replacements = HashMap::new();
    for i in ('a' as u32)..('p' as u32) + 1 {
        let c = std::char::from_u32(i).unwrap();
        replacements.insert(c, c);
    }

    for i in 0..moves.len() {
        match moves[i] {
            Move::Spin {amount} => {
                reorder.rotate(16 - amount);
            },
            Move::Exchange {pos_x, pos_y} => {
                reorder.swap(pos_x, pos_y);
            },
            Move::Partner {target_x, target_y} => {
                let mut key_x: char = '!';
                let mut key_y: char = '!';
                for (key, val) in &replacements {
                    if *val == target_x {
                        key_x = *key;
                    }
                    if *val == target_y {
                        key_y = *key;
                    }
                }
                replacements.insert(key_x, target_y);
                replacements.insert(key_y, target_x);
            }
        }
    }
    (replacements, reorder)
}

fn parse_move(move_str: &str) -> Move {
    match move_str.chars().nth(0).unwrap() {
        's' => {
            let (_, amount_str) = move_str.split_at(1);
            let amount = amount_str.parse::<usize>().unwrap();
            Move::Spin {amount: amount}
        },
        'x' => {
            let splits = move_str.split("/").collect::<Vec<&str>>();
            let (_, x_str) = splits[0].split_at(1);
            let x = x_str.parse::<usize>().unwrap();
            let y = splits[1].parse::<usize>().unwrap();

            Move::Exchange {pos_x: x, pos_y: y}
        },
        'p' => {
            let splits = move_str.split("/").collect::<Vec<&str>>();
            let x = String::from(splits[0]).remove(1);
            let y = String::from(splits[1]).remove(0);

            Move::Partner {target_x: x, target_y: y}
        },
        _ => panic!("Invalid move: {}", move_str)
    }
}
