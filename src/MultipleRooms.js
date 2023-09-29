import "./App.css";
import { useEffect, useState } from "react";
import "./custom.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import wallImg from "./assets/wall.jpeg";
import roofImg from "./assets/roof.jpg";
import grassImg from "./assets/grass.webp";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MultipleRoom() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
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

    const roomSize = 4;
    const wallThickness = 0.01;
    const spacing = 8;

    var walltexture = textureLoader.load(wallImg);
    var roofTexture = textureLoader.load(roofImg);
    var grassTexture = textureLoader.load(grassImg);

    var wallMaterial = new THREE.MeshBasicMaterial({ map: walltexture });
    var grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });

    var roofMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
    var floorMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen" });

    var floorGeometry = new THREE.BoxGeometry(
      roomSize,
      wallThickness,
      roomSize
    );
    var grassFloorGeometry = new THREE.BoxGeometry(
      roomSize * 6,
      wallThickness,
      roomSize * 15
    );
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    var grassFloor = new THREE.Mesh(grassFloorGeometry, grassMaterial);

    floor.position.y = -roomSize / 2;
    grassFloor.position.y = -roomSize / 2;

    var ceiling = new THREE.Mesh(floorGeometry, roofMaterial);
    ceiling.position.y = roomSize / 2;

    var leftWallGeometry = new THREE.BoxGeometry(
      wallThickness,
      roomSize,
      roomSize
    );
    var leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -roomSize;

    var rightWall = leftWall.clone();
    rightWall.position.x = roomSize;

    var frontWallGeometry = new THREE.BoxGeometry(
      roomSize * 2,
      roomSize,
      wallThickness
    );
    var frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.z = -roomSize / 2;

    var backWall = frontWall.clone();
    backWall.position.z = roomSize / 2;

    var roofGeometry = new THREE.PlaneGeometry(roomSize * 2, roomSize / 1.2);

    var leftRoof = new THREE.Mesh(
      roofGeometry,
      new THREE.MeshBasicMaterial({
        map: roofTexture,
        side: THREE.DoubleSide,
      })
    );
    leftRoof.rotation.x = Math.PI / 3.65;
    leftRoof.position.y = 2.7;
    leftRoof.position.z = -Math.PI / 2.5;

    var rightRoof = new THREE.Mesh(
      roofGeometry,
      new THREE.MeshBasicMaterial({
        map: roofTexture,
        side: THREE.DoubleSide,
      })
    );
    rightRoof.rotation.x = -Math.PI / 3.65;
    rightRoof.position.y = 2.7;
    rightRoof.position.z = Math.PI / 2.5;

    var leftSchoolWallGeometry = new THREE.BoxGeometry(
      wallThickness,
      roomSize,
      roomSize * 15
    );
    var frontSchoolWallGeometry = new THREE.BoxGeometry(
      roomSize * 6,
      roomSize,
      wallThickness
    );
    var leftSchoolWall = new THREE.Mesh(leftSchoolWallGeometry, wallMaterial);
    leftSchoolWall.position.x = -roomSize * 3;
    var rightSchoolWall = leftSchoolWall.clone();
    rightSchoolWall.position.x = roomSize * 3;
    var frontSchoolWall = new THREE.Mesh(frontSchoolWallGeometry, wallMaterial);
    frontSchoolWall.position.z = roomSize * 7.5;
    var backSchoolWall = frontSchoolWall.clone();
    backSchoolWall.position.z = -roomSize * 7.5;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event, objToClick, objId) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(objToClick);

      if (intersects.length > 0) {
        setSelectedBuilding(objId);
        setShowModal(true);
      }
    }

    function createHouse(x, z, buildingId) {
      const house = new THREE.Group();

      const floorGeometry = new THREE.BoxGeometry(
        roomSize,
        wallThickness,
        roomSize
      );
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = -roomSize / 2;

      const ceiling = new THREE.Mesh(floorGeometry, roofMaterial);
      ceiling.position.y = roomSize / 2;

      const leftWallGeometry = new THREE.BoxGeometry(
        wallThickness,
        roomSize,
        roomSize
      );
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
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
        floor,
        ceiling,
        leftWall,
        rightWall,
        frontWall,
        backWall,
        leftRoof,
        rightRoof
      );

      house.position.x = x;
      house.position.z = z;

      scene.add(house);

      window.addEventListener(
        "click",
        (event) => onMouseClick(event, house, buildingId),
        false
      );
    }

    createHouse(-4, -spacing, 1);
    createHouse(-4, spacing, 2); //row 1 house
    createHouse(-4, 0, 3); //row 3 house
    createHouse(2, 17, 4);
    createHouse(2, -20, 5);

    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 9);
    const leavesGeometry = new THREE.SphereGeometry(1, 8, 10);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);

    scene.add(trunk);
    scene.add(leaves);

    const wallsAndRoofGroup = new THREE.Group();
    const otherObjectsGroup = new THREE.Group();
    wallsAndRoofGroup.add(
      leftRoof,
      rightRoof,
      backWall,
      frontWall,
      rightWall,
      leftWall,
      floor
    );
    otherObjectsGroup.add(
      grassFloor,
      leftSchoolWall,
      rightSchoolWall,
      frontSchoolWall,
      backSchoolWall
    );
    // scene.add(wallsAndRoofGroup);
    scene.add(otherObjectsGroup);

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(4, 4, 25);
    orbit.update();

    var animate = function () {
      requestAnimationFrame(animate);

      trunk.position.x = -10;
      trunk.position.y = -0.5;
      trunk.position.z = 0;

      leaves.position.x = -10;
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
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-lg-12 bg-info p-0 max-h-100vh">
          <div className="card  rounded-0 ">
            <div className="card-body vh-100 p-0 bg-primary" id="">
              <div id="threeJsComponent"></div>
              {/* <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {selectedBuilding
                      ? `Building ${selectedBuilding} Clicked`
                      : "Tree Clicked"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedBuilding
                    ? buildingInfo.find((b) => b.id === selectedBuilding)
                        .content
                    : "Content for Tree"}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal> */}

              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {selectedBuilding !== null &&
                      buildingInfo?.find((b) => b?.id === selectedBuilding)
                        .name}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
