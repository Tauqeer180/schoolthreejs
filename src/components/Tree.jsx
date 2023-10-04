import React from "react";
import * as THREE from "three";

export default function Tree() {
  const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 4);
  const leavesGeometry = new THREE.SphereGeometry(1, 8, 10);
  //     const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 5);
  // const leavesGeometry = new THREE.SphereGeometry(1, 9, 15);

  const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
  const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  leaves.position.set(0, 1.1, 0);
  const treeObject = new THREE.Group();
  treeObject.add(trunk, leaves);
  return treeObject;
}
