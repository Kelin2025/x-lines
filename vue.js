import { cropObserver } from "."

export const cropLinesDirective = {
  bind(el, binding) {
    el._crop = { text: el.innerHTML, lines: binding.value }
    cropObserver.observe(el)
  }
}
