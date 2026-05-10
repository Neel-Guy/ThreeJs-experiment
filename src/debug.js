const debugMenu = document.getElementById("debug_menu");

export function updateDebug(followCam = false) {
  debugMenu.innerHTML = "";
  const cam = document.createElement("p");
  const additionalKeyInfo = `(Press 'E' to toggle)`;
  followCam
    ? (cam.innerHTML = `Follow Cam ON ${additionalKeyInfo}`)
    : (cam.innerHTML = `Follow Cam OFF ${additionalKeyInfo}`);
  debugMenu.appendChild(cam);
}
