import { useEffect, useState } from "react";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { clearItems, toggleRotation, moveHorizantal } from "./helper/3dFuntions";

type props = {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  controls: OrbitControls;
};

const Controller = ({ scene, renderer, camera, controls }: props) => {
  const [rotating, setRotating] = useState(true);

  const loadCubeHandler = () => {
    clearItems(scene);

    const geometry = new BoxGeometry(1, 1, 1, 1);
    const material = new MeshStandardMaterial({
      color: "#00FF95",
    });

    const Figure = new Mesh(geometry, material);
    scene.add(Figure);
    const animate = () => {
      if (rotating) {
        requestAnimationFrame(animate);
        Figure.rotation.x += 0.0055;
        Figure.rotation.y += 0.005;
        controls.update();
      }
      renderer.render(scene, camera);
    };

    animate();
  };

  const rotationHandler = () => {
    setRotating(!rotating);
    toggleRotation(scene, renderer, camera, controls, !rotating);
  };

  useEffect(() => {
    if (!rotating) loadCubeHandler();
  }, [rotating]);

  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  useEffect(() => {
    let leftId;
    if (moveLeft) {
      leftId = setInterval(() => moveHorizantal(0.05, camera, renderer, scene), 100);
    } else {
      clearInterval(leftId);
    }
    return () => clearInterval(leftId);
  }, [moveLeft]);

  useEffect(() => {
    let rightId;
    if (moveRight) {
      rightId = setInterval(() => moveHorizantal(-0.05, camera, renderer, scene), 100);
    } else {
      clearInterval(rightId);
    }
    return () => clearInterval(rightId);
  }, [moveRight]);

  useEffect(() => {
    let leftId;
    if (moveLeft) {
      leftId = setInterval(() => moveHorizantal(0.05, camera, renderer, scene), 100);
    } else {
      clearInterval(leftId);
    }
    return () => clearInterval(leftId);
  }, [moveLeft]);

  return (
    <div className="threejs-controller">
      <button title="load cube" onClick={() => loadCubeHandler()}>
        cube
      </button>
      <button title={`${rotating ? "stop" : "start"} rotation`} onClick={() => rotationHandler()}>
        {rotating ? "stop" : "start"} rotation
      </button>

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
    </div>
  );
};

export default Controller;
