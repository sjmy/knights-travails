import KnightNode from "./KnightNode.js";

// Queue needs to be in module scope DONE
// Queue needs to take nodes, not position arrays
// Add moveList to module scope DONE
// queueHandler function? Replace starter(), handles queue, moveCounter?, moveList?
// search() becomes the recursive search function
// search always BFS?
// next step would be comparing routes to report the shortest one
// when a match is found, save the route and length. if the next search exceeds that length, discard

export function knightMoves(start, end) {
  const startNode = KnightNode(start);
  const endNode = KnightNode(end);
  // Keep track of nodes we want to visit
  let queue = [startNode];
  // Keep track of positions we've visited
  let visited = [];

  // List of moves needed to get to endNode, not certain I need this or the moveCounter
  let moveList = [];
  // Idea is to increment whenever a level search is completed without a match
  let moveCounter = 0;

  // Level order search of each coordinate in node.moves
  function search(node) {
    // Fill the queue with potential positions
    for (let i = 0; i < node.moves.length; i++) {
      queue.push(KnightNode(node.moves[i]));
    }

    while (queue.length > 0) {
      let current = queue.pop();

      for (let i = 0; i < visited.length; i++) {
        if (comparePositions(current, visited[i])) {
          continue;
        }
      }

      if (comparePositions(current, endNode)) {
        moveCounter += 1;
        return true;
      }

      visited.push(current);
    }

    moveCounter += 1;
    return false;
  }

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

  function populateMoveList(node) {
    let current = node;

    while (current.prevNode !== null) {
      moveList.unshift(current.position);
      current = current.prevNode;
    }
    moveList.unshift(startNode.position);
  }

  function queueHandler() {
    while (queue.length > 0) {
      const current = queue.shift();

      if (comparePositions(current, endNode)) {
        populateMoveList(current);
        console.table(moveList);
        return `match found in ${current.distance} steps`;
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

  // when the queue is empty, compare the solutions and report the shortest one

  // Use a nodeQueue to keep track of potential nodes to check
  // Call search() to do a breadth-first check for each node
  // If true, report success
  // If not, check the next node in nodeQueue
  // function queueHandler() {
  //   // Populate the nodeQueue with nodes created from startNode.moves
  //   for (let i = 0; i < startNode.moves.length; i++) {
  //     nodeQueue.push(KnightNode(startNode.moves[i]));
  //   }

  //   while (nodeQueue.length > 0) {
  //     let node = nodeQueue.shift();

  //     if (search(node) === true) {
  //       return moveCounter;
  //     }
  //   }
  // }

  return queueHandler();
}

// `You made it in ${moveCounter} moves! Here's your path: implement me!`
