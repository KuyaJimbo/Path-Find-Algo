## Special Thanks to ZTM for the inspiration of the project
Course I used: https://zerotomastery.io/courses/javascript-project-algorithm-visualizer/
# Graph Traversal Algorithms: BFS and DFS

## Overview
This document provides an overview of two fundamental graph traversal algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS). It includes characteristics, use cases, and pseudocode for each algorithm.

## Breadth-First Search (BFS)

### Characteristics
- Explores the graph level by level.
- Uses a queue (FIFO) data structure.
- Suitable for finding the shortest path in an unweighted graph.

### Pseudocode
```pseudo
BFS(graph, start):
    let queue = empty queue
    let visited = empty set
    
    queue.enqueue(start)
    visited.add(start)
    
    while queue is not empty:
        node = queue.dequeue()
        process(node)  // Placeholder for any action to perform on the node
        
        for each neighbor in graph.adjacentNodes(node):
            if neighbor is not in visited:
                queue.enqueue(neighbor)
                visited.add(neighbor)
