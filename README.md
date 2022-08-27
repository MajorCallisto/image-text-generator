# A node module for generator random image

Some generated images

![sample_0](./sample/sample_0.svg)

![sample_1](./sample/sample_0.svg)

![sample_2](./sample/sample_0.svg)

![sample_3](./sample/sample_0.svg)

![sample_4](./sample/sample_0.svg)

# usage

```bash
npm i @lisnote/image-generator
```

```javascript
const imageGenerator = require('@lisnote/image-generator');

imageGenerator(1920, 1080).toFile('./test.png');

for (let i = 0; i < 5; i++) {
  imageTextGenerator(640, 640, { fontSize: 96, wrapBreak: 8 }).toFile(`./sample_${i}.png`);
}
```
