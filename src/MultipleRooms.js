import "./App.css";
import { useEffect, useState } from "react";
import "./custom.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import wallImg from "./assets/wall.jpeg";
import roofImg from "./assets/roof.jpg";
import doorImg from "./assets/New.png";
import grassImg from "./assets/grass.webp";
import windowImg from "./assets/window.jpg";
import schoolGate from "./assets/school-gate.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MultipleRoom() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const buildingInfo = [
    {
      id: 1,
      name: "Arts Department",
      content: "Content for Arts Department",
    },
    {
      id: 2,
      name: "Science Department",
      content: "Content for Science Department",
    },
    {
      id: 3,
      name: "Auditorium",
      content: "Content for Auditorium",
    },
    {
      id: 4,
      name: "Central Library",
      content: "Content for Central Library",
    },
    {
      id: 5,
      name: "Computer Lab",
      content: "Content for Computer Lab",
    },
  ];
  useEffect(() => {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    var textureLoader = new THREE.TextureLoader();

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document
      .getElementById("threeJsComponent")
      .appendChild(renderer.domElement);
    // value of room and thickness
    const roomSize = 4;
    const wallThickness = 0.01;
    const spacing = 8;

    var walltexture = textureLoader.load(wallImg);
    var roofTexture = textureLoader.load(roofImg);
    var grassTexture = textureLoader.load(grassImg);
    const windowTexture = textureLoader.load(windowImg);
    const doorTexture = textureLoader.load(doorImg);
    const gateTextre = textureLoader.load(schoolGate);

    var wallMaterial = new THREE.MeshBasicMaterial({
      map: walltexture,
      side: THREE.DoubleSide,
    });
    var grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
    const windowMaterial = new THREE.MeshBasicMaterial({ map: windowTexture });
    const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture });
    const gateMaterial = new THREE.MeshBasicMaterial({ map: gateTextre });

    const roofMaterial = new THREE.MeshBasicMaterial({
      color: 0x00697e,
      // 0xf6eedc
      side: THREE.DoubleSide,
    });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen" });

    const grassFloorGeometry = new THREE.BoxGeometry(
      roomSize * 10,
      wallThickness,
      roomSize * 15
    );
    const grassFloor = new THREE.Mesh(grassFloorGeometry, grassMaterial);

    grassFloor.position.y = -roomSize / 2;

    const leftSchoolWallGeometry = new THREE.BoxGeometry(
      wallThickness,
      roomSize,
      roomSize * 15
    );
    var frontSchoolWallGeometry = new THREE.BoxGeometry(
      roomSize * 10,
      roomSize,
      wallThickness
    );
    const leftSchoolWall = new THREE.Mesh(leftSchoolWallGeometry, wallMaterial);
    leftSchoolWall.position.x = -roomSize * 5;
    const rightSchoolWall = leftSchoolWall.clone();
    rightSchoolWall.position.x = roomSize * 5;
    const frontSchoolWall = new THREE.Mesh(
      frontSchoolWallGeometry,
      wallMaterial
    );
    const gateGeometry = new THREE.BoxGeometry(
      wallThickness * 2,
      roomSize * 1,
      roomSize * 3
    );
    frontSchoolWall.position.z = roomSize * 7.5;
    const backSchoolWall = frontSchoolWall.clone();
    backSchoolWall.position.z = -roomSize * 7.5;
    //  Create the window geometry and material

    const windowGeometry = new THREE.BoxGeometry(
      roomSize,
      roomSize * 0.5,
      wallThickness * 5
    );
    const doorGeometry = new THREE.BoxGeometry(
      wallThickness * 5,
      roomSize - 0.5,
      roomSize / 1.5
    );

    //  building
    const colors = [
      0xffffff, // Red
      0xffffff, // Green
      0xb0d9b1, // Blue
      0xffffff, // Yellow
      0xffffff, // Magenta
      0xffffff, // Cyan
    ];
    const cubes = [
      createColoredCube(-9, 2, 25, 7, 5, 5, colors),
      createColoredCube(-4, 0, 25, 4, 3, 4, colors),
      createColoredCube(-9.5, 0.65, 20.5, 4, 3, 4, colors),
      createColoredCube(-6, -0.75, 20.5, 4, 3, 4.5, colors),
    ];
    //  const cubes = [
    //   createColoredCube(-2, 2, 25, 7, 8, 7, colors),
    //   createColoredCube(2, 0, 25, 8, 4, 6, colors),
    //   createColoredCube(-2, 0.65, 20.5, 7, 3, 7, colors),
    //   createColoredCube(-0.4, -0.75, 20.5, 10, 3, 6, colors),
    // ];
    cubes.forEach((cube) => scene.add(cube));
    // building
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector3(0, 0, -1).applyQuaternion(
      camera.quaternion
    );
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
    function createHouse(x, z, buildingId) {
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
      var pentaGeometry = new THREE.ShapeGeometry(pentaShape);
      pentaGeometry.rotateY(-Math.PI / 2);
      // Pentagone

      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = -roomSize / 2;

      const ceiling = new THREE.Mesh(floorGeometry, roofMaterial);
      ceiling.position.y = roomSize / 2;

      // const leftWallGeometry = new THREE.BoxGeometry(
      //   wallThickness,
      //   roomSize * 2,
      //   roomSize
      // );
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

      const roofGeometry = new THREE.PlaneGeometry(
        roomSize * 2,
        roomSize / 1.2
      );

      const leftRoof = new THREE.Mesh(
        roofGeometry,
        new THREE.MeshBasicMaterial({
          map: roofTexture,
          side: THREE.DoubleSide,
        })
      );
      leftRoof.rotation.x = Math.PI / 3.65;
      leftRoof.position.y = 2.7;
      leftRoof.position.z = -Math.PI / 2.5;

      const rightRoof = new THREE.Mesh(
        roofGeometry,
        new THREE.MeshBasicMaterial({
          map: roofTexture,
          side: THREE.DoubleSide,
        })
      );
      rightRoof.rotation.x = -Math.PI / 3.65;
      rightRoof.position.y = 2.7;
      rightRoof.position.z = Math.PI / 2.5;

      house.add(
        //floor,
        // ceiling,
        leftWall,
        rightWall,
        frontWall,
        backWall,
        leftRoof,
        rightRoof,
        windowMesh,
        doorMesh
      );
      house.position.x = x;
      house.position.z = z;
      scene.add(house);
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
    }
    function onDocumentMouseWheel(event) {
      camera.position.z = 0; // Adjust the factor (0.1) as needed for the zoom speed
      renderer.render(scene, camera);
    }
    document.addEventListener("wheel", onDocumentMouseWheel);
    createHouse(-4, -spacing, 1);
    createHouse(-4, spacing, 2); //row 1 house
    createHouse(-4, 0, 3); //row 3 house
    // createHouse(2, 17, 4);
    createHouse(2, -20, 5);
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 4);
    const leavesGeometry = new THREE.SphereGeometry(1, 9, 5);
