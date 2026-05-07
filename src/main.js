import "./style.css";

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
  "/car.glb",
  function (gltf) {
    char = gltf.scene;
    char.position.y = -1;

    mixer = new THREE.AnimationMixer(char);
    mixer.clipAction(gltf.animations[0]).play();
    scene.add(char);
  },
  function (xhr) {},
  function (error) {
    console.error("modelLoaderr", error);
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

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const targetPosition = new THREE.Vector3();

const animate = () => {
  if (char) {
    targetPosition.set(
      char.position.x,
      char.position.y + 2,
      char.position.z + 16,
    );

    camera.position.lerp(targetPosition, 0.05);
    camera.lookAt(char.position);
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (mixer) mixer.update(0.02);
};

animate();
