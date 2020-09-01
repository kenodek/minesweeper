import React, { useState } from "react";
import "./index.scss";
import Board from "./Board/index.tsx";
import Menu from "./Menu/index.tsx";

function Game() {
  const [isGameReseted, setIsGameReseted] = useState(false);

  return (
    <div id="container-main">
      <Board
        isGameReseted={isGameReseted}
        setIsGameReseted={setIsGameReseted}
      />
      <Menu setIsGameReseted={setIsGameReseted} />
    </div>
  );
}

export default Game;
