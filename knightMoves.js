import KnightNode from "./KnightNode.js";

export function knightMoves(start, end) {
  const startNode = KnightNode(start);
  const endNode = KnightNode(end);
  // Keep track of nodes we want to visit
  let queue = [startNode];
  // Keep track of positions we've visited
  let visited = [];
  // List of moves needed to get to endNode
  let moveList = [];

  // Checks if arrays are the same
  // Arrays cannot be compared via === because arrays are objects and objects cannot be compared
  // Instead we need to check the length and values
  // every() helps pass the values and keep track of the index
  // a.every() will check each value of the array against each value of the second array
  function comparePositions(current, end) {
    const currentPos = current.position;
    const endPos = end.position;

    return (
      currentPos.length === endPos.length &&
      currentPos.every((num, index) => num === endPos[index])
    );
  }

  // Load the queue with node children (legal moves)
  // Creates new nodes from moves list
  // If distance of node passed in is null (startNode), set distance to 1. If not, increment by 1
  // Set prevNode to node passed in
  function loadQueue(node) {
    for (let i = 0; i < node.moves.length; i++) {
      const current = KnightNode(node.moves[i]);

      if (node.distance === null) {
        current.distance = 1;
      } else {
        current.distance = node.distance;
        current.distance += 1;
      }

      current.prevNode = node;
      queue.push(current);
    }
  }

  // We've found the endNode, now we trace it back by checking the previous node
  // If prevNode is not null, add it to the front of the moveList
  // When prevNode is null, we've traced the nodes back to the startNode and the moveList is populated
  function populateMoveList(node) {
    let current = node;

    while (current.prevNode !== null) {
      moveList.unshift(current.position);
      current = current.prevNode;
    }
    moveList.unshift(startNode.position);
    return moveList;
  }

  // Publish the final report!
  function getReport(moveList, distance) {
    console.log(`You made it in ${distance} moves! Here's your path:`);

    moveList.forEach((position) => {
      console.log(position);
    });
  }

  // The queue is populated with startNode upon creation
  // Search each node in the queue, check if it's the endNode, check if it's been visited
  // If not, add to visited and load the queue with its children
  function queueHandler() {
    while (queue.length > 0) {
      const current = queue.shift();

      if (comparePositions(current, endNode)) {
        moveList = populateMoveList(current);
        return getReport(moveList, current.distance);
      }

      for (let i = 0; i < visited.length; i++) {
        if (comparePositions(current, visited[i])) {
          continue;
        }
      }

      visited.push(current);
      loadQueue(current);
    }
  }

  queueHandler();
}
