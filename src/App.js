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
import { RiverCanel, RiverOcan } from "./components/River";
import Text from "./components/Text";
import GrassLand from "./components/GrassLand";
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
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const camera = new THREE.PerspectiveCamera(
      75,
      // window.innerWidth / window.innerHeight,
      size.width / size.height,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true; // Enable shadow mapping in the renderer
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use PCF type shadow mapping
    renderer.setSize(size.width, size.height);

    window.addEventListener("resize", () => {
      size.innerWidth = window.innerWidth;
      size.innerHeight = window.innerHeight;
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    });

    document
      .getElementById("threeJsComponent")
      .appendChild(renderer.domElement);
    /**
     * cubes building
     */
    const spacing = 8;

    const cubeBuilding = Building();

    //Define floor
    const floorBuilding = Floor();
    floorBuilding.position.set(0, -1.95, 5);

    const floorCircles = FloorCircle();
    // floorCircles.receiveShadow = true;
    floorCircles.position.set(0, -1.75, -65);

    const pentgonFloors = PentgonFloor();
    pentgonFloors.position.set(0, -1.95, -70);

    // here is defined  river
    const riverSide = RiverCanel();
    riverSide.position.set(0, -1.25, -40);

    const riverbe = RiverOcan();
    riverbe.position.set(-55, -2, 80);

    // defin the roadPath
    const roadPath = Road();
    roadPath.position.set(10, -1.75, 4);

    /**Rock land  */
    const rock = GrassLand();
    rock.position.x = -110;

    rock.position.y = -2;

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

    // Tree Object
    const treeObject1 = Tree();
    const treeObject2 = Tree();
    const treeObject3 = Tree();
    // For the net floor
    const treeObject4 = Tree();
    const treeObject5 = Tree();

    // cone shape tree
    const coneTree = CloneTree();
    const coneTree1 = CloneTree();
    const coneTree2 = CloneTree();
    const coneTree3 = CloneTree();
    const coneTree4 = CloneTree();
    const coneTree5 = CloneTree();

    const CloneMultiple = CloneMultipleTree();
    const CloneMultiple1 = CloneMultipleTree();
    const CloneMultiple2 = CloneMultipleTree();
    const CloneMultiple3 = CloneMultipleTree();
    const CloneMultiple4 = CloneMultipleTree();
    // CALLING FOR THE NEXT FLOOR
    const CloneMultiple5 = CloneMultipleTree();
    const CloneMultiple6 = CloneMultipleTree();

    const CloneMultiple7 = CloneMultipleTree();

    /**
     * river tree
     */
    const CloneMultiple8 = CloneMultipleTree();

    /**
     * TREE  POSITION
     */
    treeObject1.position.set(-20, 0, -30);
    treeObject2.position.set(12, 0, -10);
    treeObject3.position.set(10, 0, 30);
    treeObject4.position.set(10, 0, -70);
    treeObject5.position.set(0, 0, -55);

    coneTree.position.set(-20, 10, -15);
    coneTree1.position.set(-28, 10, 0);
    coneTree2.position.set(20, 10, 35);
    coneTree3.position.set(-20, 10, 30);
    coneTree4.position.set(15, 10, -25);
    coneTree5.position.set(0, 10, 50);

    CloneMultiple.position.set(10, 0, 35);
    CloneMultiple1.position.set(-15, 0, 35);
    CloneMultiple2.position.set(-22, 0, 10);
    CloneMultiple3.position.set(22, 0, 45);
    CloneMultiple4.position.set(22, 0, -20);
    CloneMultiple5.position.set(0, 0, -75);
    CloneMultiple6.position.set(0, 0, -65);
    CloneMultiple7.position.set(0, 0, 65);

    /**
     * tree in river side
     */

    CloneMultiple8.position.set(0, 0, 86);

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
      coneTree5,

      CloneMultiple,
      CloneMultiple1,
      CloneMultiple2,
      CloneMultiple3,
      CloneMultiple4,
      CloneMultiple5,
      CloneMultiple6,
      CloneMultiple7,
      CloneMultiple8
    );
    // Boundary Wall Plot
    const BoundryWallGroup = BoundryWallPlot();
    BoundryWallGroup.receiveShadow = true;

    /**
     * Text
     */
    const textElem = Text();
    textElem.position.set(-50, 2, -40);
    textElem.rotateY(Math.PI / 3);

    /**Boundry Wall Plot */
    scene.add(new THREE.AmbientLight(0xf1f2f3, 0.7));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
    directionalLight.position.set(-250, 250, 200); // Set position of the light
    directionalLight.castShadow = true; // Enable the light to cast shadows

    // Set up the shadow properties for the light
    directionalLight.shadow.mapSize.width = 4096; // default is 512 //Resoluton of Shadow
    directionalLight.shadow.mapSize.height = 4096; // default is 512 //Resolution
    directionalLight.shadow.camera.near = 0.1; // default is 0.5
    // directionalLight.shadow.camera.far = 1000; // default is 500

    // Size of Light
    directionalLight.shadow.camera.left = -500;
    directionalLight.shadow.camera.right = 500;
    directionalLight.shadow.camera.top = 500;
    directionalLight.shadow.camera.bottom = -500;

    /** Optional: Add a helper to visualize the light's position and direction*/
    // const helper = new THREE.DirectionalLightHelper(directionalLight, 10);
    // scene.add(helper);

    /**
     * Scene
     */
    scene.add(
      house,
      house1,
      house2,
      house3,
      directionalLight,
      cubeBuilding,
      BoundryWallGroup,
      textElem,
      roadPath,
      floorBuilding,
      floorCircles,
      pentgonFloors,
      riverbe,
      rock
    );

    camera.position.set(70, 50, 0);
    scene.position.set(-10, 0, 0);
    camera.lookAt(scene.position);
    const orbit = new OrbitControls(camera, renderer.domElement);

    orbit.maxDistance = 115;
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
