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

## Depth-First Search (DFS)

### Characteristics:
- Uses a stack (LIFO) data structure or recursion.
- Can be implemented using either an explicit stack or recursion.
- Suitable for topological sorting, solving puzzles, and checking connectivity.

### Pseudocode (Iterative using Stack):
```pseudo
DFS(graph, start):
    let stack = empty stack
    let visited = empty set
    
    stack.push(start)
    
    while stack is not empty:
        node = stack.pop()
        
        if node is not in visited:
            process(node)  // Placeholder for any action to perform on the node
            visited.add(node)
            
            for each neighbor in graph.adjacentNodes(node):
                if neighbor is not in visited:
                    stack.push(neighbor)

### Pseudocode (Recursion):
```pseudo
DFS(graph, node, visited):
    if node not in visited:
        process(node)  // Placeholder for any action to perform on the node
        visited.add(node)
        
        for each neighbor in graph.adjacentNodes(node):
            DFS(graph, neighbor, visited)

# Initialization call
DFS(graph, start, empty set)

