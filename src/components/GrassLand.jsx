import * as THREE from "three";
import grassImg from "../assets/grass.webp";
function GrassLand() {
  const rockLand = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();
  const grassTexture = textureLoader.load(grassImg);
  const width = 200;
  const depth = 400;
  const widthSegments = 50;
  const depthSegments = 50;

  //   const numSegments = 5000; // We have one less vertex than pixel

  const geometry = new THREE.PlaneGeometry(
    width,
    depth,
    widthSegments,
    depthSegments
  );
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(4 * 2, 4 * 2.7);

  const material = new THREE.MeshLambertMaterial({
  map: grassTexture ,
    wireframe: false,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);

  //   plane = new THREE.Mesh(geometry, material);
  //   plane.name = "Terrain";
  // set height of vertices
  plane.receiveShadow = true;
  plane.position.x = -4 * 2;
  plane.position.y = -4 / 2;
  geometry.vertices = [];

  for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
    geometry.attributes.position.array[i + 2] = Math.random() * 2; // Random heights between -50 and 50
  }
  geometry.attributes.position.needsUpdate = true; // Inform Three.js that the vertices have changed
  //   for (let i = 0; i < widthSegments; i++) {
  //     geometry.vertices.push({
  //       x: Math.random() * 10 - 5,
  //       y: Math.random() * 10 - 5,
  //       z: Math.random() * 100 - 50,
  //     });
  //   }

  // for (let i = 0; i < geometry.vertices.length; i++) {
  //     geometry.vertices[i].z = Math.random() * 100 - 50; // Random heights between -50 and 50
  //   }

  //   geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  const axesHelper = new THREE.AxesHelper(20);

  plane.castShadow = true;
  plane.receiveShadow = true;
  plane.rotateX(-Math.PI / 2);
  rockLand.add(plane, axesHelper);

  return rockLand;
}
export default GrassLand;
