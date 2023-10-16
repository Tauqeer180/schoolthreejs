import * as THREE from "three";
import wallImg from "../assets/wall.jpeg";
import roofImg from "../assets/roof.jpg";
import doorImg from "../assets/New.png";
import windowImg from "../assets/window.jpg";
const Roof = () => {
//   const trunkGeometry = new THREE.CylinderGeometry(0.5, 1, 14, 4);
//   const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const width = 2;  
const height = 2; 
const depth = 2;
  const geometry = new THREE.ConeGeometry(2, 2, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0x9a6966 });
  const cone = new THREE.Mesh(geometry, material);
  cone.castShadow = true;
  cone.receiveShadow = true;
  cone.position.set(-3, 6, 0);

  const cubeGeometry = new THREE.BoxGeometry(width,height, depth);
  const cubeMeterial = new THREE.MeshBasicMaterial({ color: 0xf1f2f4 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
  cube.position.set(-3, 4, 0);
  cone.rotateY(-Math.PI/1.3)
  const roofObject = new THREE.Group();
  roofObject.position.set(5,0,0)
  roofObject.add(cone, cube);
  return roofObject;
};

export default Roof;
