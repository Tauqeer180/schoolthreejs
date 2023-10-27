import * as THREE from "three";
import schoolGate from "../assets/school-gate.png";
import wallImg from "../assets/wall.jpeg";
import grassImg from "../assets/grass.webp";

export default function BoundryWallPlot() {
  const roomSize = 4;
  const wallThickness = 0.1;

  const textureLoader = new THREE.TextureLoader();

  /**Gate Code Start*/
  const gateTextre = textureLoader.load(schoolGate);
  const gateMaterial = new THREE.MeshLambertMaterial({ map: gateTextre });
  const walltexture = textureLoader.load(wallImg);
  const grassTexture = textureLoader.load(grassImg);

  const wallMaterial = new THREE.MeshLambertMaterial({
    map: walltexture,
    side: THREE.DoubleSide,
  });
  const grassMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });
  const gateGeometry = new THREE.BoxGeometry(
    wallThickness * 10,
    roomSize * 1,
    roomSize * 3
  );
  const gateMesh = new THREE.Mesh(gateGeometry, gateMaterial);
  gateMesh.position.set(42 + 0.2, 0.1, roomSize / 2 - 2);
  // repeat texture
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(roomSize * 2, roomSize * 4);

  /**
   * Gate
   */

  const grassFloorGeometry = new THREE.BoxGeometry(
    roomSize * 25,
    wallThickness,
    roomSize * 50
  );
  const grassFloor = new THREE.Mesh(grassFloorGeometry, grassMaterial);
  grassFloor.receiveShadow = true;
  grassFloor.position.x = -roomSize * 2;
  grassFloor.position.y = -roomSize / 2;

  const leftSchoolWallGeometry = new THREE.BoxGeometry(
    wallThickness * 10,
    roomSize,
    roomSize * 50
  );
  const frontSchoolWallGeometry = new THREE.BoxGeometry(
    roomSize * 24.5,
    roomSize,
    wallThickness * 10
  );
  const leftSchoolWall = new THREE.Mesh(leftSchoolWallGeometry, wallMaterial);
  leftSchoolWall.position.x = -roomSize * 14;

  leftSchoolWall.castShadow = true;
  leftSchoolWall.receiveShadow = true;

  const rightSchoolWall = leftSchoolWall.clone();
  rightSchoolWall.position.x = roomSize * 10.5;
  const frontSchoolWall = new THREE.Mesh(frontSchoolWallGeometry, wallMaterial);
  frontSchoolWall.position.z = roomSize * 25;
  frontSchoolWall.position.x = -roomSize * 2;

  frontSchoolWall.castShadow = true;
  frontSchoolWall.receiveShadow = true;

  const backSchoolWall = frontSchoolWall.clone();
  backSchoolWall.position.z = -roomSize * 25;
  // const axesHelper = new THREE.AxesHelper(20);

  // grassFloor.castShadow = true;
  // grassFloor.receiveShadow = true;

  // rightSchoolWall.castShadow = true;
  // rightSchoolWall.receiveShadow = true;
  const wallGroup = new THREE.Group();
  wallGroup.add(
    grassFloor,
    leftSchoolWall,
    rightSchoolWall,
    frontSchoolWall,
    backSchoolWall,
    gateMesh
    // axesHelper
  );

  return wallGroup;
}
