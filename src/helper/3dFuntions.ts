import { Scene, PerspectiveCamera, WebGLRenderer, Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as Three from "three";

export function resizeLogic(
  element: HTMLDivElement,
  renderer: WebGLRenderer,
  camera: PerspectiveCamera
) {
  renderer.setSize(element.clientWidth, element.clientHeight);
  camera.aspect = element.clientWidth / element.clientHeight;
  camera.updateProjectionMatrix();
}

export function clearItems(scene: Scene) {
  scene.children.forEach((item) => {
    if (item.type === "Mesh") {
      scene.remove(item);
    } else {
      // console.log(item);
    }
  });
}

export function toggleRotation(
  scene: Scene,
  renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  controls: OrbitControls,
  rotate: boolean = false
) {
  if (!rotate) {
    const p = new Promise((res, rej) => {
      let id = window.requestAnimationFrame(() => {});
      id--;
      while (id--) {
        window.cancelAnimationFrame(id);
      }
    });

    p.then(() => {
      camera.updateMatrix();
      scene.children.forEach((item) => {
        if (item.type === "Mesh") {
          // let animate = () => {
          //   // requestAnimationFrame(animate);
          // };
          // animate();
        }
      });
    }).catch();
  } else {
    const p = new Promise((res, rej) => {
      let id = window.requestAnimationFrame(() => {});
      id--;
      while (id--) {
        window.cancelAnimationFrame(id);
      }
    });
    p.then().catch();
    scene.children.forEach((item) => {
      if (item.type === "Mesh") {
        let animate = () => {
          requestAnimationFrame(animate);
          item.rotation.y += 0.005;
          item.rotation.x += 0.0055;
          controls.update();
        };
        animate();
      }
    });
  }
}

export const moveHorizantal = (val: number, controls: OrbitControls) => {
  const offset = new Three.Vector3();
  const position = controls.object.position;
  offset.copy(position).sub(controls.target);
  let targetDistance = offset.length();
  //@ts-ignore
  targetDistance *= Math.tan(((controls.object.fov / 2) * Math.PI) / 180.0);
  //@ts-ignore
  const distance = (2 * val * targetDistance) / controls.domElement.offsetHeight;
  const objectMatrix = controls.object.matrix;
  const v = new Three.Vector3();
  v.setFromMatrixColumn(objectMatrix, 0);
  v.multiplyScalar(-distance);
  controls.target.add(v);
};

export const moveVertical = (val: number, controls: OrbitControls) => {
  const offset = new Three.Vector3();
  const position = controls.object.position;
  offset.copy(position).sub(controls.target);
  let targetDistance = offset.length();
  //@ts-ignore
  targetDistance *= Math.tan(((controls.object.fov / 2) * Math.PI) / 180.0);
  //@ts-ignore
  const distance = (2 * val * targetDistance) / controls.domElement.offsetHeight;
  const objectMatrix = controls.object.matrix;
  const v = new Three.Vector3();
  v.setFromMatrixColumn(objectMatrix, 1);
  v.multiplyScalar(distance);
  controls.target.add(v);
};
