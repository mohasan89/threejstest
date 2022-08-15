import { useEffect, useState } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { moveHorizantal } from "./helper/3dFuntions";

type props = {
  controls: OrbitControls;
};

const LeftRight = ({ controls }: props) => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  useEffect(() => {
    let rightId;
    if (moveRight) {
      rightId = setInterval(() => moveHorizantal(5, controls), 100);
    } else {
      clearInterval(rightId);
    }
    return () => clearInterval(rightId);
    //react-hooks/exhaustive-deps
  }, [moveRight]);

  useEffect(() => {
    let leftId;
    if (moveLeft) {
      leftId = setInterval(() => moveHorizantal(5, controls), 100);
    } else {
      clearInterval(leftId);
    }
    return () => clearInterval(leftId);
  }, [moveLeft]);

  return (
    <>
      <button
        title="Move left"
        onMouseDown={() => setMoveLeft(true)}
        onMouseUp={() => setMoveLeft(false)}
        onMouseLeave={() => setMoveLeft(false)}
      >
        Move left
      </button>

      <button
        title="Move right"
        onMouseDown={() => setMoveRight(true)}
        onMouseUp={() => setMoveRight(false)}
        onMouseLeave={() => setMoveRight(false)}
      >
        Move right
      </button>
    </>
  );
};

export default LeftRight;
