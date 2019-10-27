/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

let path = ".assets/data/4x4.json";

const imageSelection = document.getElementById("image-selection");
imageSelection.addEventListener("click", evn => {
  switch (evn.target.value) {
    case "fourByFour": {
      path = ".assets/data/4x4.json";
      break;
    }
    case "thirtyTwo": {
      path = ".assets/data/32x32.json";
      break;
    }
    case "rsImage": {
      path = ".assets/data/rsImage.png";
      updateImageCanvas(path);
      break;
    }
    default:
      console.log("Click on checkbox");
  }
});

function updateImageCanvas(path) {
  canvas.width = 512;
  canvas.height = 512;
  const img = new Image();
  img.src = path;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

