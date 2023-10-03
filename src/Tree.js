import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function TreeScene() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xf6eedc);
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    // // here is defined the tree
    // const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 9);
    // const leavesGeometry = new THREE.SphereGeometry(1, 8, 10);
    // // defined the mesbasicmaterial
    // const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    // const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // // Create your tree components (trunk and leaves) here
    // const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    // const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    // const tree = new THREE.Group();
    // tree.add(trunk);
    // tree.add(leaves);

    // // Set the initial position of your tree
    // tree.position.set(-4, -0.5, 0);

    // scene.add(tree);

    // // Create a raycaster and an array to store objects for intersection
    // const raycaster = new THREE.Raycaster();
    // const clickObjects = [tree];
    // // Add event listener for mouse clicks
    // window.addEventListener("click", onClick);
    // function onClick(event) {
    //   // Calculate mouse position in normalized device coordinates
    //   const mouse = new THREE.Vector2();
    //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //   // Set ray's origin at camera's position
    //   const rayOrigin = new THREE.Vector3();
    //   raycaster.setFromCamera(mouse, camera);

    //   // Check for intersections with your tree
    //   const intersects = raycaster.intersectObjects(clickObjects);

    //   if (intersects.length > 0) {
    //     // Tree is clicked
    //     setShowModal(true); // Show the Bootstrap modal
    //   }
    // }

    // // Render loop and camera setup
    // camera.position.z = 5;

    // const animate = () => {
    //   requestAnimationFrame(animate);

    //   // Add any animations or updates here

    //   renderer.render(scene, camera);
    // };

    // animate();

    // // Clean up event listener when unmounting
    // return () => {
    //   window.removeEventListener("click", onClick);
    // };
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 10; //Setting camera position for projection of object.
    let renderer = new THREE.WebGLRenderer(); //To perform 3D rendering in HTML.
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); //To add final scene to DOM

    let houseGroup = new THREE.Group(); //Creating group
    houseGroup.position.set(-10, 0, -8); // set position of group (x-axis, y-axis, z-axis).
    // To add bricks for home
    let geometry = new THREE.BoxGeometry(10, 5, 3); // To draw cube shape geometry.
    let mesh = new THREE.MeshBasicMaterial({ color: 0x6e638a }); // Add color of cube for appearance of cube.
    let cube = new THREE.Mesh(geometry, mesh); //With mesh adding appearance of cube over it.
    let edgeLine = new THREE.BoxBufferGeometry(10, 5, 3);
    let edges = new THREE.EdgesGeometry(edgeLine); // To have border of cube.
    let line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    ); // Adding border around bricks
    cube.position.set(0, 0, 4);
    line.position.copy(cube.position); //Copy of cube position since border need to be added around cube.
    // Adding line and brick to house group
    houseGroup.add(line);
    houseGroup.add(cube);
    scene.add(houseGroup); //Adding housegroup to scene

    // Note: Need to be added above renderer.render(scene, camera);
    //To add roof for home
    let roof = new THREE.ConeGeometry(6, 5, 0);
    let roofMaterial = new THREE.MeshBasicMaterial({ color: 0xd1d665 });
    let roofMesh = new THREE.Mesh(roof, roofMaterial);
    roofMesh.position.set(-1.3, 5, 1);
    houseGroup.add(roofMesh);

    // Need to be added after code for roof of house.
    //To add door for home
    let door = new THREE.PlaneBufferGeometry(2, 3, 2);
    let doorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let doorMesh = new THREE.Mesh(door, doorMaterial);
    doorMesh.position.set(1, -0.75, 7);
    houseGroup.add(doorMesh);

    //To change background color of scene from black to blue
    scene.background = new THREE.Color(0x030124);
    const animate = () => {
      requestAnimationFrame(animate);

      // Add any animations or updates here

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div>
      {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tree Clicked</Modal.Title>
        </Modal.Header>
        <Modal.Body>You clicked on the tree!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
