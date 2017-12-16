defmodule Part1 do
  def solve do
    {:ok, contents} = File.read "../input.txt"
    contents
    |> String.trim
    |> String.split("\n")
    |> Enum.map(&parse_line/1)
    |> compute_severity
    |> IO.inspect
  end

  defp compute_severity (layers) do
    layers
    |> Enum.filter(&caught?/1)
    |> Enum.map(&calc_severity/1)
    |> Enum.reduce(&+/2)
  end

  defp caught? ([layer_num, depth]) do
    rem(layer_num, 2 * (depth - 1)) == 0
  end

  defp calc_severity ([layer_num, depth]) do
    layer_num * depth
  end

  defp parse_line (line) do
    String.split(line, ": ")
    |> Enum.map(&String.to_integer/1)
  end
end
