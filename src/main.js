import './style.css'

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 13;

const scene = new THREE.Scene();

let char;
let mixer;

const loader = new GLTFLoader();
loader.load(
  // "/demon_bee_full_texture.glb",
  "/car.glb",
  function (gltf) {
    char = gltf.scene;
    char.position.y = -1;
    // char.rotation.y = 1.2

    mixer = new THREE.AnimationMixer(char);
    mixer.clipAction(gltf.animations[0]).play();
    scene.add(char);

    console.log("char", gltf.animations);
  },
  function (xhr) {},
  function (error) {
    console.error("modelLoaderr",error);
  },
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3d").appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const animate = () => {
    if (char) {
      camera.position.set(0, 2, 16);
    camera.lookAt(char.position);
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if(mixer) mixer.update(0.02);
};

animate();
