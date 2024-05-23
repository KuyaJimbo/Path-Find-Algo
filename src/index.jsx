// JSX is a syntax extension to JavaScript that allows us to write HTML-like code in JavaScript.
import React from "react";
import ReactDOM from "react-dom/client";
import MazeGrid from "./MazeGrid";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MazeGrid />
	</React.StrictMode>,
);
