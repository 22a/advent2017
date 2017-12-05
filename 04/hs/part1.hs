import qualified Data.Set as Set
import Data.List

valid :: String -> Bool
valid "" = True
valid p = Set.size(Set.fromList ws) == length ws
  where ws = words p

main = do
    inputFile <- readFile "../input.txt"
    let passphrases = filter (/= "") $ lines inputFile
    let validPassphrases = filter valid passphrases
    print $ length validPassphrases
