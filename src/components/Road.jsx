import * as THREE from "three";

const Road = () => {
  const roadGrop = new THREE.Group();
  // Pentagone
  const pentaShape = new THREE.Shape();
  // Starting from bottom-left
  pentaShape.moveTo(0, 0); // Bottom left

  pentaShape.lineTo(5, 0);

  pentaShape.lineTo(10, 0);
// upper lines 
  pentaShape.lineTo(11, -1);
  pentaShape.lineTo(12, -2);
  pentaShape.lineTo(13, -3);
  pentaShape.lineTo(14, -4);
  pentaShape.lineTo(15, -5);

  pentaShape.lineTo(20, -5);

  pentaShape.lineTo(25.5, -5);
  pentaShape.lineTo(25.5, -4);
  pentaShape.lineTo(25.5, -3);
  pentaShape.lineTo(25.5, -2);
  pentaShape.lineTo(25.5, -1);
  
  // bottom lines 
  pentaShape.lineTo(25.5, 0);
  pentaShape.lineTo(20, 0);
  pentaShape.lineTo(15, 0);
  pentaShape.lineTo(14, 1);
  pentaShape.lineTo(13, 2);
  pentaShape.lineTo(12, 3);
  pentaShape.lineTo(11, 4);
  pentaShape.lineTo(10, 5);

  pentaShape.lineTo(5, 5);
  pentaShape.lineTo(0, 5);


const pentaGeometry = new THREE.ExtrudeGeometry(pentaShape, { depth: 0 });
//   const axesHelper = new THREE.AxesHelper(20);
  //   pentaGeometry.rotateY(-Math.PI / 2);
  const roadMaterial = new THREE.MeshPhongMaterial({
    color: "0xadacac",
    side: THREE.DoubleSide,
  });
  const roadMesh = new THREE.Mesh(pentaGeometry, roadMaterial);
  roadMesh.rotateX(Math.PI / 2);
  // roadMesh.rotation.set(0, Math.PI, 0);
  roadMesh.castShadow = true;
  roadMesh.receiveShadow = true;
  roadGrop.add(roadMesh);

  return roadGrop;
};

export default Road;
