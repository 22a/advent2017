import Data.List
import qualified Data.Set as Set

valid :: String -> Bool
valid "" = True
valid p = Set.size(Set.fromList sortedWords) == length sortedWords
  where sortedWords = map sort (words p)

main = do
    inputFile <- readFile "../input.txt"
    let passphrases = filter (/= "") $ lines inputFile
    let validPassphrases = filter valid passphrases
    print $ length validPassphrases
