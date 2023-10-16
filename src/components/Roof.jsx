import * as THREE from "three";
import wallImg from "../assets/wall.jpeg";
import roofImg from "../assets/roof.jpg";
import doorImg from "../assets/New.png";
import windowImg from "../assets/window.jpg";
const Roof = () => {
  const roomSize = 4;
  const textureLoader = new THREE.TextureLoader();
  const wallThickness = 0.1;
  // const roofTexture = textureLoader.load(roofImg);
  const walltexture = textureLoader.load(wallImg);
  // const windowTexture = textureLoader.load(windowImg);
  // const doorTexture = textureLoader.load(doorImg);
  const wallMaterial = new THREE.MeshPhongMaterial({
    map: walltexture,
    side: THREE.DoubleSide,
  });
  const leftWall = new THREE.Mesh(pentaGeometry, wallMaterial);
  leftWall.position.x = -roomSize;

  const rightWall = leftWall.clone();
  rightWall.position.x = roomSize;

  const frontWallGeometry = new THREE.BoxGeometry(
    roomSize * 2,
    roomSize,
    wallThickness
  );
  const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
  frontWall.position.z = -roomSize / 2;
  //   const roofGeometry = new THREE.PlaneGeometry(roomSize * 2, roomSize / 1.2);
  const roofObject = new THREE.Group();
  roofObject.add(leftWall, rightWall, frontWall);
  return roofObject;
};

export default Roof;
