import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
export const RiverCanel = () => {
  // const waterGroup = new THREE.Group();
  let simplex = createNoise3D();
  const width = 71.25;
  const length = 13;
  const segmentsWidth = 3;
  const segmentsLength = 3;
  let v2 = new THREE.Vector2();
  // 1st length value , 2nd width vlaue , 3rd roughness of water  , 4th value of more rough texture
  // let g = new THREE.PlaneGeometry(71.25, 13,
  //   15.25, 35);
  const g = new THREE.PlaneGeometry(
    width,
    length,
    segmentsWidth,
    segmentsLength
  );
  g.rotateX(-Math.PI * 0.5);

  let m = new THREE.MeshLambertMaterial({ color: "CornflowerBlue" });
  let o = new THREE.Mesh(g, m);
  // let clock = new THREE.Clock();
  // let t = clock.getElapsedTime();
  // for (let i = 0; i < g.attributes.position.count; i++) {
  //   v2.fromBufferAttribute(g.attributes.uv, i)
  //     .addScalar(t * 0.01)
  //     .multiplyScalar(20);
  //   let h = simplex(v2.x, v2.y, t * 0.1);
  //   g.attributes.position.setY(i, h);
  // }
  // g.computeVertexNormals();
  // g.attributes.position.needsUpdate = true;

  return o;
};

export const RiverOcan = () => {
  const zigzagPlane = new THREE.Group();
  const pentaShape = new THREE.Shape();

  pentaShape.moveTo(0, -80); // Bottom left

  pentaShape.lineTo(5, -75);

  pentaShape.lineTo(10, -70);
  // upper lines
  pentaShape.lineTo(12, -65);
  pentaShape.lineTo(15, -60);
  pentaShape.lineTo(18, -52);
  pentaShape.lineTo(20, -50);
  pentaShape.lineTo(23, -43);

  pentaShape.lineTo(25, -40);
  pentaShape.lineTo(28, -35);
  pentaShape.lineTo(40, -26);
  pentaShape.lineTo(45, -24.5);
  pentaShape.lineTo(50, -20);
  pentaShape.lineTo(55, -15);
  pentaShape.lineTo(60, -10);
  pentaShape.lineTo(74, -4);
  pentaShape.lineTo(80, 0);
  pentaShape.lineTo(84, 2);
  pentaShape.lineTo(90, 5);
  pentaShape.lineTo(100, 10);
  pentaShape.lineTo(100, 30);

  pentaShape.lineTo(90, 25);
  pentaShape.lineTo(84, 22);
  pentaShape.lineTo(80, 16);
  pentaShape.lineTo(74, 14);
  pentaShape.lineTo(60, 10);
  pentaShape.lineTo(55, 5);
  pentaShape.lineTo(50, 0);
  pentaShape.lineTo(45, -5);
  pentaShape.lineTo(40, -10);
  pentaShape.lineTo(28, -12);
  pentaShape.lineTo(25, -15);
  pentaShape.lineTo(23, -20);

  pentaShape.lineTo(20, -25);
  pentaShape.lineTo(15, -30);
  // pentaShape.lineTo(12, -32);

  pentaShape.lineTo(10, -36);

  pentaShape.lineTo(5, -45);
  pentaShape.lineTo(0, -55);
  pentaShape.lineTo(0, -80);

  const pentaGeometry = new THREE.ExtrudeGeometry(pentaShape, { depth: 0 });
  //   const axesHelper = new THREE.AxesHelper(20);
  //   pentaGeometry.rotateY(-Math.PI / 2);
  const roadMaterial = new THREE.MeshPhongMaterial({
    color: "CornflowerBlue",
    // side: THREE.DoubleSide,
  });
  const roadMesh = new THREE.Mesh(pentaGeometry, roadMaterial);
  roadMesh.rotateX(Math.PI / 2);
  // roadMesh.rotation.set(0, Math.PI, 0);
  roadMesh.castShadow = true;
  roadMesh.receiveShadow = true;
  zigzagPlane.add(roadMesh);

  return zigzagPlane;
};
