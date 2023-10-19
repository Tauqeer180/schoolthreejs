import * as THREE from "three";
import grassImg from "../assets/grass.webp";
import heightMapImg from "../assets/heightMap.webp";
import flowMapImg from "../assets/flowmap.png";
export function River() {
  // Load the height map and flow map textures
  var heightMap = new THREE.TextureLoader().load(heightMapImg);
  var flowMap = new THREE.TextureLoader().load(flowMapImg);

  // Create the water material
  var waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x0044ff,
    metalness: 0.9,
    roughness: 0.1,
    // envMap: reflectionCube,
    envMapIntensity: 1.0,
    normalMap: flowMap,
    normalScale: new THREE.Vector2(0.1, 0.1),
    // displacementMap: heightMap,
    displacementScale: 30.0,
    displacementBias: -10.0,
    side: THREE.DoubleSide,
  });

  // Create the water geometry
  var waterGeometry = new THREE.PlaneBufferGeometry(50, 100, 10, 1);
  const pentaShape = new THREE.Shape();
  pentaShape.moveTo(0, 0); // Bottom left

  pentaShape.lineTo(10, 0);
  // upper lines
  pentaShape.lineTo(11, -1);

  pentaShape.lineTo(25.5, -5);

  // bottom lines
  pentaShape.lineTo(26.5, 0);
  pentaShape.lineTo(11, 4);
  pentaShape.lineTo(10, 5);

  pentaShape.lineTo(0, 5);
  const pentaGeometry = new THREE.ExtrudeGeometry(pentaShape, { depth: 0 });
  // Create the water mesh
  var water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2;
  // water.position.y = -10;

  // Add the water mesh to the scene

  return water;
}
