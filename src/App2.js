import "./App.css";
import { useState, useEffect, useRef } from "react";
import "./custom.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import wallImg from "./assets/wall.jpeg";
import rooImg from "./assets/roof.jpg";
window.bootstrap = require("bootstrap");

function App2() {
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
    camera.position.z = 18;
    camera.position.x = 4;
    camera.position.y = 4;
    // camera.rotation.x = Math.PI;
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
    var roofTexture = textureLoader.load(rooImg);

    var wallMaterial = new THREE.MeshBasicMaterial({ map: walltexture });
    var roofMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
    var floorMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen" });

    // Floor
    var floorGeometry = new THREE.BoxGeometry(
      roomSize,
      wallThickness,
      roomSize
    );
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);

    floor.position.y = -roomSize / 2;
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

    var shape = new THREE.Group();
    // shape.add(sphere);
    // shape.add(cube);
    shape.add(leftRoof);
    shape.add(rightRoof);
    shape.add(backWall);
    shape.add(frontWall);
    shape.add(rightWall);
    shape.add(leftWall);
    // shape.add(ceiling);
    shape.add(floor);

    
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
        <div className="col-lg-6 bg-info p-0 max-h-100vh">
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

export default App2;
