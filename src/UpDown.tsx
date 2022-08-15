import { useEffect, useState } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { moveVertical } from "./helper/3dFuntions";

type props = {
  controls: OrbitControls;
};

const UpDown = ({ controls }: props) => {
  const [moveUp, setMoveUp] = useState(false);
  const [moveDown, setMoveDown] = useState(false);
  useEffect(() => {
    let upId;
    if (moveUp) {
      upId = setInterval(() => moveVertical(-5, controls), 100);
    } else {
      clearInterval(upId);
    }
    return () => clearInterval(upId);
  }, [moveUp]);

  useEffect(() => {
    let downId;
    if (moveDown) {
      downId = setInterval(() => moveVertical(+5, controls), 100);
    } else {
      clearInterval(downId);
    }
    return () => clearInterval(downId);
  }, [moveDown]);

  return (
    <>
      <button
        title="move up"
        onMouseDown={() => setMoveUp(true)}
        onMouseUp={() => setMoveUp(false)}
        onMouseLeave={() => setMoveUp(false)}
      >
        Move up
      </button>

      <button
        title="Move down"
        onMouseDown={() => setMoveDown(true)}
        onMouseUp={() => setMoveDown(false)}
        onMouseLeave={() => setMoveDown(false)}
      >
        Move down
      </button>
    </>
  );
};

export default UpDown;
