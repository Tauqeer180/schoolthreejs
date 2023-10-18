import * as THREE from "three";

export const Floor = () => {
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

  floor.castShadow = true;
  floor.receiveShadow = true;
  floorGrop.add(floor);
  return floorGrop;
};

export const FloorCircle = () => {
  const roomSize = 4;
  const wallThickness = 0.1;
  const floorsCircleGrop = new THREE.Group();
  const floorsGeometry = new THREE.CylinderGeometry(
    roomSize * 3,
    roomSize * 3,
    wallThickness,
    // 32
  );
  const floorsMaterial = new THREE.MeshBasicMaterial({
    color: "green",
  });
  const FloorCircle = new THREE.Mesh(floorsGeometry, floorsMaterial);

  FloorCircle.castShadow = true;
  FloorCircle.receiveShadow = true;
  floorsCircleGrop.add(FloorCircle);
  return floorsCircleGrop;
};

export const PentgonFloor = () => {
  const roomSize = 4;
  const wallThickness = 0.1;
  const floorspentgonGrop = new THREE.Group();
  const floorsGeometry = new THREE.CylinderGeometry(
    roomSize * 5,
    roomSize * 5,
    wallThickness,
    // 32
  );
  const floorsMaterial = new THREE.MeshBasicMaterial({
    color: "lightgray",
  });
  const Floorpentgon = new THREE.Mesh(floorsGeometry, floorsMaterial);

  Floorpentgon.castShadow = true;
  Floorpentgon.receiveShadow = true;
  floorspentgonGrop.add(Floorpentgon);
  return floorspentgonGrop;
};
