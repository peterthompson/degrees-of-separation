class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(start, end) {
    this.addVertex(start);
    this.addVertex(end);

    if (!this.adjacencyList[start].includes(end)) {
      this.adjacencyList[start].push(end);
    }

    if (!this.adjacencyList[end].includes(start)) {
      this.adjacencyList[end].push(start);
    }
  }

  breadthFirstSearch(queue = [], visited = {}, parent = {}) {
    const current = queue.shift();
    this.adjacencyList[current].forEach(vertex => {
      if (!visited[vertex]) {
        parent[vertex] = current;
        visited[vertex] = true;
        queue.push(vertex);
      }
    });
  }

  getIntersection(visitedFromSource, visitedFromTarget) {
    for (let vertex in this.adjacencyList) {
      if (visitedFromSource[vertex] && visitedFromTarget[vertex]) {
        return vertex;
      }
    }
  }

  getPath(parentFromSource, parentFromTarget, source, target, intersection) {
    let path = [intersection];

    let current = intersection;

    while (current !== source) {
      path.push(parentFromSource[current]);
      current = parentFromSource[current];
    }

    path = path.reverse();

    current = intersection;

    while (current !== target) {
      path.push(parentFromTarget[current]);
      current = parentFromTarget[current];
    }

    return path;
  }

  bidirectionalSearch(source, target) {
    const visitedFromSource = {};
    const visitedFromTarget = {};

    const parentFromSource = {};
    const parentFromTarget = {};

    const sourceQueue = [];
    const targetQueue = [];

    sourceQueue.push(source);
    visitedFromSource[source] = true;

    targetQueue.push(target);
    visitedFromTarget[target] = true;

    while (sourceQueue.length && targetQueue.length) {
      this.breadthFirstSearch(sourceQueue, visitedFromSource, parentFromSource);
      this.breadthFirstSearch(targetQueue, visitedFromTarget, parentFromTarget);

      const intersection = this.getIntersection(
        visitedFromSource,
        visitedFromTarget
      );

      if (intersection) {
        return this.getPath(
          parentFromSource,
          parentFromTarget,
          source,
          target,
          intersection
        );
      }
    }
  }
}

export default Graph;
