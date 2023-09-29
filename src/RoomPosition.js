import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import wallImg from "./assets/wall.jpeg";
import roofImg from "./assets/roof.jpg";
import grassImg from "./assets/grass.webp";

function RoomPosition() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    const textureLoader = new THREE.TextureLoader();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 4, 25);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threeJsComponent").appendChild(renderer.domElement);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    const roomSize = 4;
    const wallThickness = 0.01;
    const spacing = 8; // Adjust the spacing between houses

    const wallTexture = textureLoader.load(wallImg);
    const roofTexture = textureLoader.load(roofImg);
    const grassTexture = textureLoader.load(grassImg);

    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
    const grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
    const roofMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen" });

    function createHouse(x, z) {
      const house = new THREE.Group();

      const floorGeometry = new THREE.BoxGeometry(roomSize, wallThickness, roomSize);
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = -roomSize / 2;

      const ceiling = new THREE.Mesh(floorGeometry, roofMaterial);
      ceiling.position.y = roomSize / 2;

      const leftWallGeometry = new THREE.BoxGeometry(wallThickness, roomSize, roomSize);
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.x = -roomSize;

      const rightWall = leftWall.clone();
      rightWall.position.x = roomSize;

      const frontWallGeometry = new THREE.BoxGeometry(roomSize * 2, roomSize, wallThickness);
      const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
      frontWall.position.z = -roomSize / 2;

      const backWall = frontWall.clone();
      backWall.position.z = roomSize / 2;

      const roofGeometry = new THREE.PlaneGeometry(roomSize * 2, roomSize / 1.2);

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

      house.addEventListener("click", () => {
        setShowModal(true);
      });
    }

    // Create five houses with increased spacing
    createHouse(0, spacing);
    createHouse(spacing, 0);
    createHouse(-spacing, 0);
    createHouse(0, spacing);
    createHouse(0, -spacing);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", onMouseClick, false);

    function onMouseClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        setShowModal(true);
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      orbit.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("click", onMouseClick);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-lg-12 bg-info p-0 max-h-100vh">
          <div className="card  rounded-0 ">
            <div className="card-body vh-100 p-0 bg-primary" id="threeJsComponent">
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>House Clicked</Modal.Title>
                </Modal.Header>
                <Modal.Body>Details of the house you clicked on.</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
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

export default RoomPosition;
