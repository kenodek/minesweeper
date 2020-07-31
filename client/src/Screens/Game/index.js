import React from "react";
import "./index.scss";
import Board from "./Board/index.tsx";
import Menu from "./Menu/index.tsx";

function Game() {
  return (
    <div id="container-main">
      <Board />
      <Menu />
    </div>
  );
}

export default Game;
