import { Scene, PerspectiveCamera, WebGLRenderer, Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
      while (id >= 0) {
        window.cancelAnimationFrame(id);
        id--;
      }
      if (id <= 0) {
        res("");
      }
    });

    p.then(() => {
      scene.children.forEach((item) => {
        if (item.type === "Mesh") {
          let animate = () => {
            requestAnimationFrame(animate);
            // renderer.render(scene, camera);
          };
          animate();
        }
      });
    }).catch();
  } else {
    scene.children.forEach((item) => {
      if (item.type === "Mesh") {
        let animate = () => {
          requestAnimationFrame(animate);
          item.rotation.x += 0.0055;
          item.rotation.y += 0.005;
          renderer.render(scene, camera);
        };
        animate();
      }
    });
  }
}

export const moveHorizantal = (
  val: number,
  camera: Camera,
  renderer: WebGLRenderer,
  scene: Scene
) => {
  camera.position.x += val;
  renderer.render(scene, camera);
};
