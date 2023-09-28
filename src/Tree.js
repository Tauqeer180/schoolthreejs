import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function TreeScene() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // here is defined the tree
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 9);
    const leavesGeometry = new THREE.SphereGeometry(1, 8, 10);
    // defined the mesbasicmaterial
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // Create your tree components (trunk and leaves) here
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);

    // Set the initial position of your tree
    tree.position.set(-4, -0.5, 0);

    scene.add(tree);

    // Create a raycaster and an array to store objects for intersection
    const raycaster = new THREE.Raycaster();
    const clickObjects = [tree];
    // Add event listener for mouse clicks
    window.addEventListener("click", onClick);
    function onClick(event) {
      // Calculate mouse position in normalized device coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set ray's origin at camera's position
      const rayOrigin = new THREE.Vector3();
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with your tree
      const intersects = raycaster.intersectObjects(clickObjects);

      if (intersects.length > 0) {
        // Tree is clicked
        setShowModal(true); // Show the Bootstrap modal
      }
    }

    // Render loop and camera setup
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Add any animations or updates here

      renderer.render(scene, camera);
    };

    animate();

    // Clean up event listener when unmounting
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tree Clicked</Modal.Title>
        </Modal.Header>
        <Modal.Body>You clicked on the tree!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
