const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const color = document.getElementById("color");
const size = document.getElementById("size");
const clear = document.getElementById("clear");
const save = document.getElementById("save");

canvas.width = 900;
canvas.height = 500;

let drawing = false;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = color.value;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  ctx.beginPath();
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "mi-dibujo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
