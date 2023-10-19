// import * as THREE from "three";
// const RiverCanel = () => {

//  const riverGrop = new THREE.Group();
//   // Pentagone
//   const pentaShape = new THREE.Shape();
//   // Starting from bottom-left
//   pentaShape.moveTo(0, 0); // Bottom left

//   pentaShape.lineTo(5, 0);

//   pentaShape.lineTo(10, 0);
// // upper lines
// //   pentaShape.lineTo(11, -1);
// //   pentaShape.lineTo(12, -2);
// //   pentaShape.lineTo(13, -3);
// //   pentaShape.lineTo(14, -4);
// //   pentaShape.lineTo(15, -5);

// //   pentaShape.lineTo(20, -5);

// //   pentaShape.lineTo(25.5, -5);
// //   pentaShape.lineTo(25.5, -4);
// //   pentaShape.lineTo(25.5, -3);
// //   pentaShape.lineTo(25.5, -2);
// //   pentaShape.lineTo(25.5, -1);

//   // bottom lines
//   pentaShape.lineTo(25.5, 0);
//   pentaShape.lineTo(24, 5);
//   pentaShape.lineTo(23, 5);
//   pentaShape.lineTo(22, 5);
//   pentaShape.lineTo(21, 5);
//   pentaShape.lineTo(20, 5);
//   pentaShape.lineTo(19, 5);
//   pentaShape.lineTo(15, 5);
//   pentaShape.lineTo(14, 5);
//   pentaShape.lineTo(13, 5);
//   pentaShape.lineTo(12, 5);
//   pentaShape.lineTo(11, 5);
//   pentaShape.lineTo(10, 5);
//   pentaShape.lineTo(5, 5);
//   pentaShape.lineTo(0, 5);

//   const pentaGeometry = new THREE.ExtrudeGeometry(pentaShape, { depth: 0 });
// //   const axesHelper = new THREE.AxesHelper(20);

//   //   pentaGeometry.rotateY(-Math.PI / 2);
//   const riverMaterial = new THREE.MeshPhongMaterial({
//     color: "0xadacac",
//     side: THREE.DoubleSide,
//   });
//   const riverMesh = new THREE.Mesh(pentaGeometry, riverMaterial);
//   riverMesh.rotateX(Math.PI / 2);
//   // roadMesh.rotation.set(0, Math.PI, 0);
//   riverMesh.castShadow = true;
//   riverMesh.receiveShadow = true;
//   riverGrop.add(riverMesh);

//   return riverGrop;
// }

// export default RiverCanel

// import * as THREE from "three";
// import { Water } from "three/examples/jsm/objects/Water.js";
// import waternormals from "../assets/waternormals.jpg";

// const RiverCanel = () => {
//   const waterGeometry = new THREE.BufferGeometry(100, 100, 100, 100);
//   const sun = new THREE.Vector3();
//   const textureLoader = new THREE.TextureLoader();

//   const watertexture = textureLoader.load(
//     waternormals,
//     (texture) => (texture.wrapS = texture.wrapT = THREE.RepeatWrapping)
//   );
//    const waterMaterial = new THREE.MeshLambertMaterial({ map: watertexture });
//   watertexture.repeat.set(4 * 2, 4 * 2.7);

//   const pentaShape = new THREE.Shape();
//   pentaShape.moveTo(0, 0); // Bottom left
//   // left side
//   pentaShape.lineTo(55, 0);
//   pentaShape.lineTo(56, 10);
//   pentaShape.lineTo(57, 15);
//   pentaShape.lineTo(58, 20);
//   pentaShape.lineTo(59, 25);
//   // one side right side
//   pentaShape.lineTo(55, 10);
//    pentaShape.lineTo(0, 10);

//   const pentaGeometry = new THREE.ExtrudeGeometry(pentaShape, { depth: 0 });
//   // const pentaGeometry =  new THREE.BufferGeometry(100, 100, 100, 100);

//   const waterobj = new Water(
//     pentaGeometry,
//     {
//       scale: 0.1,
//       textureWidth: 512,
//       textureHeight: 512,
//       flowSpeed: 0.04,
//       reflectivity: 0.35,
//       waterNormals: new THREE.TextureLoader().load(
//             "../assets/waternormals.jpg",
//             function (texture) {
//               texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//               texture.repeat.set(5, 5);
//             }
//           ),
//       color: 'blue',
//     }
//   );

//   waterobj.rotation.x = -Math.PI / 2;

//   return waterobj;
// };

// export default RiverCanel;

import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { createNoise3D } from "https://cdn.skypack.dev/simplex-noise";
const RiverCanel = () => {
  // const waterGroup = new THREE.Group();
  let simplex = createNoise3D();
  const width = 10;
  const depth = 50;
  const segmentsW = 10;
  const segmentsD = 50;
  let riverBedGeometry = new THREE.PlaneGeometry(200, 200, 100, 100);
  // const riverBedGeometry = new THREE.PlaneBufferGeometry(
  //   width,
  //   depth,
  //   segmentsW,
  //   segmentsD
  // );
  // const riverBedMaterial = new THREE.MeshLambertMaterial({color: "aqua", wireframe: false });

  // const vertices = riverBedGeometry.attributes.position.array;
  let v3 = new THREE.Vector3();
let v2 = new THREE.Vector2();
// 1st length value , 2nd width vlaue , 3rd roughness of water  , 4th value of more rough texture
  let g = new THREE.PlaneGeometry(71.25, 13, 
    15.25, 35);
  g.rotateX(-Math.PI * 0.5);
  let m = new THREE.MeshLambertMaterial({ color: "aqua", wireframe: false });
  let o = new THREE.Mesh(g, m);
  let clock = new THREE.Clock();
  let t = clock.getElapsedTime();
  for (let i = 0; i < g.attributes.position.count; i++) {
    v2.fromBufferAttribute(g.attributes.uv, i)
      .addScalar(t * 0.01)
      .multiplyScalar(20);
    let h = simplex(v2.x, v2.y, t * 0.1);
    g.attributes.position.setY(i, h);
  }
  g.computeVertexNormals();
  g.attributes.position.needsUpdate = true;
  // for (let i = 0; i <= segmentsD; i++) {
  //   for (let j = 0; j <= segmentsW; j++) {
  //     const index = 3 * (i * (segmentsW + 1) + j);
  //     vertices[index + 2] = Math.sin((j / segmentsW) * Math.PI) * 0.5; // Change 0.5 to adjust amplitude
  //   }
  // }

  // const riverBed = new THREE.Mesh(riverBedGeometry, riverBedMaterial);
  // riverBed.rotation.x = -Math.PI / 2;

  // const waterGeometry = new THREE.PlaneBufferGeometry(width, depth);
  // const water = new Water(waterGeometry, {
  //   textureWidth: 512,
  //   textureHeight: 512,
  //   waterNormals: new THREE.TextureLoader().load(
  //     "path_to_water_normals.jpg",
  //     function (texture) {
  //       texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  //     }
  //   ),
  //   alpha: 1.0,
  //   sunDirection: new THREE.Vector3(),
  //   sunColor: 0xffffff,
  //   waterColor: 0x001e0f,
  //   distortionScale: 3.7,
  //   // fog: scene.fog !== undefined,
  // });
  // water.rotation.x = -Math.PI / 2;
  // waterGroup(water, riverBed);

  // scene.add(riverBed);
  return o;
};

export default RiverCanel;
