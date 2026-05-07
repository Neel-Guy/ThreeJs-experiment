import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);


let char;
let mixer;

let speed = 0;
const acceleration = 0.002;
const maxSpeed = 0.15;
const friction = 0.98;
const turnSpeed = 0.03;

camera.position.z = 13;

const scene = new THREE.Scene();


let carPivot = new THREE.Group();
scene.add(carPivot);

const loader = new GLTFLoader();
loader.load(
  "/car.glb",
  function (gltf) {
    char = gltf.scene;
    char.position.y = -1;

    mixer = new THREE.AnimationMixer(char);
    mixer.clipAction(gltf.animations[0]).play();
    carPivot.add(char);
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


const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (keys.hasOwnProperty(key)) {
    keys[key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();

  if (keys.hasOwnProperty(key)) {
    keys[key] = false;
  }
});


const animate = () => {
  requestAnimationFrame(animate);

  if (keys.w) speed += acceleration;
  if (keys.s) speed -= acceleration;

  speed = Math.max(-maxSpeed / 2, Math.min(maxSpeed, speed));

  speed *= friction;

  carPivot.translateZ(speed);

  if (speed !== 0) {
    const direction = speed > 0 ? 1 : -1;

    if (keys.a) {
      carPivot.rotation.y += turnSpeed * direction;
    }

    if (keys.d) {
      carPivot.rotation.y -= turnSpeed * direction;
    }
  }

  if (char) {
    camera.lookAt(carPivot.position);
  }

  if (mixer) mixer.update(0.02);

  renderer.render(scene, camera);
};

animate();
