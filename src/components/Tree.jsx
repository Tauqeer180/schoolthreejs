import * as THREE from "three";
import grassImg from "../assets/grass.webp";
export function Tree() {
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 4);
  // const leavesGeometry = new THREE.SphereGeometry(2, 20, 50);
const leavesGeometry = new THREE.DodecahedronBufferGeometry(3, 0);

  const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
  const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x7d9268 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  trunk.castShadow = true;
  trunk.receiveShadow = true;

  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  leaves.position.set(0, 3, 0);

  leaves.castShadow = true;
  leaves.receiveShadow = true;
  const treeObject = new THREE.Group();
  treeObject.add(trunk, leaves);

  return treeObject;
}

export function CloneTree() {
  // here is cone shape defined
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 1, 14, 4);
  const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });

  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(0, -5, 0);
  const geometry = new THREE.ConeGeometry(5, 10, 5);
  const material = new THREE.MeshBasicMaterial({ color: 0x688862 });
  const cone = new THREE.Mesh(geometry, material);
  cone.castShadow = true;
  trunk.castShadow = true;

  cone.receiveShadow = true;
  trunk.receiveShadow = true;
  cone.position.set(0, 0, 0);

  const coneObject = new THREE.Group();
  coneObject.add(trunk, cone);
  return coneObject;
}

export function CloneMultipleTree() {
  const MultipTree = new THREE.Group();
  function createStarCone(radius, height, numPoints, innerFactor) {
    const vertices = [];
    const indices = [];
    vertices.push(0, height, 0);
    for (let i = 0; i < numPoints * 2; i++) {
      const factor = i % 2 === 0 ? 1 : innerFactor;
      const angle = ((Math.PI * 2) / (numPoints * 2)) * i;
      const x = Math.cos(angle) * radius * factor;
      const z = Math.sin(angle) * radius * factor;
      vertices.push(x, 0, z);
    }

    for (let i = 2; i <= numPoints * 2; i++) {
      indices.push(0, i - 1, i);
    }
    indices.push(0, numPoints * 2, 1);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);

    return geometry;
  }

  // Usage
  const radius = 4;
  const height = 7;
  const numPoints = 5; // Number of outward points of the star
  const innerFactor = 0.3; // How much inward the inner points should be, between 0 and 1
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 4);
  const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  const starConeGeometry = createStarCone(
    radius,
    height,
    numPoints,
    innerFactor
  );
  const textureLoader = new THREE.TextureLoader();
  const grassTexture = textureLoader.load(grassImg);

  const material = new THREE.MeshBasicMaterial({
    color: 0x4caf50,
    side: THREE.DoubleSide,
  });
  const starCone = new THREE.Mesh(starConeGeometry, material);
  const starCone1 = starCone.clone();
  const starCone2 = starCone.clone();
  trunk.castShadow = true;
  trunk.receiveShadow = true;

  starCone.castShadow = true;
  starCone.receiveShadow = true;

  starCone1.castShadow = true;
  starCone1.receiveShadow = true;

  starCone2.castShadow = true;
  starCone2.receiveShadow = true;

  starCone.position.set(0, 2, 0);
  starCone1.position.set(0, 4, 0);
  starCone2.position.set(0, 6, 0);
  MultipTree.add(trunk, starCone, starCone1, starCone2);
  return MultipTree;
}
