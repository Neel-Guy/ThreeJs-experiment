import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const cameraOffset = new THREE.Vector3(0, 4, -10);
const tempVecGoalPos = new THREE.Vector3();

let char;
let mixer;

let speed = 0;
const acceleration = 20.0;
const maxSpeed = 30.0;
const minSpeed = 0.1;
const turnSpeed = 2.5;
const friction = 0.96;

const scene = new THREE.Scene();

const clock = new THREE.Timer();

let charPivot = new THREE.Group();
scene.add(charPivot);

let current_animation;

const loader = new GLTFLoader();
loader.load(
  "/car.glb",
  function (gltf) {
    char = gltf.scene;
    char.scale.multiplyScalar(4);

    mixer = new THREE.AnimationMixer(char);

    current_animation = mixer.clipAction(gltf.animations[0]);

    charPivot.add(char);
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

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

let followCam = true;

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key.toLowerCase() === "e") {
    followCam = !followCam;
  }

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

const animate = (timestamp) => {
  requestAnimationFrame(animate);

  clock.update(timestamp);

  const delta = clock.getDelta();

  if (current_animation) {
    if (Math.abs(speed) < minSpeed) {
      current_animation?.stop();
    } else {
      current_animation?.play();
    }
  }

  if (keys.w) speed += acceleration * delta;
  if (keys.s) speed -= acceleration * delta;

  speed = Math.max(-maxSpeed / 2, Math.min(maxSpeed, speed));

  speed *= Math.pow(friction, delta * 60);

  charPivot.translateZ(speed * delta);

  if (Math.abs(speed) >= minSpeed) {
    const direction = speed > 0 ? 1 : -1;

    if (keys.a) {
      charPivot.rotation.y += turnSpeed * delta * direction;
    }
    if (keys.d) {
      charPivot.rotation.y -= turnSpeed * delta * direction;
    }
  }

  if (char) {
    if (followCam) {
      tempVecGoalPos
        .copy(cameraOffset)
        .applyQuaternion(charPivot.quaternion)
        .add(charPivot.position);
    }
    camera.position.lerp(tempVecGoalPos, 0.555);

    const lookAtOffset = new THREE.Vector3(0, 1, 4);
    const lookAtTarget = lookAtOffset
      .applyQuaternion(charPivot.quaternion)
      .add(charPivot.position);

    camera.lookAt(lookAtTarget);
  }

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
};

animate();
