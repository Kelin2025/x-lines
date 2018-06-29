import { cropObserver } from "."

export const CropLinesDirective = {
  bind(el, binding) {
    el._crop = { text: el.innerHTML, lines: binding.value }
    cropObserver.observe(el)
  }
}
