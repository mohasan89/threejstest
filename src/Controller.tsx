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

import { clearItems, toggleRotation } from "./helper/3dFuntions";

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

  return (
    <div className="threejs-controller">
      <button title="load cube" onClick={() => loadCubeHandler()}>
        cube
      </button>
      <button title="stop rotation" onClick={() => rotationHandler()}>
        {rotating ? "stop" : "start"} rotation
      </button>
    </div>
  );
};

export default Controller;
