import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TreeScene() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create your tree components (trunk and leaves) here
    const trunk = new THREE.Mesh(/* trunk geometry and material */);
    const leaves = new THREE.Mesh(/* leaves geometry and material */);
    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);

    // Set the initial position of your tree
    tree.position.set(-10, -0.5, 0);

    scene.add(tree);

    // Create a raycaster and an array to store objects for intersection
    const raycaster = new THREE.Raycaster();
    const clickObjects = [tree];

    // Add event listener for mouse clicks
    window.addEventListener('click', onClick);

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
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tree Clicked</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You clicked on the tree!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
