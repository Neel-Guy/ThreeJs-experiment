const debugMenu = document.getElementById("debug_menu");

function getDebugLine(id) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("p");
    el.id = id;
    debugMenu.appendChild(el);
  }
  return el;
}

export function updateDebug(
  followCam = false,
  showDebugPhysics = false,
  show3dHelpers = false,
) {
  const camStatus = followCam ? "ON" : "OFF";
  const physStatus = showDebugPhysics ? "ON" : "OFF";
  const helperStatus = show3dHelpers ? "ON" : "OFF";

  getDebugLine("debug_cam").textContent =
    `Follow Cam: ${camStatus} (Press 'E')`;
  getDebugLine("debug_phys").textContent =
    `collider debug: ${physStatus} (Press 'P')`;
  getDebugLine("debug_help").textContent =
    `3D helpers: ${helperStatus} (Press 'H')`;
}
