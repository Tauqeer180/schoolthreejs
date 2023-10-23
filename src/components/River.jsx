import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
export const RiverCanel = () => {
  // const waterGroup = new THREE.Group();
  let simplex = createNoise3D();
   const width = 100;
  const length = 13;
  const segmentsWidth = 15.25;
  const segmentsLength = 35;
  let v2 = new THREE.Vector2();
  // 1st length value , 2nd width vlaue , 3rd roughness of water  , 4th value of more rough texture
  // const g = new THREE.PlaneGeometry(71.25, 13,
  //   15.25, 35);
  const g = new THREE.PlaneGeometry(
    width,
    length,
    segmentsWidth,
    segmentsLength
  );
  // g.rotateX(-Math.PI * 0.5);
  let m = new THREE.MeshLambertMaterial({
    color: "CornflowerBlue",
    wireframe: false,
  });
  let o = new THREE.Mesh(g, m);
  let clock = new THREE.Clock();
  let t = clock.getElapsedTime();
  for (let i = 0; i < g.attributes.position.count; i++) {
    v2.fromBufferAttribute(g.attributes.uv, i)
      .addScalar(t * 0.01)
      .multiplyScalar(20);
    let h = simplex(v2.x, v2.y, t * 0.18);
    // let h = 0.5 * Math.sin(v2.x * 0.1) * Math.sin(v2.y * 0.1)+ 1;
    g.attributes.position.setY(i, h);
  }
  g.computeVertexNormals();
  g.attributes.position.needsUpdate = true;

  return o;
};



 
// export const RiverOtherside = () => {
//   // const waterGroup = new THREE.Group();
//   // let simplex = createNoise3D();
//   const width = 69.25;
//   const length = 10;
//   const segmentsWidth = 5;
//   const segmentsLength = 5;
//   let v2 = new THREE.Vector2();
//   // 1st length value , 2nd width vlaue , 3rd roughness of water  , 4th value of more rough texture
 
//   const g = new THREE.PlaneGeometry(
//     width,
//     length,
//     segmentsWidth,
//     segmentsLength
//   );
//   g.rotateX(-Math.PI * 0.5);
//   let m = new THREE.MeshLambertMaterial({
//     color: "CornflowerBlue",
//     wireframe: false,
//   });
//   let o = new THREE.Mesh(g, m);
//   let clock = new THREE.Clock();
//   let t = clock.getElapsedTime();
//   for (let i = 0; i < g.attributes.position.count; i++) {
//     v2.fromBufferAttribute(g.attributes.uv, i)
//       .addScalar(t * 0.01)
//       .multiplyScalar(20);
//     // let h = simplex(v2.x, v2.y, t * 0.18);
//     let h = 0.5 * Math.sin(v2.x * 0.1) * Math.sin(v2.y * 0.1)+ 1;
//     g.attributes.position.setY(i, h);

//   }
//   g.computeVertexNormals();
//   g.attributes.position.needsUpdate = true;

//   return o;
// };
