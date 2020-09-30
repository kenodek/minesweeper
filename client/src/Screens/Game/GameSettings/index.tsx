import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/store";
import { changeBoardSettings } from "../../../redux/BoardSettings/creators";
import "./index.scss";

interface Props {
  closeModal: () => void;
}

const GameSettings = ({ closeModal }: Props) => {
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    closeModal();
    dispatch(
      changeBoardSettings(boardWidthLocal, boardHeightLocal, numberOfBombsLocal)
    );

    console.log("CLOSE FUNC: ", closeModal);
  };

  return (
    <div className="container-settings pd-20">
      <h1 className="settings-title">
        Saving this options will reset the game
      </h1>
      <div className="flex-space-between">
        <label htmlFor="input-board-width">
          WIDTH
          <input
            id="input-board-width"
            type="number"
            step={1}
            min={4}
            max={20}
            value={boardWidthLocal}
            onChange={(event) =>
              setBoardWidthLocal(parseInt(event.target.value))
            }
          />
        </label>

        <label htmlFor="input-board-height">
          HEIGTH
          <input
            id="input-board-height"
            type="number"
            step={1}
            min={4}
            max={20}
            value={boardHeightLocal}
            onChange={(event) =>
              setBoardHeightLocal(parseInt(event.target.value))
            }
          />
        </label>

        <label htmlFor="input-number-of-bombs">
          NUMBER OF BOMBS
          <input
            id="input-number-of-bombs"
            type="number"
            step={1}
            min={4}
            max={20}
            value={numberOfBombsLocal}
            onChange={(event) =>
              setNumberOfBombsLocal(parseInt(event.target.value))
            }
          />
        </label>
      </div>

      <div className="flex-space-between mg-top-30">
        <button
          className="btn btn--neutral"
          onClick={() => {
            closeModal();
            console.log("FIRED");
          }}
        >
          Cancel
        </button>
        <button className="btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
