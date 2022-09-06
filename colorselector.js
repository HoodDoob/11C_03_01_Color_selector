"use strict";
init();
function init() {
  document.querySelector("#colorselector").addEventListener("input", update);
}
function update() {
  const colorValue = document.querySelector("#colorselector").value;
  console.log("colorval", colorValue);
  changeTextHEX(colorValue);
  changeRGB(colorValue);
  changeTextRGB(colorValue);
  changeHSL(colorValue);
  changeTextHSL(colorValue);
  colorBlock(colorValue);
  calculateCSSstring(colorValue);
  showCSSstring(colorValue);
}

// Model Model Model Model

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

  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);
  return { h, s, l };
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

function colorBlock(colorValue) {
  document.querySelector("#colorblock").style.backgroundColor = colorValue;
  console.log(colorValue);
}
