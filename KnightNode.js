// KnightNode object contains a position (coordinate of the square on the board) and eight move attributes
// Requires a coordinate parameter upon creation in format [x, y]
// Move attributes are calculated from the position. Impossible moves are set to null

export default function KnightNode(coordinate) {
  const position = coordinate;
  const possibleMoves = getMoves(); // Array of possible moves instead of an attribute for each one? Then I can iterate through them
  const one = move(1, 2);
  const two = move(1, -2);
  const three = move(2, 1);
  const four = move(2, -1);
  const five = move(-1, 2);
  const six = move(-2, 1);
  const seven = move(-1, -2);
  const eight = move(-2, -1);

  function move(x, y) {
    if (
      position[0] + x > 7 ||
      position[0] + x < 0 ||
      position[1] + y > 7 ||
      position[1] + y < 0
    ) {
      return null;
    }

    return [position[0] + x, position[1] + y];
  }

  function getMoves() {
    for (let i = 1; i <= 8; i++) {}
  }

  return { position, one, two, three, four, five, six, seven, eight };
}
