export function downloadCanvasToImage(canvas, filename) {
  if (!canvas) {
    console.error('Canvas element is not provided.');
    return;
  }

  const link = document.createElement('a');
  link.download = filename || 'canvas_image.png';
  link.href = canvas.toDataURL('image/png');

  // Simulate a click on the link to trigger the download
  link.click();
}

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};
