import "./App.css";
import { useEffect } from "react";
import "./custom.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import wallImg from "./assets/wall.jpeg";
import roofImg from "./assets/roof.jpg";
import grassImg from "./assets/grass.webp";
window.bootstrap = require("bootstrap");

function Room() {
  // three js start

  useEffect(() => {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    var textureLoader = new THREE.TextureLoader();

    // Camera
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // camera position

    // Renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document
      .getElementById("threeJsComponent")
      .appendChild(renderer.domElement);

    // Room
    var roomSize = 4;
    var wallThickness = 0.01;

    var walltexture = textureLoader.load(wallImg);
    var roofTexture = textureLoader.load(roofImg);
    var grassTexture = textureLoader.load(grassImg);

    var wallMaterial = new THREE.MeshBasicMaterial({ map: walltexture });
    var grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });

    var roofMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
    var floorMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen" });

    // Floor
    var floorGeometry = new THREE.BoxGeometry(
      roomSize,
      wallThickness,
      roomSize
    );
    var grassFloorGeometry = new THREE.BoxGeometry(
      roomSize * 6,
      wallThickness,
      roomSize * 8
    );
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    var grassFloor = new THREE.Mesh(grassFloorGeometry, grassMaterial);

    floor.position.y = -roomSize / 2;
    grassFloor.position.y = -roomSize / 2;

    // Ceiling
    var ceiling = new THREE.Mesh(floorGeometry, roofMaterial);
    ceiling.position.y = roomSize / 2;

    // Left Wall
    var leftWallGeometry = new THREE.BoxGeometry(
      wallThickness,
      roomSize,
      roomSize
    );
    var leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -roomSize;

    // Right Wall
    var rightWall = leftWall.clone();
    rightWall.position.x = roomSize;

    // Front Wall
    var frontWallGeometry = new THREE.BoxGeometry(
      roomSize * 2,
      roomSize,
      wallThickness
    );
    var frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.z = -roomSize / 2;
    // scene.add(frontWall);

    // Back Wall
    var backWall = frontWall.clone();
    backWall.position.z = roomSize / 2;
    // scene.add(backWall);

    var roofGeometry = new THREE.PlaneGeometry(roomSize * 2, roomSize / 1.2);

    var leftRoof = new THREE.Mesh(
      roofGeometry,
      new THREE.MeshBasicMaterial({
        map: roofTexture,
        side: THREE.DoubleSide,
      })
    );
    leftRoof.rotation.x = Math.PI / 3.65; // 4 -> 45 degrees
    leftRoof.position.y = 2.7;
    // leftRoof.position.x = 1;
    leftRoof.position.z = -Math.PI / 2.5;

    var rightRoof = new THREE.Mesh(
      roofGeometry,
      new THREE.MeshBasicMaterial({
        map: roofTexture,
        side: THREE.DoubleSide,
      })
    );
    rightRoof.rotation.x = -Math.PI / 3.65; // 4 -> -45 degrees
    rightRoof.position.y = 2.7;
    rightRoof.position.z = Math.PI / 2.5;

    // School Boundary

    var leftSchoolWallGeometry = new THREE.BoxGeometry(
      wallThickness,
      roomSize,
      roomSize * 8
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
    frontSchoolWall.position.z = roomSize * 4;
    var backSchoolWall = frontSchoolWall.clone();
    backSchoolWall.position.z = -roomSize * 4;

    // here is defined the tree
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 9);
    const leavesGeometry = new THREE.SphereGeometry(1, 8, 10);
    // defined the mesbasicmaterial
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create mesh for the trunk and leaves
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);

    // Add the trunk and leaves to the scene
    scene.add(trunk);
    scene.add(leaves);
    // Create groups
    const wallsAndRoofGroup = new THREE.Group();
    const otherObjectsGroup = new THREE.Group();
    wallsAndRoofGroup.add(
      leftSchoolWall,
      rightSchoolWall,
      frontSchoolWall,
      backSchoolWall,
      leftRoof,
      rightRoof,
      backWall,
      frontWall,
      rightWall,
      leftWall,
      floor
    );
    otherObjectsGroup.add(grassFloor);

    // Add the groups to the scene
    scene.add(wallsAndRoofGroup);
    scene.add(otherObjectsGroup);
    
    // Create a raycaster and a vector to store mouse coordinates
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Add event listener for mouse clicks
    window.addEventListener("click", onMouseClick, false);

    function onMouseClick(event) {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set ray's origin at camera's position
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with the tree
      const intersects = raycaster.intersectObject(wallsAndRoofGroup);

      if (intersects.length > 0) {
        // Tree is clicked
        alert("Tree clicked!");
      }
    }

    // THIS IS rotate PROPERTY
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
  //  three js ended here
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-lg-12 bg-info p-0 max-h-100vh">
          <div className="card  rounded-0 ">
            <div className="card-body vh-100 p-0 bg-primary" id="">
              <div id="threeJsComponent"></div>

              {/* <img className='h-100 w-100' src={img}/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;

// var houseShape = new THREE.Group();
// houseShape.add(
//   leftSchoolWall,
//   rightSchoolWall,
//   frontSchoolWall,
//   backSchoolWall
// );
// scene.add(houseShape);
// var roofShape = new THREE.Group();
// roofShape.add(
//   leftRoof,
//   rightRoof,
//   backWall,
//   frontWall,
//   rightWall,
//   leftWall
// );
// scene.add(roofShape);
// scene.add(floor);
// scene.add(grassFloor);
