import "./App.css";
import { useEffect, useState } from "react";
import "./custom.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import wallImg from "./assets/wall.jpeg";
import roofImg from "./assets/roof.jpg";
import doorImg from "./assets/New.png";
import windowImg from "./assets/window.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tree from "./components/Tree";
import BoundryWallPlot from "./components/BoundryWallPlot";
import Building from "./components/Building";

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
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document
      .getElementById("threeJsComponent")
      .appendChild(renderer.domElement);
    // value of room and thickness
    const roomSize = 4;
    const wallThickness = 0.1;
    const spacing = 8;

    var roofTexture = textureLoader.load(roofImg);
    var walltexture = textureLoader.load(wallImg);
    const windowTexture = textureLoader.load(windowImg);
    const doorTexture = textureLoader.load(doorImg);

    var wallMaterial = new THREE.MeshBasicMaterial({
      map: walltexture,
      side: THREE.DoubleSide,
    });
    const windowMaterial = new THREE.MeshBasicMaterial({ map: windowTexture });
    const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture });

    const floorMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen" });

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

    // cubes building
    const cubeBuilding = Building();
    scene.add(cubeBuilding);
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

      const leftWallGeometry = new THREE.BoxGeometry(
        wallThickness*2,
        roomSize /4,
        roomSize
      );
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.x = -roomSize;

      const rightWall = leftWall.clone();
      rightWall.position.x = roomSize;

      const frontWallGeometry = new THREE.BoxGeometry(
        roomSize * 2,
        roomSize /4,
        wallThickness *4
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
        leftWall,
        rightWall,
        frontWall,
        backWall,
        // leftRoof,
        // rightRoof,
        // windowMesh,
        // doorMesh
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
    // Tree Object
    const treeObject1 = Tree();
    const treeObject2 = Tree();
    treeObject1.position.set(12, 0, 10);
    treeObject2.position.set(12, 0, -10);
    scene.add(treeObject1, treeObject2);

    // scene.add(wallsAndRoofGroup);

    // Boundary Wall Plot
    const BoundryWallGroup = BoundryWallPlot();
    scene.add(BoundryWallGroup);
    // Boundry Wall Plot

    camera.position.set(20, 20, 0);
    scene.position.set(-10, 0, 0);
    camera.lookAt(scene.position);
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    const animate = function () {
      requestAnimationFrame(animate);
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
