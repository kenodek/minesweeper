import React, { useState, useEffect, FormEvent } from "react";
import "./index.scss";

import { BiReset } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Modal from "../../../global_components/Modal";
import GameSettings from "../GameSettings";

interface Props {
  setIsGameReseted: Function;
}

const Menu = ({ setIsGameReseted }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);
  useEffect(() => {
    console.log("IS MODAL OPENED: ", isModalOpened);
  }, [isModalOpened]);

  return (
    <div className="sidebar">
      <div className="container-icon flex-center flex-wrap pd-10">
        <button>
          <BiReset />
        </button>
        <span>Reset</span>
      </div>

      <div
        className="container-icon flex-center flex-wrap pd-10"
        onClick={openModal}
      >
        <button>
          <FiSettings />
        </button>
        <span>Ustawienia</span>
      </div>
      <Modal isOpened={isModalOpened}>
        <GameSettings closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Menu;
