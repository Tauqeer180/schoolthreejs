"use client";
import React from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
const Global = () => {
  useEffect(() => {
    // Your Three.js code here
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor()
    document.body.appendChild(renderer.domElement);

    // THIS IS rotate PROPERTY
    const orbit = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      color: 0xf6eedc,
      map: loader.load(
        "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg"
      ),
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // using for the of object

    cube.position.x = 5;
    cube.position.set(1, 1, 1);
    // For Hepling the axis
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    // using  for the chnaging the set method
    camera.position.set(-10, 30, 30);
    orbit.update();

    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x186f65,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    const gridHelper = new THREE.GridHelper(20);
    scene.add(gridHelper);
    // THIS IS A SPHERE PROPERTY
    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2e4374,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.position.x = -5;

    //  for setting the image
    // const textureLoader = new THREE.TextureLoader();
    // scene.background = textureLoader.load(leave);

    // scene.add(texture);
    // for using the sphere color chnaging

    // Create a raycaster and a vector to store mouse coordinates
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Add event listener for mouse clicks
    window.addEventListener("click", onMouseClick, false);

    function onMouseClick(event: any) {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set ray's origin at camera's position
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with the tree
      const intersects = raycaster.intersectObject(sphere);

      if (intersects.length > 0) {
        // Tree is clicked
        alert("Tree clicked!");
      }
    }

    const gui = new dat.GUI();

    const options = {
      sphereColor: "#ffea00",
      wirefirame: false,
      speed: 0.01,
    };
    gui.addColor(options, "sphereColor").onChange((e) => {
      sphere.material.color.set(e);
    });
    gui.add(options, "wirefirame").onChange((e) => {
      sphere.material.wireframe = e;
    });
    gui.add(options, "speed", 0, 0.1);
    let step = 0;

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      step += options.speed;
      sphere.position.y = 10 * Math.abs(Math.sin(step));
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener("click", onMouseClick);
    };
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default Global;
