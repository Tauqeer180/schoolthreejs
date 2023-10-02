import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default function ZoomAndModalScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf6eedc);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  const raycaster = new THREE.Raycaster();
  const house = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const initialCameraPosition = new THREE.Vector3(0, 2, 5);
  const zoomedCameraPosition = new THREE.Vector3(0, 2, 3);
  const initialHousePosition = new THREE.Vector3(0, 0.5, 0);
  const zoomedHousePosition = new THREE.Vector3(-0.8, 0.5, -0.8);

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const gridHelper = new THREE.GridHelper(20);
    scene.add(gridHelper);

    const houseGeometry = new THREE.BoxGeometry(1, 1, 1);
    const houseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const houseMesh = new THREE.Mesh(houseGeometry, houseMaterial);
    houseMesh.position.copy(initialHousePosition);
    house.current = houseMesh;
    scene.add(houseMesh);

    camera.position.copy(initialCameraPosition);
    // THIS IS rotate PROPERTY
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();
    window.addEventListener("click", onClick);

    animate();

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  function onClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // const rayOrigin = new THREE.Vector3();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(house.current);

    if (intersects.length > 0) {
      if (!isZoomed) {
        setIsZoomed(true);
        animateHouse(zoomedHousePosition);
        animateCamera(zoomedCameraPosition);
      } else {
        setIsZoomed(false);
        animateHouse(initialHousePosition);
        animateCamera(initialCameraPosition);
      }
    }
  }

  function animateHouse(targetPosition) {
    if (house.current) {
      const startPosition = house.current.position.clone();
      const duration = 500;

      function updatePosition() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        if (elapsed < duration) {
          const progress = elapsed / duration;
          const newPosition = new THREE.Vector3().lerpVectors(
            startPosition,
            targetPosition,
            progress
          );
          house.current.position.copy(newPosition);
          requestAnimationFrame(updatePosition);
        } else {
          house.current.position.copy(targetPosition);
        }
      }
      const startTime = Date.now();
      updatePosition();
    }
  }
  function animateCamera(targetPosition) {
    const startPosition = camera.position.clone();
    const duration = 500;
    function updatePosition() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const newPosition = new THREE.Vector3().lerpVectors(
          startPosition,
          targetPosition,
          progress
        );
        camera.position.copy(newPosition);
        requestAnimationFrame(updatePosition);
      } else {
        camera.position.copy(targetPosition);
      }
    }
    const startTime = Date.now();
    updatePosition();
  }
  function handleModalClose() {
    setIsZoomed(false);
    animateHouse(initialHousePosition);
    animateCamera(initialCameraPosition);
  }
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  return (
    <div>
      <Modal
        show={isZoomed}
        onHide={handleModalClose}
        dialogClassName="modal-50w"
        style={{
          position: "absolute",
          top: `150px`,
          left: `283px`,
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>House Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the house you clicked on.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// export default function ZoomAndModalScene() {
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xf6eedc);
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   const renderer = new THREE.WebGLRenderer();
//   const raycaster = new THREE.Raycaster();
//   const house = useRef();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const initialCameraPosition = new THREE.Vector3(0, 2, 5);
//   const zoomedCameraPosition = new THREE.Vector3(0, 2, 3);
//   const initialHousePosition = new THREE.Vector3(0, 0.5, 0);
//   const zoomedHousePosition = new THREE.Vector3(-0.8, 0.5, -0.8);

//   useEffect(() => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const gridHelper = new THREE.GridHelper(20, 20);
//     scene.add(gridHelper);

//     const houseGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const houseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const houseMesh = new THREE.Mesh(houseGeometry, houseMaterial);
//     houseMesh.position.copy(initialHousePosition);
//     house.current = houseMesh;
//     scene.add(houseMesh);

//     camera.position.copy(initialCameraPosition);

//     const orbit = new OrbitControls(camera, renderer.domElement);
//     orbit.update();

//     window.addEventListener("click", onClick);

//     animate();

//     return () => {
//       window.removeEventListener("click", onClick);
//     };
//   }, []);

//   function onClick(event) {
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     const rayOrigin = new THREE.Vector3();
//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObject(house.current);

//     if (intersects.length > 0) {
//       if (!isZoomed) {
//         setIsZoomed(true);
//         animateHouse(zoomedHousePosition);
//         animateCamera(zoomedCameraPosition);
//       } else {
//         setIsModalOpen(true);
//       }
//     }
//   }

//   function handleModalClose() {
//     setIsZoomed(false);
//     setIsModalOpen(false);
//     animateHouse(initialHousePosition);
//     animateCamera(initialCameraPosition);
//   }

//   function animateHouse(targetPosition) {
//     if (house.current) {
//       const startPosition = house.current.position.clone();
//       const duration = 500;

//       function updatePosition() {
//         const currentTime = Date.now();
//         const elapsed = currentTime - startTime;

//         if (elapsed < duration) {
//           const progress = elapsed / duration;
//           const newPosition = new THREE.Vector3().lerpVectors(
//             startPosition,
//             targetPosition,
//             progress
//           );
//           house.current.position.copy(newPosition);
//           requestAnimationFrame(updatePosition);
//         } else {
//           house.current.position.copy(targetPosition);
//         }
//       }

//       const startTime = Date.now();
//       updatePosition();
//     }
//   }

//   function animateCamera(targetPosition) {
//     const startPosition = camera.position.clone();
//     const duration = 500;

//     function updatePosition() {
//       const currentTime = Date.now();
//       const elapsed = currentTime - startTime;

//       if (elapsed < duration) {
//         const progress = elapsed / duration;
//         const newPosition = new THREE.Vector3().lerpVectors(
//           startPosition,
//           targetPosition,
//           progress
//         );
//         camera.position.copy(newPosition);
//         requestAnimationFrame(updatePosition);
//       } else {
//         camera.position.copy(targetPosition);
//       }
//     }

//     const startTime = Date.now();
//     updatePosition();
//   }

//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }

//   return (
//     <div>
//       <Modal show={isModalOpen} onHide={handleModalClose} dialogClassName="modal-50w">
//         <Modal.Header closeButton>
//           <Modal.Title>House Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>This is the house you clicked on.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// export default function ZoomAndModalScene() {
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xf6eedc);
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   const renderer = new THREE.WebGLRenderer();
//   const raycaster = new THREE.Raycaster();
//   const house = useRef(null);
//   const modalRef = useRef(null);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ x: 0, y: -20 });

//   const initialCameraPosition = new THREE.Vector3(0, 2, 5);
//   const zoomedCameraPosition = new THREE.Vector3(0, 2, 3);
//   const initialHousePosition = new THREE.Vector3(0, 0.5, 0);
//   const zoomedHousePosition = new THREE.Vector3(-0.8, 0.5, -0.8);

//   useEffect(() => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const gridHelper = new THREE.GridHelper(20);
//     scene.add(gridHelper);

//     const houseGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const houseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const houseMesh = new THREE.Mesh(houseGeometry, houseMaterial);
//     houseMesh.position.copy(initialHousePosition);
//     house.current = houseMesh;
//     scene.add(houseMesh);

//     camera.position.copy(initialCameraPosition);
//     const orbit = new OrbitControls(camera, renderer.domElement);
//     orbit.update();
//     window.addEventListener("click", onClick);

//     animate();

//     return () => {
//       window.removeEventListener("click", onClick);
//     };
//   }, []);

//   function onClick(event) {
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObject(house.current);

//     if (intersects.length > 0) {
//       if (!isZoomed) {
//         setIsZoomed(true);
//         animateHouse(zoomedHousePosition);
//         animateCamera(zoomedCameraPosition);
//         // Calculate modal position
//         const modalX = event.clientX + 20; // Adjust as needed
//         const modalY = event.clientY; // Adjust as needed
//         setModalPosition({ x: modalX, y: modalY });
//       } else {
//         setIsZoomed(false);
//         animateHouse(initialHousePosition);
//         animateCamera(initialCameraPosition);
//       }
//     }
//   }

//   function animateHouse(targetPosition) {
//     if (house.current) {
//       const startPosition = house.current.position.clone();
//       const duration = 500;

//       function updatePosition() {
//         const currentTime = Date.now();
//         const elapsed = currentTime - startTime;

//         if (elapsed < duration) {
//           const progress = elapsed / duration;
//           const newPosition = new THREE.Vector3().lerpVectors(
//             startPosition,
//             targetPosition,
//             progress
//           );
//           house.current.position.copy(newPosition);
//           requestAnimationFrame(updatePosition);
//         } else {
//           house.current.position.copy(targetPosition);
//         }
//       }

//       const startTime = Date.now();
//       updatePosition();
//     }
//   }

//   function animateCamera(targetPosition) {
//     const startPosition = camera.position.clone();
//     const duration = 500;

//     function updatePosition() {
//       const currentTime = Date.now();
//       const elapsed = currentTime - startTime;

//       if (elapsed < duration) {
//         const progress = elapsed / duration;
//         const newPosition = new THREE.Vector3().lerpVectors(
//           startPosition,
//           targetPosition,
//           progress
//         );
//         camera.position.copy(newPosition);
//         requestAnimationFrame(updatePosition);
//       } else {
//         camera.position.copy(targetPosition);
//       }
//     }

//     const startTime = Date.now();
//     updatePosition();
//   }

//   function handleModalClose() {
//     setIsZoomed(false);
//     animateHouse(initialHousePosition);
//     animateCamera(initialCameraPosition);
//   }

//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }

//   return (
//     <div>
//       <Modal
//         show={isZoomed}
//         onHide={handleModalClose}
//         dialogClassName="modal-50w"
//         style={{
//           position: "absolute",
//           top: `${modalPosition.y}px`,
//           left: `${modalPosition.x}px`,
//         }}
//         ref={modalRef}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>House Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>This is the house you clicked on.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
