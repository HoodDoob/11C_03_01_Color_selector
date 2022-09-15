"use strict";
window.addEventListener("DOMContentLoaded", start);
const colorArray = [];
const Protoarray = {
  index: 0,
  h: null,
  s: "",
  l: "",
  r: " dfg",
  g: " dgfg",
  b: " dfg",
  hex: "",
};
function start() {
  init();
}

function init() {
  document.querySelector("#colorSelector").addEventListener("input", update);
}
function update() {
  const colorValue = document.querySelector("#colorSelector").value;

  console.log("colorval", colorValue);
  const rgbValue = changeRGB(colorValue);
  const hslValue = changeHSL(colorValue);
  const palette = pallettePicker();
  console.log("pallete is in the update " + palette);
  console.log("hslvalue in the update is  " + hslValue);
  // changeTextHEX(colorValue, pallette);
  // changeRGB(colorValue);
  // changeTextRGB(colorValue, pallette);
  // changeHSL(colorValue);
  // changeTextHSL(colorValue, pallette);

  calculatePalette(palette, colorValue, rgbValue, hslValue);
  // colorBlock(colorValue, pallette);
  // calculateCSSstring(colorValue);
  // showCSSstring(colorValue, pallette);
}

// Model Model Model Model

function monochromatic(hslValue, colorValue, rgbValue) {
  console.log("we're in the mono zone");

  console.log(
    "anal zone shows " + hslValue.s + " " + colorValue + " " + rgbValue.rNumber
  );
  colorArray.length = 0;
  for (let i = -44; i <= 44; i += 22) {
    const newHSL = Object.create(Protoarray);
    newHSL.index = Protoarray.index += 1;
    newHSL.h = hslValue.h;
    newHSL.s = hslValue.s;
    newHSL.l = hslValue.l + i;
    const newRGB = convertHSLtoRGB(newHSL);
    newHSL.r = newRGB.r;
    newHSL.g = newRGB.g;
    newHSL.b = newRGB.b;

    newHSL.hex = rgbToHex(newRGB.r, newRGB.g, newRGB.b);
    colorArray.push(newHSL);
    // }
    console.log("my new color array is: ", colorArray);
  }
  showGraphics(colorArray, colorValue);
}

function analogous(hslValue, colorValue, rgbValue) {
  console.log("we're in the anal zone");

  console.log(
    "anal zone shows " + hslValue.s + " " + colorValue + " " + rgbValue.rNumber
  );
  colorArray.length = 0;
  for (let i = -70; i <= 70; i += 35) {
    const newHSL = Object.create(Protoarray);
    newHSL.index = Protoarray.index += 1;
    newHSL.h = hslValue.h + i;
    newHSL.s = hslValue.s;
    newHSL.l = hslValue.l;
    const newRGB = convertHSLtoRGB(newHSL);
    newHSL.r = newRGB.r;
    newHSL.g = newRGB.g;
    newHSL.b = newRGB.b;

    newHSL.hex = rgbToHex(newRGB.r, newRGB.g, newRGB.b);
    colorArray.push(newHSL);
    // }
    console.log("my new color array is: ", colorArray);
  }
  showGraphics(colorArray, colorValue);
}
function rgbToHex(r, g, b) {
  const newHEX =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return newHEX;
}

function pallettePicker() {
  const pallette = document.querySelector("#pallettePicker").value;
  return pallette;
}

function calculatePalette(palette, colorValue, rgbValue, hslValue) {
  if (palette == "analogous") {
    console.log("we're in the pre-anal zone");

    analogous(hslValue, colorValue, rgbValue);
  } else if (palette == "monochromatic") {
    monochromatic(hslValue, colorValue, rgbValue);
  }
  console.log("showColors");
}

function calculateCSSstring(colorValue) {
  const rgbObj = changeRGB(colorValue);
  let rCSS = rgbObj.rNumber;
  let gCSS = rgbObj.gNumber;
  let bCSS = rgbObj.bNumber;
  let CSSstring = { rCSS, gCSS, bCSS };
  return CSSstring;
}
function changeRGB(colorValue) {
  let colorString = colorValue.toString();
  let r = colorString.substring(1, 3);
  let rNumber = parseInt(r, 16);
  let g = colorString.substring(3, 5);
  let gNumber = parseInt(g, 16);
  let b = colorString.substring(5, 7);
  let bNumber = parseInt(b, 16);
  let rgb = { rNumber, gNumber, bNumber };
  return rgb;
}

