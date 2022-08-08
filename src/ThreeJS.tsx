import { useState, useEffect, useRef } from "react";

import { resizeLogic } from "./helper/3dFuntions";

import { Scene, PerspectiveCamera, WebGLRenderer, PointLight, AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Controller from "./Controller";

const ThreeJS = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const scene = useRef<Scene>();
  const camera = useRef<PerspectiveCamera>();
  const renderer = useRef<WebGLRenderer>();
  const controls = useRef<OrbitControls>();

  useEffect(() => {
    if (ref.current && !loaded) {
      scene.current = new Scene();
      camera.current = new PerspectiveCamera(
        75,
        ref.current.clientWidth / ref.current.clientHeight,
        0.1,
        1000
      );

      renderer.current = new WebGLRenderer();

      controls.current = new OrbitControls(camera.current, renderer.current.domElement);

      setLoaded(true);
    }
  }, [ref, loaded]);

  useEffect(() => {
    if (loaded) {
      if (renderer.current && ref.current && scene.current && camera.current) {
        renderer.current.setSize(ref.current.clientWidth, ref.current.clientHeight);
        ref.current.appendChild(renderer.current.domElement);

        camera.current.position.z = 5;

        const light = new PointLight(0xffffff);
        light.position.set(20, 20, 20);
        scene.current.add(light);
        const ambient = new AmbientLight(0x202020);
        scene.current.add(ambient);

        const resize = () => {
          if (ref.current && renderer.current && camera.current)
            resizeLogic(ref.current, renderer.current, camera.current);
        };

        window.addEventListener("resize", resize);
        ref.current.addEventListener("resize", resize);

        return () => {
          renderer.current?.clear();
          scene.current?.clear();
          ref?.current?.removeEventListener?.("resize", resize);
          window?.removeEventListener?.("resize", resize);
        };
      }
    }
  }, [loaded]);

  return (
    <div className="canvas">
      <Controller
        scene={scene.current}
        controls={controls.current}
        camera={camera.current}
        renderer={renderer.current}
      />
      <div ref={ref} className="renderer" />
    </div>
  );
};

export default ThreeJS;
