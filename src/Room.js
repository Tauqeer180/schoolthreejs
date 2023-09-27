import "./App.css";
import { useState, useEffect, useRef } from "react";
import "./custom.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import wallImg from "./assets/wall.jpeg";
import roofImg from "./assets/roof.jpg";
import grassImg from "./assets/grass.webp";

window.bootstrap = require("bootstrap");

function Room() {
  // three js start

  useEffect(() => {
    var scene = new THREE.Scene();
    var textureLoader = new THREE.TextureLoader();

    // Camera
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;
    camera.position.x = 4;
    camera.position.y = 4;
    // camera.rotation.x = Math.PI / 2;
    // camera.rotation.y = Math.PI / 4;
    // camera.rotation.z = Math.PI / 2;
    // camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document
      .getElementById("threeJsComponent")
      .appendChild(renderer.domElement);

    // document.body.getElementById('threeJsComponent').appendChild(renderer.domElement);

    // Add ambient light to the scene
    // Room
    var roomSize = 4;
    var wallThickness = 0.01;

    var walltexture = textureLoader.load(wallImg);
    var roofTexture = textureLoader.load(roofImg);
    var grassTexture = textureLoader.load(grassImg);

    var wallMaterial = new THREE.MeshBasicMaterial({ map: walltexture });
    var grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });

    // wallMaterial.wrapS = THREE.RepeatWrapping;
    // wallMaterial.wrapT = THREE.RepeatWrapping;
    // wallMaterial?.repeat?.set(4, 4);
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
    // scene.add(floor);

    // Ceiling
    var ceiling = new THREE.Mesh(floorGeometry, roofMaterial);
    ceiling.position.y = roomSize / 2;
    // scene.add(ceiling);

    // Left Wall
    var leftWallGeometry = new THREE.BoxGeometry(
      wallThickness,
      roomSize,
      roomSize
    );
    var leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -roomSize;
    // scene.add(leftWall);

    // Right Wall
    var rightWall = leftWall.clone();
    rightWall.position.x = roomSize;
    // scene.add(rightWall);

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

    var shape = new THREE.Group();
    // shape.add(sphere);
    // shape.add(cube);
    shape.add(leftSchoolWall);
    shape.add(rightSchoolWall);
    shape.add(frontSchoolWall);
    shape.add(backSchoolWall);
    shape.add(leftRoof);
    shape.add(rightRoof);
    shape.add(backWall);
    shape.add(frontWall);
    shape.add(rightWall);
    shape.add(leftWall);
    // shape.add(ceiling);
    shape.add(floor);
    shape.add(grassFloor);

    scene.add(shape);

    // Render Loop

    var isDragging = false;
    var previousMousePosition = {
      x: 0,
      y: 0,
    };

    function onMouseDown(event) {
      isDragging = true;
    }

    function onMouseUp(event) {
      isDragging = false;
    }

    function onMouseMove(event) {
      if (isDragging) {
        var deltaMove = {
          x: event.offsetX - previousMousePosition.x,
          y: event.offsetY - previousMousePosition.y,
        };
        var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            toRadians(deltaMove.y * 0.1),
            toRadians(deltaMove.x * 0.1),
            0,
            "XYZ"
          )
        );
        shape.quaternion.multiplyQuaternions(
          deltaRotationQuaternion,
          shape.quaternion
        );
      }
      previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };
    }

    document.addEventListener("mousedown", onMouseDown, false);
    document.addEventListener("mouseup", onMouseUp, false);
    document.addEventListener("mousemove", onMouseMove, false);

    window.addEventListener("wheel", (event) => {
      const delta = Math.sign(event.deltaY);
      camera.position.z += delta;
      console.info("Mouse Delta ", delta);
    });

    var animate = function () {
      requestAnimationFrame(animate);

      // Rotation for demonstration
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      // sphere.rotation.y += 0.01;
      // sphere.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Helper function to convert degrees to radians
    function toRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }
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
