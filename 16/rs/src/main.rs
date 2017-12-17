use std::fs::File;
use std::io::prelude::*;

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

    let contents = contents.trim(); // remove trailing newline

    let move_strings = contents.split(",").collect::<Vec<&str>>();

    let moves = move_strings.iter().map(|s| parse_move(s)).collect::<Vec<Move>>();

    let mut char_order: Vec<char> = vec!['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

    for i in 0..moves.len() {
        apply_move(&mut char_order, &moves[i]);
    }

    print!("Part1: ");
    for i in 0..16 {
        print!("{}", char_order[i]);
    }
    print!("\n");

    for m in 1..1000000000 {
        if m % 10000 == 0 {
            println!("{}", m)
        }
        for i in 0..moves.len() {
            apply_move(&mut char_order, &moves[i]);
        }
    }

    print!("Part2: ");
    for i in 0..16 {
        print!("{}", char_order[i]);
    }
    print!("\n");
}

fn apply_move(chars: &mut Vec<char>, mov: &Move) {
    match *mov {
        Move::Spin {amount} => {
            let mut scratch: Vec<char> = vec!['!'; 16];
            for i in 0..16 {
                scratch[(i + amount) % 16] = chars[i];
            }
            for i in 0..16 {
                chars[i] = scratch[i];
            }
        },
        Move::Exchange {pos_x, pos_y} => {
          let x_val = chars[pos_x];
          let y_val = chars[pos_y];
          chars[pos_x] = y_val;
          chars[pos_y] = x_val;
        },
        Move::Partner {target_x, target_y} => {
            let x_index = chars.iter().position(|&x| x == target_x).unwrap();
            let y_index = chars.iter().position(|&x| x == target_y).unwrap();
            chars[x_index] = target_y;
            chars[y_index] = target_x;
        }
    }
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
