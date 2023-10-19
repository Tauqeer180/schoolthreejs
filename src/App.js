import "./App.css";
import { useEffect, useState } from "react";
import "./custom.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BoundryWallPlot from "./components/BoundryWallPlot";
import Building from "./components/Building";
import { Floor, FloorCircle, PentgonFloor } from "./components/Floor";
import { CloneMultipleTree, CloneTree, Tree } from "./components/Tree";
import CreateHouse from "./components/MutilpleBuilding";
import Road from "./components/Road";
import RiverCanel from "./components/River";
import skyImg from "./assets/download_1.jpeg";
import { River } from "./components/River_T";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const buildingInfo = [
    {
      id: 1,
      name: "Arts Department",
      content: "Content for Arts Department",
    },
    {
      id: 2,
      name: "Science Department",
      content: "Content for Science Department",
    },
    {
      id: 3,
      name: "Auditorium",
      content: "Content for Auditorium",
    },
    {
      id: 4,
      name: "Central Library",
      content: "Content for Central Library",
    },
    {
      id: 5,
      name: "Computer Lab",
      content: "Content for Computer Lab",
    },
  ];
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6eedc);
    // scene.background = new THREE.TextureLoader().load(skyImg);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true; // Enable shadow mapping in the renderer
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use PCF type shadow mapping
    renderer.setSize(window.innerWidth, window.innerHeight);

    document
      .getElementById("threeJsComponent")
      .appendChild(renderer.domElement);
    // value of room and thickness

    const spacing = 8;
    // cubes building
    const cubeBuilding = Building();
    scene.add(cubeBuilding);

    //Define floor
    const floorBuilding = Floor();
    floorBuilding.position.set(0, -1.95, 5);

    const floorCircles = FloorCircle();
    floorCircles.position.set(0, -1.75, -65);

    const pentgonFloors = PentgonFloor();
    pentgonFloors.position.set(0, -1.95, -70);

    // here is defined  river
    const riverSide = RiverCanel();
    riverSide.position.set(-1,-1.25, -40);

    scene.add(floorBuilding, floorCircles, pentgonFloors, riverSide);

    // adding the sky code
    // const sphereMaterial = new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load(skyImg),
    //   fog: false,
    // });
    // const sphereGeometry = new THREE.SphereGeometry(30000);
    // sphereGeometry.scale(-1, 1, 1);
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.rotateY(Math.PI / 4);
    // scene.add(sphere);
    // defin the roadPath
    const roadPath = Road();
    roadPath.position.set(10, -1.75, 4);

    scene.add(roadPath);
    function onDocumentMouseWheel(event) {
      camera.position.z = 0; // Adjust the factor (0.1) as needed for the zoom speed
      renderer.render(scene, camera);
    }
    document.addEventListener("wheel", onDocumentMouseWheel);

    const house = CreateHouse(
      -4,
      -spacing,
      1,
      setSelectedBuilding,
      selectedBuilding,
      setShowModal,
      camera,
      scene,
      renderer
    );
    const house1 = CreateHouse(
      -4,
      spacing,
      2,
      setSelectedBuilding,
      selectedBuilding,
      setShowModal,
      camera,
      scene,
      renderer
    ); //row 1 house
    const house2 = CreateHouse(
      -4,
      0,
      3,
      setSelectedBuilding,
      selectedBuilding,
      setShowModal,
      camera,
      scene,
      renderer
    ); //row 3 house
    // CreateHouse(2, 17, 4);
    const house3 = CreateHouse(
      2,
      -20,
      5,
      setSelectedBuilding,
      selectedBuilding,
      setShowModal,
      camera,
      scene,
      renderer
    );
    scene.add(house, house1, house2, house3);
    // Tree Object
    const treeObject1 = Tree();
    const treeObject2 = Tree();
    const treeObject3 = Tree();
    // FOR THE NEXT FLOOR
    const treeObject4 = Tree();
    const treeObject5 = Tree();

    // cone shape tree
    const coneTree = CloneTree();
    const coneTree1 = CloneTree();
    const coneTree2 = CloneTree();
    const coneTree3 = CloneTree();
    const coneTree4 = CloneTree();
    // const coneTree5 = CloneTree();

    const CloneMultiple = CloneMultipleTree();
    const CloneMultiple1 = CloneMultipleTree();
    const CloneMultiple2 = CloneMultipleTree();
    const CloneMultiple3 = CloneMultipleTree();
    const CloneMultiple4 = CloneMultipleTree();
    // CALLING FOR THE NEXT FLOOR
    const CloneMultiple5 = CloneMultipleTree();
    const CloneMultiple6 = CloneMultipleTree();

    treeObject1.position.set(-20, 0, -30);
    treeObject2.position.set(12, 0, -10);
    treeObject3.position.set(10, 0, 30);
    treeObject4.position.set(10, 0, -70);
    treeObject5.position.set(0, 0, -55);

    coneTree.position.set(-20, 8, -15);
    coneTree1.position.set(-28, 8, 0);
    coneTree2.position.set(20, 8, 35);
    coneTree3.position.set(-20, 8, 30);
    coneTree4.position.set(15, 8, -25);
    // coneTree5.position.set(-9, 6, -65);

    CloneMultiple.position.set(10, 0, 35);
    CloneMultiple1.position.set(-15, 0, 35);
    CloneMultiple2.position.set(-22, 0, 10);
    CloneMultiple3.position.set(22, 0, 45);
    CloneMultiple4.position.set(22, 0, -20);
    CloneMultiple5.position.set(0, 0, -75);
    CloneMultiple6.position.set(0, 0, -65);

    scene.add(
      treeObject1,
      treeObject2,
      treeObject3,
      treeObject4,
      treeObject5,
      coneTree,
      coneTree1,
      coneTree2,
      coneTree3,
      coneTree4,

      CloneMultiple,
      CloneMultiple1,
      CloneMultiple2,
      CloneMultiple3,
      CloneMultiple4,
      CloneMultiple5,
      CloneMultiple6
    );
    // Boundary Wall Plot
    const BoundryWallGroup = BoundryWallPlot();
    BoundryWallGroup.receiveShadow = true;
    scene.add(BoundryWallGroup);

    // Boundry Wall Plot
    scene.add(new THREE.AmbientLight(0xf1f2f3, 0.7));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
    directionalLight.position.set(-22, 30, 30); // Set position of the light
    directionalLight.castShadow = true; // Enable the light to cast shadows
    scene.add(directionalLight);

    // Set up the shadow properties for the light
    directionalLight.shadow.mapSize.width = 1024; // default is 512
    directionalLight.shadow.mapSize.height = 1024; // default is 512
    directionalLight.shadow.camera.near = 0.1; // default is 0.5
    // directionalLight.shadow.camera.far = 50; // default is 500
    directionalLight.shadow.camera.left = -45;
    directionalLight.shadow.camera.right = 45;
    directionalLight.shadow.camera.top = 45;
    directionalLight.shadow.camera.bottom = -45;

    // Optional: Add a helper to visualize the light's position and direction
    // const  helper = new THREE.DirectionalLightHelper(directionalLight, 10);
    //   scene.add(helper);

    camera.position.set(20, 20, 0);
    scene.position.set(-10, 0, 0);
    camera.lookAt(scene.position);
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.maxDistance = 100;
    orbit.minDistance = 10;
    orbit.maxPolarAngle = Math.PI / 2;
    orbit.update();
    // const axesHelper = new THREE.AxesHelper(20);
    // scene.add(axesHelper);
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  const closeModal = () => {
    setShowModal(false);
    setSelectedBuilding(null);
  };
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-lg-12 bg-info p-0">
          <div className="card  rounded-0 ">
            <div className="card-body vh-100 p-0  ">
              <div id="threeJsComponent"></div>

              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  {/*   */}
                  <Modal.Title>
                    {selectedBuilding !== null &&
                      buildingInfo?.find((b) => b?.id === selectedBuilding)
                        .name}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-content">
                  {selectedBuilding !== null &&
                    buildingInfo?.find((b) => b.id === selectedBuilding)
                      .content}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
