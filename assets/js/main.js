/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let scale = 1;

let path = ".assets/data/4x4.json";

const imageSelection = document.getElementById("image-selection");
imageSelection.addEventListener("click", evn => {
  switch (evn.target.value) {
    case "fourByFour": {
      path = "assets/data/4x4.json";
      updateJSONCanvas(path);
      break;
    }
    case "thirtyTwo": {
      path = "assets/data/32x32.json";
      updateJSONCanvas(path);
      break;
    }
    case "rsImage": {
      path = "assets/data/rsImage.png";
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

async function updateJSONCanvas(path) {
  await fetch(path)
    .then((res) => res.json())
    .then((data) => {
      const width = data[0].length;
      const height = data.length;

      if (width === 4) {
        scale = 128;
      } else if (width === 32) {
        scale = 16;
      }
      canvas.width = width * scale;
      canvas.height = height * scale;

      const newData = formatDataToColor(data);

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          ctx.fillStyle = newData[row][col];
          ctx.fillRect(row * scale, col * scale, 512, 512);
        }
      }
    });
}
function formatDataToColor(data) {
  if (data.length === 4) {
    return data.map(inner => inner.map(elem => "#" + elem));
  } else if (data.length === 32) {
    return data.map(inner => inner.map(elem => "rgba(" + elem + ")"));
  } else {
    return data;
  }
}
