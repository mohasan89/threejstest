import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
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
    let id = window.requestAnimationFrame(() => {});
    while (id--) {
      window.cancelAnimationFrame(id);
    }
  } else {
    scene.children.forEach((item) => {
      if (item.type === "Mesh") {
        let animate = () => {
          requestAnimationFrame(animate);
          item.rotation.x += 0.0055;
          item.rotation.y += 0.005;
          renderer.render(scene, camera);
          controls.update();
        };
        animate();
      }
    });
  }
}
