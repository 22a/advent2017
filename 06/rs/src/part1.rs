fn is_same_state (state_a: &Vec<usize>, state_b: &Vec<usize>) -> bool {
    if state_a.len() != state_b.len() {
        return false;
    }

    for i in 0..state_a.len() {
        if state_a[i] != state_b[i] {
            return false;
        }
    }

    return true;
}

fn repeated_state (mem_state: &Vec<usize>, prev_states: &Vec<Vec<usize>>) -> bool {
    for i in 0..prev_states.len() {
        if is_same_state(mem_state, &prev_states[i]) {
            return true;
        }
    }
    return false;
}

fn max_index (list: &Vec<usize>) -> usize {
    let mut current_max_i = 0;
    let mut current_max_val = list[0];

    for i in 0..list.len() {
        if list[i] > current_max_val {
            current_max_i = i;
            current_max_val = list[i];
        }
    }
    return current_max_i;
}

fn redistribute (mem_state: &Vec<usize>, target_index: usize) -> Vec<usize> {
    let len = mem_state.len();
    let mut memory = mem_state.to_owned();
    let redist_value = memory[target_index];
    memory[target_index] = 0;

    for i in 1..(redist_value + 1) {
        memory[(target_index + i) % len] += 1;
    }

    return memory
}

pub fn solution(mem_state: &Vec<usize>) -> usize {
    let mut current_state = mem_state.to_owned();
    let mut prev_states = Vec::new();
    prev_states.push(current_state.to_owned());
    let mut num_transformations: usize = 0;
    loop {
        let next_target_index = max_index(&current_state);
        current_state = redistribute(&current_state, next_target_index);
        num_transformations += 1;

        if repeated_state(&current_state, &prev_states) {
            return num_transformations;
        }
        prev_states.push(current_state.to_owned());
    }
}
