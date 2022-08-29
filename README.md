# A node module for generator random image

# Usage

Install with the following:

```bash
npm i @majorcallisto/image-text-generator --save
```

### Generate 5 Local Files

```javascript
const imageTextGenerator = require("@majorcallisto/image-text-generator");

for (let i = 0; i < 5; i++) {
  imageTextGenerator(640, 640, { fontSize: 96, wrapBreak: 8 }).toFile(
    `./sample_${i}.png`
  );
}
```

### Use Express

The following example uses express to serve a random image at the path /getSampleImage. This example uses sharp to serve a webp image.

```javascript
import express from "express";
import imageTextGenerator from "@majorcallisto/image-text-generator";

const app = express();
const port = 8008;

app.get("/getSampleImage", async (req, res) => {
  return imageTextGenerator(640, 640, { fontSize: 96, wrapBreak: 8 })
    .webp()
    .toBuffer()
    .then(data => {
      res
        .status(202)
        .header("image/webp")
        .end(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: err });
    });
});

app.listen(port, () => {
  console.log(`API Initiated on ${port}`);
});
```

## Options

| Key              | Type            | Default | Description                                                |
| ---------------- | --------------- | ------- | ---------------------------------------------------------- |
| fontSize         | `Number`        | `128`   | The fontsize in pixels                                     |
| wrapBreak        | `Number`        | `6`     | Number of characters to display before a break             |
| passPhraseLength | `Number`        | `3`     | Number of words to generate, if not specifying 'text'      |
| text             | `Array<string>` | `[]`    | Array of strings to display instead of auto-generated text |
| xStart           | `Number`        | `32`    | Starting X position of text                                |
| yStart           | `Number`        | `128`   | Starting Y position of text                                |

Some generated images

![sample_0](./sample/sample_0.png)

![sample_1](./sample/sample_1.png)

![sample_2](./sample/sample_2.png)

![sample_3](./sample/sample_3.png)

![sample_4](./sample/sample_4.png)
