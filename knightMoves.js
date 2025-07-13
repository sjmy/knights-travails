import KnightNode from "./KnightNode.js";

export function knightMoves(start, end) {
  const startNode = KnightNode(start);
  const endPos = end;
  // Keep track of positions we've visited
  let visited = [startNode.position];
  // Idea is to incrememnt whenever a level search is completed without a match
  let moveCounter = 0;

  // Level order search of each coordinate in node.moves
  function search(node) {
    let queue = [];

    // Fill the queue with potential positions
    for (let i = 0; i < node.moves; i++) {
      queue.push(node.moves[i]);
    }

    while (queue > 0) {
      let current = queue.pop();

      for (let i = 0; i < visited.length; i++) {
        if (current === visited[i]) {
          continue;
        }
      }

      if (current === endPos) {
        return true;
      }

      visited.push(node.moves[i]);
    }

    moveCounter += 1;
    return false;
  }
}

// `You made it in ${moveCounter} moves! Here's your path: implement me!`
