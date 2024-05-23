import { useEffect, useState } from "react";
import "./App.css";

export default function MazeGrid({ width = 10, height = 10 }) {
  const [maze, setMaze] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);

  const [BFS_time, setBFS_time] = useState(0);
  const [DFS_time, setDFS_time] = useState(0);

  const [bfs_time_text, setBFS_Text] = useState(`BFS Time: ${BFS_time} s`);
  const [dfs_time_text, setDFS_Text] = useState(`DFS Time: ${DFS_time} s`);

  useEffect(() => {
    generateMaze(width, height);
  }, []);

  function clearpath() {
    setMaze((prevMaze) =>
      prevMaze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (cell === "visited_bfs" || cell === "visited_dfs") {
            return "path";
          }
          return cell;
        }),
      ),
    );
  }

  // [1, 0] --- '1,0'
  function bfs(startNode) {
    // Race Add on
    setBFS_Text(`BFS Time: 0.00 s`);
    const startTime = new Date();

    let queue = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]) {
      console.log(x, y);

      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === "end" ? "end" : "visited_bfs";
            }
            return cell;
          }),
        ),
      );
      if (maze[y][x] === "end") {
        console.log("path found!");
        const endTime = new Date();
        setBFS_Text(`BFS Time: ${(endTime - startTime) / 1000} s`);
        return true;
      }
      return false;
    }

    function step() {
      if (queue.length === 0) {
        return;
      }
      const [x, y] = queue.shift();
      console.log("new step");
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true;
            }
            queue.push([nx, ny]);
          }
        } // '2, 3'
      }

      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step();
    return false;

    // return true/false
  }

  function dfs(startNode) {
    // Race Add on
    setDFS_Text(`DFS Time: 0.00 s`);
    const startTime = new Date();

    let stack = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]) {
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === "end" ? "end" : "visited_dfs";
            }
            return cell;
          }),
        ),
      );

      if (maze[y][x] === "end") {
        console.log("path found!");
        const endTime = new Date();
        setDFS_Text(`BFS Time: ${(endTime - startTime) / 1000} s`);
        return true;
      }
      return false;
    }

    function step() {
      if (stack.length === 0) {
        const endTime = new Date();
        setBFS_Text(`DFS Time: ${(endTime - startTime) / 1000} s`);
        return;
      }
      const [x, y] = stack.pop();
      console.log("new step");
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true;
            }
            stack.push([nx, ny]);
          }
        } // '2, 3'
      }
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step();
    return false;

    // return true/false
  }

  // ------------

  function generateMaze(height, width) {
    setDFS_Text(`DFS Time: 0.00 s`);
    setBFS_Text(`BFS Time: 0.00 s`);
    let matrix = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push("wall");
      }
      matrix.push(row);
    }

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    function isCellValid(x, y) {
      return (
        y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === "wall"
      );
    }

    function carvePath(x, y) {
      matrix[y][x] = "path";

      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny);
        }
      }
    }

    // Start carving from a random odd position inside the grid
    carvePath(1, 1);

    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";

    function isPathExists() {
      let visited = Array.from({ length: height }, () =>
        Array(width).fill(false),
      );
      function dfs(x, y) {
        if (
          x < 0 ||
          y < 0 ||
          x >= width ||
          y >= height ||
          matrix[y][x] === "wall" ||
          visited[y][x]
        ) {
          return false;
        }
        if (matrix[y][x] === "end") {
          return true;
        }
        visited[y][x] = true;
        for (let [dx, dy] of dirs) {
          if (dfs(x + dx, y + dy)) {
            return true;
          }
        }
        return false;
      }
      return dfs(0, 1); // Start DFS from the start point
    }

    while (!isPathExists()) {
      // Reset and regenerate the maze until a valid path is found
      matrix = matrix.map((row) => row.map(() => "wall"));
      carvePath(1, 1);
      matrix[1][0] = "start";
      matrix[height - 2][width - 1] = "end";
    }

    setMaze(matrix);
  }

  function refreshMaze() {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    generateMaze(10, 10);
  }

  return (
    <div className="maze-grid">
      <h1> Path Finding Algorithms! </h1>
      <body> Powered by: React ⚛️ + Vite ⚡ + Replit </body>
      <body> Select the buttons to see how these algorithms work! - James Ocampo </body>
      <div className="controls">
        <button className={"maze-button normal"} onClick={() => refreshMaze()}>
          Refresh Maze
        </button>
        <button className={"maze-button bfs"} onClick={() => bfs([1, 0])}>
          Breadth-First Search
        </button>
        <button className={"maze-button dfs"} onClick={() => dfs([1, 0])}>
          Depth-First Search
        </button>
      </div>

      <div className={"maze"}>
        {maze.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>

      <div className="controls">
        <button className={"maze-button normal"} onClick={() => clearpath()}>
          Clear Path
        </button>

        <button className={"maze-button bfs"} onClick={() => bfs([1, 0])}>
          {`${bfs_time_text}`}
        </button>

        <button className={"maze-button dfs"} onClick={() => dfs([1, 0])}>
          {`${dfs_time_text}`}
        </button>
      </div>
    </div>
  );
}
