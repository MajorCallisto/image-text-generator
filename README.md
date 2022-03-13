# A node module for generator random image

Some generated images

![colorful1](./src/image/colorful1.svg)

![colorful2](./src/image/colorful2.svg)

![colorful3](./src/image/colorful3.svg)

# usage

```bash
npm i @lisnote/image-generator
```

```javascript
const imageGenerator = require("@lisnote/image-generator");

imageGenerator(1920, 1080)
	.toFile("./test.png")
imageGenerator(1920, 1080)
	.toFile("./test.jpg")
imageGenerator(1920, 1080)
	.toFile("./test.webp")
```