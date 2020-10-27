const CANVAS_ASPECT_RATIO = 1.3;

// resizes the canvas on load and when screen size changes
const resizeCanvas = () => {
  const canvas = document.querySelector('#my-canvas');
  const ctx = canvas.getContext('2d');

  // get current drawing data
  const data = canvas.toDataURL();

  // resize the canvas (resizing the canvas also clears it)
  const { width, height } = canvas.parentElement.getBoundingClientRect();
//   const height = width / CANVAS_ASPECT_RATIO;
  canvas.width = width - 100;
  canvas.height = height - 100;

  // load the drawing back to the resized canvas
  const img = new Image;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  img.src = data;
};
  
document.addEventListener('DOMContentLoaded', () => {
    // Resize the canvas so that it fits the screen
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
});
