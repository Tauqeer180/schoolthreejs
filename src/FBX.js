import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

// Create scene, camera, and renderer

export default function FBX() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add light
  const light = new THREE.PointLight(0xffffff, 1, 1000);
  light.position.set(50, 50, 50);
  scene.add(light);

  // Load FBX model
  const loader = new FBXLoader();
  loader.load("./assets/building_04.fbx", (fbx) => {
    console.log("FBX ", fbx);
    scene.add(fbx);
  });

  // Set up controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // Set camera position
  camera.position.z = 5;

  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
}
