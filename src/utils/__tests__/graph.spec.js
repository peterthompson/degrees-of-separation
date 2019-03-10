import Graph from "../graph";

describe("Graph", () => {
  it("should implement addVertex", () => {
    const graph = new Graph();

    graph.addVertex("A");
    graph.addVertex("A");
    graph.addVertex("B");

    expect(graph.adjacencyList).toEqual({ A: [], B: [] });
  });

  it("should implement addEdge", () => {
    const graph = new Graph();

    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    graph.addEdge("B", "C");

    expect(graph.adjacencyList).toEqual({ A: ["B"], B: ["A", "C"], C: ["B"] });
  });

  it("should implement bidirectional search", () => {
    const scenarios = [
      {
        source: "A",
        target: "B",
        edges: [["A", "B"]],
        result: ["A", "B"]
      },
      {
        source: "A",
        target: "C",
        edges: [["A", "B"], ["B", "C"]],
        result: ["A", "B", "C"]
      },
      {
        source: "A",
        target: "D",
        edges: [["A", "B"], ["B", "C"], ["C", "D"], ["A", "D"]],
        result: ["A", "D"]
      }
    ];

    scenarios.forEach(({ source, target, edges, result }) => {
      const graph = new Graph();
      edges.forEach(edge => graph.addEdge(...edge));
      expect(graph.bidirectionalSearch(source, target)).toEqual(result);
    });
  });
});
