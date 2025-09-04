const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.65;
canvas.height = window.innerHeight * 0.7;

let drawing = false;
let tool = 'line';
let startX, startY;

function setTool(selected) {
  tool = selected;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('htmlCode').innerText = "<!-- Dibuja para generar etiquetas -->";
}

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
  if (!drawing) return;
  drawing = false;

  const endX = e.offsetX;
  const endY = e.offsetY;

  let htmlSnippet = '';

  if (tool === 'line') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    htmlSnippet = `<hr style="position:absolute; left:${startX}px; top:${startY}px; width:${endX - startX}px;">`;
  } 
  else if (tool === 'rect') {
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    htmlSnippet = `<div style="position:absolute; left:${startX}px; top:${startY}px; width:${endX - startX}px; height:${endY - startY}px; border:1px solid black;"></div>`;
  } 
  else if (tool === 'circle') {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
    htmlSnippet = `<div style="position:absolute; left:${startX - radius}px; top:${startY - radius}px; width:${radius * 2}px; height:${radius * 2}px; border-radius:50%; border:1px solid black;"></div>`;
  } 
  else if (tool === 'free') {
    // ya lo pintaste en mousemove
    htmlSnippet = `<!-- Dibujo libre no vectorizado aún -->`;
  }

  document.getElementById('htmlCode').innerText = htmlSnippet;
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing && tool === 'free') {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});
