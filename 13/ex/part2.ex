defmodule Part2 do
  def solve do
    {:ok, contents} = File.read "../input.txt"

    contents
    |> String.trim
    |> String.split("\n")
    |> Enum.map(&parse_line/1)
    |> find_amiable_delay
    |> IO.inspect
  end

  defp find_amiable_delay (layers) do
    natural_numbers()
    |> Enum.find(fn (delay) ->
         Enum.any?(layers, fn ([layer_num, depth]) ->
           rem(layer_num + delay, 2 * (depth - 1)) == 0
         end)
         |> Kernel.not
       end)
  end

  defp natural_numbers do
    Stream.resource(
      fn -> 0 end,
      fn(num) -> {[num], num + 1} end,
      fn(num) -> num end
    )
  end

  defp parse_line (line) do
    String.split(line, ": ")
    |> Enum.map(&String.to_integer/1)
  end
end
