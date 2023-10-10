import * as THREE from "three";
import whiteWall from "../assets/white.jpeg";
import Floor from "./Floor";
const Building = () => {
  const colors = [0xb0d9b1, 0xb0d9b1, 0xb0d9b1];
  const roomSize = 4;
  const wallThickness = 0.1;
  const lShapeGroup = new THREE.Group();

  const createColoredCube = (x, y, z, width, height, depth, materials) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);
    return cube;
  };

  const textureLoader = new THREE.TextureLoader();
  const textureFront = textureLoader.load(whiteWall);
  const textureBack = textureLoader.load(whiteWall);
  const textureLeft = textureLoader.load(whiteWall);
  const textureRight = textureLoader.load(whiteWall);
  const textureTop = textureLoader.load(whiteWall);

  // Create an array of textures
  const textures = [
    textureFront,
    textureBack,
    textureLeft,
    textureRight,
    textureTop,
  ];
  const cubeData = [
    { x: -9.25, y: 0, z: 25, width: 8.75, height: 8, depth: 6 },
    { x: -4, y: -2, z: 25, width: 7, height: 5, depth: 5.4 },
    { x: -9.25, y: -2, z: 22, width: 8, height: 5, depth: 9 },
    // { x: -6, y: -0.75, z: 20.5, width: 4, height: 3, depth: 4.5 },
  ];
  cubeData.forEach((data, index) => {
    const materials = [
      new THREE.MeshPhysicalMaterial({
        map: textures[index],
        side: THREE.DoubleSide,
        transparent: true,
      }),
      new THREE.MeshPhysicalMaterial({
        map: textures[index],
        side: THREE.DoubleSide,
        transparent: true,
      }),
      new THREE.MeshPhysicalMaterial({ color: colors[index] }),
      new THREE.MeshPhysicalMaterial({}),
      new THREE.MeshPhysicalMaterial({
        map: textures[index],
        side: THREE.DoubleSide,
        transparent: true,
      }), // left side
      new THREE.MeshPhysicalMaterial({
        map: textures[index],
        side: THREE.DoubleSide,
        transparent: true,
      }), // right side of image
    ];

    const cube = createColoredCube(
      data.x,
      data.y,
      data.z,
      data.width,
      data.height,
      data.depth,
      materials
    );

    cube.castShadow = true;
    cube.receiveShadow = true;

    lShapeGroup.add(cube);
  });

  // here is defined the boundary of front and back
  const boundaryGeometry1 = new THREE.BoxGeometry(
    wallThickness * 7,
    roomSize / 5,
    roomSize * 1.5
  );
  // here is defined the boundary of left and right
  const boundaryGeometry2 = new THREE.BoxGeometry(
    roomSize * 2.25,
    roomSize / 4,
    wallThickness * 4
  );

  // def of shade
  const shadesGeometry = new THREE.BoxGeometry(
    roomSize,
    roomSize / 10,
    wallThickness * 20
  );

  // def the shades of other building
  const shadeGeometry = new THREE.BoxGeometry(
    roomSize / 2,
    roomSize,
    wallThickness
  );

  // defin the color  line
  const colorGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
  const colorGeometry1 = new THREE.BoxGeometry(
    roomSize * 0.8,
    roomSize * 0.6,
    roomSize * 0.8
  );

  // color lines
  const colorLineGeometry = new THREE.BoxGeometry(
    roomSize * 1.5,
    roomSize / 2.5,
    wallThickness
  );

  const boundaryMaterial = new THREE.MeshPhysicalMaterial({ color: 0xf1f2f4 });

  const boundaryMesh = new THREE.Mesh(boundaryGeometry1, boundaryMaterial);

  boundaryMesh.position.set(-13.5, 4, 25);
  const boundaryMesh2 = boundaryMesh.clone();

  boundaryMesh2.position.set(-4.75, 4, 25);

  const boundaryMaterial1 = new THREE.MeshPhysicalMaterial({ color: 0xf1f2f4 });
  const boundaryMesh1 = new THREE.Mesh(boundaryGeometry2, boundaryMaterial1);

  boundaryMesh1.position.set(-9, 4, 27.9);

  const boundaryMesh3 = boundaryMesh1.clone();
  boundaryMesh3.position.set(-8.95, 4, 22);

  // defin the Material of shades
  const shadesMaterial = new THREE.MeshPhysicalMaterial({ color: 0xe3e6e0 });
  // F2F3F3
  const shadesMesh = new THREE.Mesh(shadesGeometry, shadesMaterial);
  shadesMesh.position.set(-2.65, -1, 28);

  // defin the Material of shades 2nd building
  const shadeMaterial = new THREE.MeshPhysicalMaterial({ color: 0x23478b });
  // F2F3F3
  const shadeMesh = new THREE.Mesh(shadeGeometry, shadeMaterial);
  shadeMesh.position.set(-14, -1, 20);

  shadeMesh.rotation.x = -Math.PI / 2;

  // defin the color
  // defin the Material of shades
  const colorMaterial = new THREE.MeshPhysicalMaterial({ color: 0xe3e6e0 });
  const colorMaterial1 = new THREE.MeshPhysicalMaterial({ color: 0x9fced8 });
  // F2F3F3
  const colorMesh = new THREE.Mesh(colorGeometry, colorMaterial);
  colorMesh.position.set(-12, -3, 26.3);
  const colorMesh1 = new THREE.Mesh(colorGeometry1, colorMaterial1);
  colorMesh.castShadow = true;
  colorMesh.receiveShadow = true;
  colorMesh1.position.set(-12.45, -2.7, 26.75);
  colorMesh1.castShadow = true;
  colorMesh1.receiveShadow = true;
  // defin the Material of shades
  const colorLineMaterial = new THREE.MeshPhysicalMaterial({ color: 0x9fced8 });
  // F2F3F3
  const colorLineMesh = new THREE.Mesh(colorLineGeometry, colorLineMaterial);
  colorLineMesh.position.set(-8, 1, 28);

  colorLineMesh.castShadow = true;
  colorLineMesh.receiveShadow = true;
  const colorLineMesh1 = colorLineMesh.clone();
  colorLineMesh1.position.set(-13.73, 2, 25);
  colorLineMesh1.rotation.y = -Math.PI / 2;
  colorLineMesh1.castShadow = true;
  colorLineMesh1.receiveShadow = true;
  // const axesHelper = new THREE.AxesHelper(20);

  

  boundaryMesh.castShadow = true;
  boundaryMesh.receiveShadow = true;

  boundaryMesh2.castShadow = true;
  boundaryMesh2.receiveShadow = true;

  boundaryMesh1.castShadow = true;
  boundaryMesh1.receiveShadow = true;

  boundaryMesh3.castShadow = true;
  boundaryMesh3.receiveShadow = true;

  shadeMesh.castShadow = true;
  shadeMesh.receiveShadow = true;
  shadesMesh.castShadow = true;
  shadesMesh.receiveShadow = true;

  colorMesh.castShadow = true;
  colorMesh.receiveShadow = true;

  colorMesh1.castShadow = true;
  colorMesh1.receiveShadow = true;

  colorLineMesh.castShadow = true;
  colorLineMesh.receiveShadow = true;

  colorLineMesh1.castShadow = true;
  colorLineMesh1.receiveShadow = true;
 //Define floor 
//  const floorBuilding = Floor();
//  scene.add(floorBuilding);
  lShapeGroup.add(
    // axesHelper,
    boundaryMesh,
    boundaryMesh2,
    boundaryMesh1,
    boundaryMesh3,
    shadesMesh,
    shadeMesh,
    colorMesh,
    colorMesh1,
    colorLineMesh,
    colorLineMesh1,
  );

  lShapeGroup.position.set(-13, 3, 43);
  lShapeGroup.rotateY((-Math.PI / 90) * 95);
  lShapeGroup.castShadow = true;
  lShapeGroup.receiveShadow = true;
  return lShapeGroup;
};

export default Building;
