defmodule Part1 do
  use Bitwise

  @gen_a_factor 16807
  @gen_b_factor 48271
  @common_mod 2147483647
  @num_comparisons 40000000

  def solve do
    {:ok, contents} = File.read "../input.txt"

    [gen_a_seed, gen_b_seed] = contents
                               |> String.trim
                               |> String.split("\n")
                               |> Enum.map(&parse_line/1)

    gen_a = Stream.iterate(gen_a_seed, &(rem(&1 * @gen_a_factor, @common_mod)))
            |> Stream.drop(1)
    gen_b = Stream.iterate(gen_b_seed, &(rem(&1 * @gen_b_factor, @common_mod)))
            |> Stream.drop(1)

    both_gens = Stream.zip(gen_a, gen_b)

    both_gens
    |> Stream.take(@num_comparisons)
    |> Stream.filter(&same_low_half_word?/1)
    |> Enum.count
    |> IO.inspect
  end

  defp parse_line(line) do
    line
    |> String.split(" ")
    |> List.last
    |> String.to_integer
  end

  def same_low_half_word?({num_a, num_b}) do
    a_low_bits = num_a &&& 0xffff
    b_low_bits = num_b &&& 0xffff

    a_low_bits == b_low_bits
  end
end
