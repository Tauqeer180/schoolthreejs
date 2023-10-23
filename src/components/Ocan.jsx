import React from "react";
import * as THREE from "three";
const Ocan = () => {
  const riverPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-15, 0, 0),  // Starting point
      new THREE.Vector3(-8, 0, -3),  // Bend point
      new THREE.Vector3(0, 0, -5),   // Curve's lowest point
      new THREE.Vector3(8, 0, -10),   // Bend point
      new THREE.Vector3(35, 0, 0),  // Ending point
  ]);

  // Create a tube geometry to represent the river
  const tubeGeometry = new THREE.TubeGeometry(riverPath, 100, 4, 30, false);
  const riverMaterial = new THREE.MeshLambertMaterial({ color: 0x77aefe });

  // Create a mesh for the river
  const riverMesh = new THREE.Mesh(tubeGeometry, riverMaterial);
  return riverMesh;
};

export default Ocan;
