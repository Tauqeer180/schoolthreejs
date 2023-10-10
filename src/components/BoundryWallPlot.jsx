import React from "react";
import * as THREE from "three";
import schoolGate from "../assets/school-gate.png";
import wallImg from "../assets/wall.jpeg";
import grassImg from "../assets/grass.webp";

export default function BoundryWallPlot() {
  const roomSize = 4;
  const wallThickness = 0.1;

  var textureLoader = new THREE.TextureLoader();

  // Gate Code Start
  const gateTextre = textureLoader.load(schoolGate);
  const gateMaterial = new THREE.MeshLambertMaterial({ map: gateTextre });
  var walltexture = textureLoader.load(wallImg);
  var grassTexture = textureLoader.load(grassImg);

  var wallMaterial = new THREE.MeshLambertMaterial({
    map: walltexture,
    side: THREE.DoubleSide,
  });
  var grassMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });
  const gateGeometry = new THREE.BoxGeometry(
    wallThickness * 10,
    roomSize * 1,
    roomSize * 3
  );
  const gateMesh = new THREE.Mesh(gateGeometry, gateMaterial);
  gateMesh.position.set(36, 0.1, roomSize / 2 - 2);

  // Gate Code End Here

  const grassFloorGeometry = new THREE.BoxGeometry(
    roomSize * 18,
    wallThickness,
    roomSize * 25
  );
  const grassFloor = new THREE.Mesh(grassFloorGeometry, grassMaterial);
  grassFloor.receiveShadow = true;
  grassFloor.position.y = -roomSize / 2;

  const leftSchoolWallGeometry = new THREE.BoxGeometry(
    wallThickness * 5,
    roomSize,
    roomSize * 24.85
  );
  var frontSchoolWallGeometry = new THREE.BoxGeometry(
    roomSize * 18,
    roomSize,
    wallThickness
  );
  const leftSchoolWall = new THREE.Mesh(leftSchoolWallGeometry, wallMaterial);
  leftSchoolWall.position.x = -roomSize * 9;
  const rightSchoolWall = leftSchoolWall.clone();
  rightSchoolWall.position.x = roomSize * 9;
  const frontSchoolWall = new THREE.Mesh(frontSchoolWallGeometry, wallMaterial);
  frontSchoolWall.position.z = roomSize * 12.45;
  const backSchoolWall = frontSchoolWall.clone();
  backSchoolWall.position.z = -roomSize * 12.45;

  const wallGroup = new THREE.Group();
  wallGroup.add(
    grassFloor,
    leftSchoolWall,
    rightSchoolWall,
    frontSchoolWall,
    backSchoolWall,
    gateMesh
  );
  return wallGroup;
}
