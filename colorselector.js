init();
function init() {
  document.querySelector("#colorselector").addEventListener("input", update);

  //   calculateRGB();
}
function update() {
  colorValue = document.querySelector("#colorselector").value;
  changeTextHEX();
  changeRGB();
  changeTextRGB();
  changeHSL();
  colorBlock();
}

function colorBlock() {
  colorValue = document.querySelector("#colorselector").value;
  document.querySelector("#colorblock").style.backgroundColor = colorValue;
  console.log(colorValue);
}

function changeTextHEX() {
  document.querySelector("#hexvalue").textContent = colorValue;
}

function changeRGB() {
  colorString = colorValue.toString();
  r = colorString.substring(1, 3);
  rNumber = parseInt(r, 16);
  g = colorString.substring(3, 5);
  gNumber = parseInt(g, 16);
  b = colorString.substring(5, 7);
  bNumber = parseInt(b, 16);
  const rgb = { rNumber, gNumber, bNumber };
  return rgb;
}
function changeTextRGB(rgb) {
  document.querySelector("#rgbvalue").textContent =
    rNumber + " " + gNumber + " " + bNumber;
}

function changeHSL(rgb) {
  // colorString = colorValue.toString();
  // r = colorString.substring(1, 3);
  // rNumber = parseInt(r, 16);
  // g = colorString.substring(3, 5);
  // gNumber = parseInt(g, 16);
  // b = colorString.substring(5, 7);
  // bNumber = parseInt(b, 16);
  rNumber /= 255;
  gNumber /= 255;
  bNumber /= 255;

  let h, s, l;

  const min = Math.min(rNumber, gNumber, bNumber);
  const max = Math.max(rNumber, gNumber, bNumber);

  if (max === min) {
    h = 0;
  } else if (max === rNumber) {
    h = 60 * (0 + (gNumber - bNumber) / (max - min));
  } else if (max === gNumber) {
    h = 60 * (2 + (bNumber - rNumber) / (max - min));
  } else if (max === bNumber) {
    h = 60 * (4 + (rNumber - gNumber) / (max - min));
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
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  document.querySelector("#hslvalue").textContent =
    h + ", " + s + "% " + l + "%";
}

cssToRGB("rgb(192, 13, 1)");

cssToRGB("rgb(2, 23, 146)");
function cssToRGB(string) {
  r = string
    .substring(string.indexOf("("), string.indexOf(","))
    .replaceAll("(", "");
  g = string.substring(string.indexOf(" "), string.lastIndexOf(",")).trim();
  b = string
    .substring(string.lastIndexOf(" "), string.indexOf(")"))
    .replaceAll(")", "")
    .trim();
  rNumber = parseInt(r);
  gNumber = parseInt(g);
  bNumber = parseInt(b);
  // const RGBObject = new Object();
  // RGBObject.r = rNumber;
  // RGBObject.b = bNumber;
  // RGBObject.g = gNumber;
  console.log(
    "the css to rgb function : " + rNumber + " " + gNumber + " " + bNumber
  );
}

hexToRGB("#c0ffee");

function hexToRGB(string) {
  r = string.substring(1, 3);
  rNumber = parseInt(r, 16);
  g = string.substring(3, 5);
  gNumber = parseInt(g, 16);
  b = string.substring(5, 7);
  bNumber = parseInt(b, 16);
  console.log(
    "the hex to rgb function : " + rNumber + " " + gNumber + " " + bNumber
  );
}
RGBtoHex(9, 0, 37);

function RGBtoHex(r, b, g) {
  redPart = r.toString(16);
  greenPart = b.toString(16);
  bluePart = g.toString(16);
  console.log(redPart);
  console.log(greenPart);
  console.log(bluePart);
  if (redPart.length == 1) {
    redPart = 0 + redPart;
  }
  if (greenPart.length == 1) {
    greenPart = 0 + greenPart;
  }
  if (bluePart.length == 1) {
    bluePart = 0 + bluePart;
  }
  console.log("#" + redPart + greenPart + bluePart);
}

// console.log();
// middleName = magician.substring(
//   magician.indexOf(" "),
//   magician.lastIndexOf(" ")
// );
// lastName = magician.substring(magician.lastIndexOf(" "));

// console.log("The first name is " + firstName);
// console.log("The middle name is " + middleName);
// console.log("The last name is " + lastName);
