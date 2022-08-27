const sharp = require("sharp");
const { generate } = require("generate-passphrase");

const sharpDecorator = (width, height, textOptions) => {
  return sharp(bufferColorful(width, height, textOptions));
};

const bufferColorful = (width, height, textOptions = {}) => {
  const {
    fontSize = 128,
    wrapBreak = 6,
    passPhraseLength = 3,
    text = [],
    xStart = 32,
    yStart = 128
  } = textOptions;
  let lastPadding = yStart;

  const passPhrase =
    text.length === 0
      ? generate({
          length: passPhraseLength,
          separator: "-",
          uppercase: true,
          numbers: false
        }).split("-")
      : text;

  let svg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <style>
        .text { font: bold ${fontSize}px sans-serif; }
    </style>
	<radialGradient id="radialGradient1" cx="${randomNumber(
    width
  )}" cy="${randomNumber(height)}" r="2000" gradientUnits="userSpaceOnUse">
		<stop offset="0.1" style="stop-color:${randomHSL(0, 100, 30, 360, 100, 85)}" />
		<stop offset="0.8" style="stop-color:${randomHSL(0, 100, 30, 360, 100, 85)};" />
	</radialGradient>
	<radialGradient id="radialGradient2" cx="${randomNumber(
    width
  )}" cy="${randomNumber(height)}" r="2000" gradientUnits="userSpaceOnUse">
		<stop offset="0.1" style="stop-color:${randomHSL(0, 100, 30, 360, 100, 85)}" />
		<stop offset="0.8" style="stop-color:${randomHSL(
      0,
      100,
      30,
      360,
      100,
      85
    )};stop-opacity:0" />
	</radialGradient>
	<rect width="100%" height="100%" fill="url(#radialGradient1)" />
	<rect width="100%" height="100%" fill="url(#radialGradient2)" />
    ${passPhrase.map((phrase, index) => {
      let svgText = `<text x="${xStart}" y="${lastPadding}" class="text" fill="white">${phrase}</text>`;
      if (phrase.length > wrapBreak) {
        svgText = `<text x="${xStart}" y="${lastPadding}" class="text" fill="white">${phrase.substring(
          0,
          wrapBreak
        )}</text>
            <text x="${xStart}" y="${lastPadding +
          fontSize * 0.85}" class="text" fill="white">${phrase.substring(
          wrapBreak,
          phrase.length
        )}</text>`;
        lastPadding += fontSize * 0.85;
      }
      lastPadding += fontSize;
      return svgText;
    })}
</svg>`;
  return Buffer.from(svg);
};

const randomHSL = (minH, minS, minL, maxH, maxS, maxL) => {
  minH = minH || 0;
  maxH = maxH || 360;
  minS = minS || 0;
  maxS = maxS || 100;
  minL = minL || 0;
  maxL = maxL || 100;
  let HSL, H, S, L;
  H = Math.random() * (maxH - minH) + minH;
  S = Math.random() * (maxS - minS) + minS;
  L = Math.random() * (maxL - minL) + minL;
  HSL = "hsl(" + H + "," + S + "%," + L + "%)";
  return HSL;
};

const randomNumber = (num = 1) => {
  return Math.random() * num;
};
for (let i = 0; i < 5; i++) {
  sharpDecorator(640, 640, { fontSize: 96, wrapBreak: 8 }).toFile(
    `./sample_${i}.png`
  );
}

module.exports = sharpDecorator;
