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

function analogous(hslValue, colorValue, rgbValue) {
  console.log("we're in the anal zone");
  // const rgbObj = changeHSL(colorValue);
  // console.log("h1 in anal zone is " + h1);
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
    newHSL.r = rgbValue.rNumber;
    newHSL.g = rgbValue.gNumber;
    newHSL.b = rgbValue.bNumber;
    newHSL.hex = rgbToHex(rgbValue.rNumber, rgbValue.gNumber, rgbValue.bNumber);
    //  n // newHSL.hex = ``
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

// function monochromatic(colorValue) {
//   console.log("we're in the mono zone");
// }
function pallettePicker() {
  const pallette = document.querySelector("#pallettePicker").value;
  return pallette;
  console.log("we're in the picking zone");
}

function calculatePalette(palette, colorValue, rgbValue, hslValue) {
  if (palette == "analogous") {
    console.log("we're in the pre-anal zone");
    // let result = analogous();
    //
    const colorArray = analogous(hslValue, colorValue, rgbValue);
  } else if (pallette == "monochromatic") {
    const colorArray = monochromatic(hslValue, colorValue, rgbValue);
  }
  // showColors(colorArray);
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

// View View View View

function changeTextHEX(colorValue) {
  document.querySelector("#hexvalue").textContent = colorValue;
}

function changeTextRGB(colorValue) {
  const rgbObj = changeRGB(colorValue);
  document.querySelector("#rgbvalue").textContent =
    rgbObj.rNumber + " " + rgbObj.gNumber + " " + rgbObj.bNumber;
}
function changeTextHSL(colorValue) {
  const rgbObj = changeHSL(colorValue);

  document.querySelector("#hslvalue").textContent =
    rgbObj.h + ", " + rgbObj.s + "% " + rgbObj.l + "%";
}
function showCSSstring(colorValue) {
  const CSSobj = calculateCSSstring(colorValue);
  document.querySelector(
    "#CSSvalue"
  ).textContent = `rgb(${CSSobj.rCSS}, ${CSSobj.gCSS}, ${CSSobj.bCSS})`;
}

// Controller Controller Controller Controller

function showGraphics(colorArray, colorValue) {
  console.log("color block is ", colorArray);
  const cloneColorArray = colorArray;
  // const thirdObj = colorArray[2];

  console.log(
    "clone of color array is ",
    cloneColorArray[1].s,
    cloneColorArray[3].hex
  );

  //   const colorblock = document.getElementById('box');

  // let third;

  // let placeholder = colorblock.nextElement;

  // while (placeholder) {
  //   if (placeholder.classList.contains('elSquare')) {

  //   }

  //   placeholder = placeholder.nextElement;
  // }

  // console.log(third); // 👉️ div.third
  // console.log(colorArray[0].h);

  // const frthObj = colorArray[3];
  // const secObj = colorArray[1];
  // const objobj = pallettePicker(pallette, colorValue);
  // console.log(firstObj.h, firstObj.s, firstObj.l);
  // console.log(secObj.h, secObj.s);
  // console.log(firstObj.s, secObj.l, thirdObj.index, frthObj.r);
  // console.log();
  // console.log(
  //   "h1 in the pallete picker is " +
  //     `
  //     hsl(${objobj.h1}, ${objobj.s1}%, ${objobj.l1}%) 10% ,
  //     hsl(${objobj.h2}, ${objobj.s2}%, ${objobj.l2}%) 31%,
  //     hsl(${objobj.h3}, ${objobj.s3}%, ${objobj.l3}%) 50%,
  //     hsl(${objobj.h4}, ${objobj.s4}%, ${objobj.l4}%) 69%,
  //     hsl(${objobj.h5}, ${objobj.s5}%, ${objobj.l5}%) 89%)`
  // );
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
