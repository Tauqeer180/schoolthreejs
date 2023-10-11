import * as THREE from "three";

const Floor = () => {
  const roomSize = 4;
  const wallThickness = 0.1;
  const floorGrop = new THREE.Group();

  // defin the floor
  const floorGeometry = new THREE.BoxGeometry(
    roomSize * 5,
    wallThickness * 5,
    roomSize * 18
  );
  const floorMaterial = new THREE.MeshPhongMaterial({
    color: "0x838a93",
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  floor.position.set(0, -1.95, 5);
  floor.castShadow = true;
  floor.receiveShadow = true;
  floorGrop.add(floor);

  return floorGrop;
};

export default Floor;