//     const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 5); 
// const leavesGeometry = new THREE.SphereGeometry(1, 9, 15);


    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 10
    const gateMesh = new THREE.Mesh(gateGeometry, gateMaterial);
    gateMesh.position.set(20, 0.1, roomSize / 2 - 2);

    // scene.add(trunk);
    // scene.add(leaves);
    const otherObjectsGroup = new THREE.Group();
    otherObjectsGroup.add(
      grassFloor,
      leftSchoolWall,
      rightSchoolWall,
      frontSchoolWall,
      backSchoolWall,
      gateMesh
    );
    // scene.add(wallsAndRoofGroup);
    scene.add(otherObjectsGroup);
    camera.position.set(20, 20, 0);
    camera.lookAt(scene.position);
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    const animate = function () {
      requestAnimationFrame(animate);

      trunk.position.x = 10;
      trunk.position.y = 0.5;
      trunk.position.z = 0;

      leaves.position.x = 10;
      leaves.position.y = 0.5;
      leaves.position.z = 0;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("click", onMouseClick);
    };
  }, []);
  const closeModal = () => {
    setShowModal(false);
    setSelectedBuilding(null);
  };
  const createColoredCube = (x, y, z, width, height, depth, colors) => {
    const materials = colors.map(
      (color) => new THREE.MeshBasicMaterial({ color })
    );
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);
    return cube;
  };
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-lg-12 bg-info p-0">
          <div className="card  rounded-0 ">
            <div className="card-body vh-100 p-0  ">
              <div id="threeJsComponent"></div>

              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  {/*   */}
                  <Modal.Title>
                    {selectedBuilding !== null &&
                      buildingInfo?.find((b) => b?.id === selectedBuilding)
                        .name}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-content">
                  {selectedBuilding !== null &&
                    buildingInfo?.find((b) => b.id === selectedBuilding)
                      .content}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultipleRoom;
