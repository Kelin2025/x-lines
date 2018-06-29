# x-lines

Crop your text to fit it into X lines.  
[**View demo**](https://codesandbox.io/s/1qv121465l)

## Installation

```bash
npm i x-lines   # or yarn add x-lines
```

## Usage

#### Vanilla

```js
import { initCropper } from "x-lines"

const el = document.getElementById("foobar")

initCropper({ el, lines: 2 })
```

#### Vue directive

```vue
<template>
  <div v-crop-lines="2">Hello world</div>
</template>

<script>
import { cropLinesDirective } from "x-lines/vue"

export default {
  directives: {
    cropLines: cropLinesDirective
  }
}
</script>
```
