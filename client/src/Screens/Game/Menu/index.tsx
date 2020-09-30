import React, { useState, useEffect, FormEvent } from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/store";
import {
  setBoardWidth,
  setBoardHeight,
  setNumberOfBombs,
  changeBoardSettings,
} from "../../../redux/BoardSettings/creators";

interface Props {
  setIsGameReseted: Function;
}

const Menu = ({ setIsGameReseted }: Props) => {
  const dispatch = useDispatch();

  const isFetching = useTypedSelector((state) => state.board.isFetching);
  const boardWidthFromRedux = useTypedSelector((state) => state.board.width);
  const boardHeightFromRedux = useTypedSelector((state) => state.board.height);
  const numberOfBombsFromRedux = useTypedSelector(
    (state) => state.board.numberOfBombs
  );

  const [boardWidthLocal, setBoardWidthLocal] = useState(boardWidthFromRedux);
  const [boardHeightLocal, setBoardHeightLocal] = useState(
    boardHeightFromRedux
  );
  const [numberOfBombsLocal, setNumberOfBombsLocal] = useState(
    numberOfBombsFromRedux
  );

  const [isMenuOpened, setMenuState] = useState(true);

  const menuStyles = {
    width: isMenuOpened ? "400px" : "80px",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      changeBoardSettings(boardWidthLocal, boardHeightLocal, numberOfBombsLocal)
    );
  };

  return (
    <div className="sidebar" style={menuStyles}>
      <div className="container-space-between">
        <button
          className="hamburger"
          onClick={() => setMenuState((prevState) => !prevState)}
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </button>

        {isMenuOpened && (
          <button
            className="button-reset flex-center auto"
            onClick={() => setIsGameReseted(true)}
          >
            Reset
          </button>
        )}
      </div>

      {isMenuOpened && (
        <>
          <form className="container-space-between" onSubmit={handleSubmit}>
            <div className="size-auto">
              <label className="board-size-label" htmlFor="input-board-width">
                WIDTH
              </label>
              <input
                id="input-board-width"
                type="number"
                className="board-size-input"
                step={1}
                min={4}
                max={20}
                value={boardWidthLocal}
                onChange={(event) =>
                  setBoardWidthLocal(parseInt(event.target.value))
                }
              />
            </div>

            <div className="size-auto">
              <label className="board-size-label">HEIGHT</label>
              <input
                type="number"
                className="board-size-input"
                step={1}
                min={4}
                max={20}
                value={boardHeightLocal}
                onChange={(event) =>
                  setBoardHeightLocal(parseInt(event.target.value))
                }
              />
            </div>

            <div className="size-auto">
              <label className="number-of-bombs-label">NUMBER OF BOMBS</label>
              <input
                type="number"
                className="number-of-bombs-input"
                step={1}
                min={1}
                max={boardWidthLocal * boardHeightLocal}
                value={numberOfBombsLocal}
                onChange={(event) =>
                  setNumberOfBombsLocal(parseInt(event.target.value))
                }
              />
            </div>

            <button type="submit" id="button-submit-board-settings">
              Submit {isFetching && "..."}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Menu;
