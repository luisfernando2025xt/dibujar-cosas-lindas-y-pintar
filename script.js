const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keysText = document.getElementById("keys");
const missionsBox = document.getElementById("missions");

let drawing = false;
let brush = "normal";
let hue = 0;
let keys = Number(localStorage.getItem("keys")) || 0;

keysText.textContent = keys;

/* ======================
   MISIONES
====================== */
const missionList = [
  { text: "Usa el pincel arcoíris 🌈", type: "rainbow" },
  { text: "Abre un cofre 🎁", type: "chest" },
  { text: "Usa el pincel estrella ⭐", type: "star" }
];

let currentMission = null;

function startMission() {
  currentMission = missionList[Math.floor(Math.random() * missionList.length)];
  missionsBox.innerHTML = `<div class="mission" id="mission">${currentMission.text}</div>`;
}

function completeMission() {
  if (!currentMission) return;
  document.getElementById("mission").classList.add("done");

  keys++;
  keysText.textContent = keys;
  localStorage.setItem("keys", keys);

  currentMission = null;
  setTimeout(startMission, 1200);
}

startMission();

/* ======================
   DIBUJO (MOUSE)
====================== */
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  draw(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", () => drawing = false);

/* ======================
   DIBUJO (TOUCH)
====================== */
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  drawing = true;
  const t = e.touches[0];
  const r = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(t.clientX - r.left, t.clientY - r.top);
});

canvas.addEventListener("touchmove", (e) => {
  if (!drawing) return;
  e.preventDefault();
  const t = e.touches[0];
  const r = canvas.getBoundingClientRect();
  draw(t.clientX - r.left, t.clientY - r.top);
});

canvas.addEventListener("touchend", () => drawing = false);

/* ======================
   FUNCIÓN DIBUJAR
====================== */
function draw(x, y) {
  if (brush === "rainbow") {
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    hue += 4;
  } else if (brush === "star") {
    ctx.strokeStyle = "#ffcc00";
  } else {
    ctx.strokeStyle = "#333";
  }

  ctx.lineWidth = brush === "star" ? 6 : 4;
  ctx.lineTo(x, y);
  ctx.stroke();
}

/* ======================
   BOTONES
====================== */
document.getElementById("normal").onclick = () => brush = "normal";

document.getElementById("rainbow").onclick = () => {
  brush = "rainbow";
  if (currentMission?.type === "rainbow") completeMission();
};

document.getElementById("star").onclick = () => {
  brush = "star";
  if (currentMission?.type === "star") completeMission();
};

document.getElementById("save").onclick = () => {
  const img = canvas.toDataURL();
  localStorage.setItem("savedDrawing", img);
};

document.getElementById("chest").onclick = () => {
  if (keys <= 0) {
    alert("Necesitas una llave 🔑");
    return;
  }
  keys--;
  keysText.textContent = keys;
  localStorage.setItem("keys", keys);

  if (currentMission?.type === "chest") completeMission();
};
