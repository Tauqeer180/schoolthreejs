import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
export const RiverCanel = () => {
  // const waterGroup = new THREE.Group();
  let simplex = createNoise3D();
  const width = 71.25;
  const length = 13;
  const segmentsWidth =3;
  const segmentsLength =3;
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

  return o;
};

