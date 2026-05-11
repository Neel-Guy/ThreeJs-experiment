const debugMenu = document.getElementById("debug_menu");

export function updateDebug(followCam = false, showDebugPhysics = false) {
  debugMenu.innerHTML = "";
  const cam = document.createElement("p");
  const additionalKeyInfoCam = `(Press 'E' to toggle)`;
  followCam
    ? (cam.innerHTML = `Follow Cam ON ${additionalKeyInfoCam}`)
    : (cam.innerHTML = `Follow Cam OFF ${additionalKeyInfoCam}`);
  debugMenu.appendChild(cam);

  const physics = document.createElement("p");
  const additionalKeyInfoPhysics = `(Press 'P' to toggle)`;
  showDebugPhysics
    ? (physics.innerHTML = `Physics debug ON ${additionalKeyInfoPhysics}`)
    : (physics.innerHTML = `Physics debug OFF ${additionalKeyInfoPhysics}`);
  debugMenu.appendChild(physics);
}
