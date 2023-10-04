import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Building = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set the initial camera position
    camera.position.set(20, 20, 0);
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    const colors = [
      0xFFFFFF, // Red
      0xFFFFFF, // Green
      0xb0d9b1, // Blue
      0xFFFFFF, // Yellow
      0xFFFFFF, // Magenta
      0xFFFFFF  // Cyan
    ];
    const cubes = [
      createColoredCube(-2, 2, 0, 7, 8, 7, colors),
      createColoredCube(2, 0, 0, 8, 4, 6, colors),
      createColoredCube(-2, 0.65, -4.5, 7, 3, 7, colors),
      createColoredCube(-0.4, -0.75, -4.5, 10, 3, 6, colors),
    ];

    // Add cubes to the scene
    cubes.forEach(cube => scene.add(cube));
    // const verticalCube = createColoredCube(-2, 2, 0, 7, 8, 5, 0x79ac78);
    // const horizontalCube = createColoredCube(2, 0, 0, 8, 4, 5, 0xb0d9b1);
    // const verticalCube1 = createColoredCube(-2, 0.65, -4.5, 7, 3, 4, 0x183d3d);
    // const horizontalCube1 = createColoredCube(
    //   -0.4,
    //   -0.75,
    //   -4.5,
    //   10,
    //   3,
    //   4,
    //   0x93b1a6
    // );

   
    // scene.add(verticalCube);
    // scene.add(horizontalCube);

    // scene.add(verticalCube1);
    // scene.add(horizontalCube1);
    // Set up the renderer

    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const materials = [
    //   new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
    //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
    //   new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
    //   new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
    //   new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
    //   new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
    // ];

    // const cube = new THREE.Mesh(geometry, materials);
    // scene.add(cube);

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer to the DOM
    sceneRef.current.appendChild(renderer.domElement);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up when unmounting
    return () => {
      window.removeEventListener("resize", handleResize);
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // Function to create a cube
  // const createColoredCube = (x, y, z, width, height, depth, color) => {
  //   const geometry = new THREE.BoxGeometry(width, height, depth);
  //   const material = new THREE.MeshBasicMaterial({ color });
  //   const cube = new THREE.Mesh(geometry, material);
  //   cube.position.set(x, y, z);
  //   return cube;
  // };
  const createColoredCube = (x, y, z, width, height, depth, colors) => {
    const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);
    return cube;
  };
  return <div ref={sceneRef} />;
};

export default Building;
