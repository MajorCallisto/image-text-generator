const sharp = require("sharp");

module.exports = sharpDecorator;

function sharpDecorator(width, height) {
    return sharp(bufferColorful()).resize(width, height);
}

function bufferColorful() {
    let svg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
	<radialGradient id="radialGradient1" cx="${randomNumber(1920)}" cy="${randomNumber(1080)}" r="2000" gradientUnits="userSpaceOnUse">
		<stop offset="0.1" style="stop-color:${randomHSL(0, 100, 30)}" />
		<stop offset="0.8" style="stop-color:${randomHSL(0, 100, 30)};" />
	</radialGradient>
	<radialGradient id="radialGradient2" cx="${randomNumber(1920)}" cy="${randomNumber(1080)}" r="2000" gradientUnits="userSpaceOnUse">
		<stop offset="0.1" style="stop-color:${randomHSL(0, 100, 30)}" />
		<stop offset="0.8" style="stop-color:${randomHSL(0, 100, 30)};stop-opacity:0" />
	</radialGradient>
	<rect width="100%" height="100%" fill="url(#radialGradient1)" />
	<rect width="100%" height="100%" fill="url(#radialGradient2)" />
</svg>`
    return Buffer.from(svg);
}

function randomHSL(minH, minS, minL, maxH, maxS, maxL) {
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
}

function randomNumber(num) {
    return Math.random() * num
}

