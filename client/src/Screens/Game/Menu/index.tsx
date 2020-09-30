import React, { useState, useEffect, FormEvent } from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/store";
import { changeBoardSettings } from "../../../redux/BoardSettings/creators";
import { BiReset } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      changeBoardSettings(boardWidthLocal, boardHeightLocal, numberOfBombsLocal)
    );
  };

  return (
    <div className="sidebar">
      <div className="container-icon flex-center flex-wrap pd-10">
        <button>
          <BiReset />
        </button>
        <span>Reset</span>
      </div>

      <div className="container-icon flex-center flex-wrap pd-10">
        <button>
          <FiSettings />
        </button>
        <span>Ustawienia</span>
      </div>
    </div>
  );
};

export default Menu;