function changeHSL(colorValue) {
  const rgbObj = changeRGB(colorValue);
  rgbObj.rNumber /= 255;
  rgbObj.gNumber /= 255;
  rgbObj.bNumber /= 255;
  // console.log("rgb " + rgbObj.bNumber + " " + rgbObj.gNumber);
  let h, s, l;

  const min = Math.min(rgbObj.rNumber, rgbObj.gNumber, rgbObj.bNumber);
  const max = Math.max(rgbObj.rNumber, rgbObj.gNumber, rgbObj.bNumber);

  if (max === min) {
    h = 0;
  } else if (max === rgbObj.rNumber) {
    h = 60 * (0 + (rgbObj.gNumber - rgbObj.bNumber) / (max - min));
  } else if (max === rgbObj.gNumber) {
    h = 60 * (2 + (rgbObj.bNumber - rgbObj.rNumber) / (max - min));
  } else if (max === rgbObj.bNumber) {
    h = 60 * (4 + (rgbObj.rNumber - rgbObj.gNumber) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Number(h.toFixed(0));
  s = Number(s.toFixed(0));
  l = Number(l.toFixed(0));
  let hsl = { h, s, l };
  console.log("hsl obcjet in the fucntion is " + h + " " + s);
  return hsl;
}

function convertHSLtoRGB(newHSL) {
  const h = newHSL.h;

  const s = newHSL.s / 100;
  const l = newHSL.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  let newRGB = { r, g, b };
  return newRGB;
}

// View View View View

// function changeTextHEX(colorValue) {
//   document.querySelector("#hexvalue").textContent = colorValue;
// }

// function changeTextRGB(colorValue) {
//   const rgbObj = changeRGB(colorValue);
//   document.querySelector("#rgbvalue").textContent =
//     rgbObj.rNumber + " " + rgbObj.gNumber + " " + rgbObj.bNumber;
// }
// function changeTextHSL(colorValue) {
//   const rgbObj = changeHSL(colorValue);

//   document.querySelector("#hslvalue").textContent =
//     rgbObj.h + ", " + rgbObj.s + "% " + rgbObj.l + "%";
// }
// function showCSSstring(colorValue) {
//   const CSSobj = calculateCSSstring(colorValue);
//   document.querySelector(
//     "#CSSvalue"
//   ).textContent = `rgb(${CSSobj.rCSS}, ${CSSobj.gCSS}, ${CSSobj.bCSS})`;
// }

// Controller Controller Controller Controller

// changeBackgroundColor(){

// }
function showGraphics(colorArray, colorValue) {
  console.log("color block is ", colorArray);
  const cloneColorArray = colorArray;
  // const thirdObj = colorArray[2];

  console.log(
    "clone of color array is ",
    cloneColorArray[1].s,
    cloneColorArray[3].hex
  );

  document.querySelector(
    "#colorblock"
  ).style.backgroundImage = `linear-gradient(to right, hsl(${cloneColorArray[0].h}, ${cloneColorArray[0].s}%, ${cloneColorArray[0].l}%) 9% , hsl(${cloneColorArray[1].h}, ${cloneColorArray[1].s}%, ${cloneColorArray[1].l}%) 29.8%, hsl(${cloneColorArray[2].h}, ${cloneColorArray[2].s}%, ${cloneColorArray[2].l}%) 50%, hsl(${cloneColorArray[3].h}, ${cloneColorArray[3].s}%, ${cloneColorArray[3].l}%) 69%, hsl(${cloneColorArray[4].h}, ${cloneColorArray[4].s}%, ${cloneColorArray[4].l}%) 90%)`;

  // first square
  for (let i = 0; i <= 4; i += 1) {
    // document.querySelector(`#square${i} .hexvalue`).textContent = colorValue;
    document.querySelector(
      `#square${i} .hexvalue`
    ).textContent = `${cloneColorArray[i].hex}`;
    document.querySelector(
      `#square${i} .rgbvalue`
    ).textContent = `${cloneColorArray[i].r} ${cloneColorArray[i].g} ${cloneColorArray[i].b}`;
    document.querySelector(
      `#square${i} .rgbvalue`
    ).textContent = `${cloneColorArray[i].r} ${cloneColorArray[i].g} ${cloneColorArray[i].b}`;
    document.querySelector(
      `#square${i} .hslvalue`
    ).textContent = `${cloneColorArray[i].h} ${cloneColorArray[i].s}% ${cloneColorArray[i].l}%`;
    document.querySelector("#colorblock").style.backgroundColor = colorValue;
  }
  // console.log(colorValue);
}
// function returnHSL(colorArray)
