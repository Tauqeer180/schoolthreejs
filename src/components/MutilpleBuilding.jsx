import * as THREE from "three";
import wallImg from "../assets/wall.jpeg";
import roofImg from "../assets/roof.jpg";
import doorImg from "../assets/New.png";
import windowImg from "../assets/window.jpg";
import Roof from "./Roof";

function CreateHouse(
  x,
  z,
  buildingId,
  setSelectedBuilding,
  selectedBuilding,
  setShowModal,
  camera,
  scene,
  renderer
  // CloseModal
) {
  const roomSize = 4;
  const textureLoader = new THREE.TextureLoader();
  const wallThickness = 0.1;
  const roofTexture = textureLoader.load(roofImg);
  const walltexture = textureLoader.load(wallImg);
  const windowTexture = textureLoader.load(windowImg);
  const doorTexture = textureLoader.load(doorImg);
  const wallMaterial = new THREE.MeshPhongMaterial({
    map: walltexture,
    side: THREE.DoubleSide,
  });
  const windowMaterial = new THREE.MeshPhongMaterial({
    map: windowTexture,
  });
  const doorMaterial = new THREE.MeshPhongMaterial({ map: doorTexture });

  const floorMaterial = new THREE.MeshPhongMaterial({
    color: "lightgreen",
  });
  const windowGeometry = new THREE.BoxGeometry(
    roomSize,
    roomSize * 0.5,
    wallThickness * 2
  );
  const doorGeometry = new THREE.BoxGeometry(
    wallThickness * 2,
    roomSize - 0.5,
    roomSize / 1.5
  );
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
  function onMouseClick(event, objToClick, objId) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(objToClick);

    if (intersects.length > 0) {
      setSelectedBuilding(objId);
      camera.position.z = objToClick.position.z;
      camera.position.x = 10;
      camera.position.y = 10;
      // camera.fov = 30;
      camera.lookAt(objToClick.position);
      camera.updateProjectionMatrix();

      setShowModal(true);
    }
  }
  const house = new THREE.Group();
  const floorGeometry = new THREE.BoxGeometry(
    roomSize * 2,
    wallThickness,
    roomSize
  );

  // Pentagone
  const pentaShape = new THREE.Shape();
  // Starting from bottom-left
  pentaShape.moveTo(-2, -2); // Bottom left corner

  // Moving to bottom-right
  pentaShape.lineTo(2, -2); // Bottom right corner

  // Moving up vertically on the right
  pentaShape.lineTo(2, 2); // Top right of the base

  // Moving to the top-center (roof)
  pentaShape.lineTo(0, 3.75); // Apex of the roof

  // Moving down vertically on the left
  pentaShape.lineTo(-2, 2); // Top left of the base

  // Close the pentaShape
  pentaShape.lineTo(-2, 0); // Bottom left corner
  // Create a geometry from the shape
  const pentaGeometry = new THREE.ShapeGeometry(pentaShape);
  pentaGeometry.rotateY(-Math.PI / 2);
  // Pentagone

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -roomSize / 2;
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

  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.position.z = -roomSize * 0.5;

  let doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
  doorMesh.position.set(4, 0.1, roomSize / 2 - 2);
  const backWall = frontWall.clone();
  backWall.position.z = roomSize / 2;

  const roofGeometry = new THREE.PlaneGeometry(roomSize * 2, roomSize / 1.2);

  const leftRoof = new THREE.Mesh(
    roofGeometry,
    new THREE.MeshPhongMaterial({
      map: roofTexture,
      side: THREE.DoubleSide,
    })
  );
  leftRoof.rotation.x = Math.PI / 3.65;
  leftRoof.position.y = 2.7;
  leftRoof.position.z = -Math.PI / 2.5;

  const rightRoof = new THREE.Mesh(
    roofGeometry,
    new THREE.MeshPhongMaterial({
      map: roofTexture,
      side: THREE.DoubleSide,
    })
  );
  rightRoof.rotation.x = -Math.PI / 3.65;
  rightRoof.position.y = 2.7;
  rightRoof.position.z = Math.PI / 2.5;

  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  frontWall.castShah = true;
  frontWall.receiveShadow = true;
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  leftRoof.castShadow = true;
  leftRoof.receiveShadow = true;
  rightRoof.castShadow = true;
  rightRoof.receiveShadow = true;
  windowMesh.castShadow = true;
  windowMesh.receiveShadow = true;
  // const roofArea = Roof();

  house.add(
    leftWall,
    rightWall,
    frontWall,
    backWall,
    leftRoof,
    rightRoof,
    windowMesh,
    doorMesh,
    // roofArea
  );
  house.position.x = x;
  house.position.z = z;
  house.castShadow = true; // Enable the house to cast shadows
  house.receiveShadow = true; // Enable the house to receive shadows

  function onDocumentMouseWheel(event) {
    camera.position.z = 0; // Adjust the factor (0.1) as needed for the zoom speed
    renderer.render(scene, camera);
  }
  document.addEventListener("wheel", onDocumentMouseWheel);
  window.addEventListener(
    "click",
    (event) => onMouseClick(event, house, buildingId),
    false
  );

  return house;
}

export default CreateHouse;
