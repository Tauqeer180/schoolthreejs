import React, { useEffect } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import fontsFile from "../font/Lato_Regular.json";
const Text = () => {
  const textGroup = new THREE.Group();
  const loader = new FontLoader();
  loader.load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/helvetiker_regular.typeface.json",
    function (font) {
      const geometry = new TextGeometry("School #", {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 20,
        // bevelEnabled: true,
        bevelThickness: 0.03,
        // bevelSize: 0.02,
        // bevelOffset: 0,
        // bevelSegments: 5,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
      const text = new THREE.Mesh(geometry, textMaterial);
      text.receiveShadow = true;
      text.castShadow = true;
      textGroup.add(text);
    }
  );

  return textGroup;
};

export default Text;
