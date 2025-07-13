// KnightNode object contains a position (coordinate of the square on the board) and an array of legal moves
// Requires a coordinate parameter upon creation in format [x, y]
// Moves are calculated from the position. Impossible moves are set to null

export default function KnightNode(coordinate) {
  const position = coordinate;
  const moves = getMoves();

  function getMoves() {
    const legalMoves = [];
    const potentialMoves = [
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-1, 2],
      [-2, 1],
      [-1, -2],
      [-2, -1],
    ];

    for (let i = 0; i < potentialMoves.length; i++) {
      const x = potentialMoves[i][0];
      const y = potentialMoves[i][1];

      if (
        position[0] + x > 7 ||
        position[0] + x < 0 ||
        position[1] + y > 7 ||
        position[1] + y < 0
      ) {
        legalMoves.push(null);
      } else {
        legalMoves.push([position[0] + x, position[1] + y]);
      }
    }

    return legalMoves;
  }

  return { position, moves };
}
