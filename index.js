import ResizeObserver from "resize-observer-polyfill"

/**
 * Returns cropped text
 * @param {Object} opts Options object
 * @param {string} opts.text Text
 * @param {number} opts.width Text width
 * @param {number} opts.lines Lines needed
 * @param {string} opts.font Font name
 * @param {number} opts.size Font size
 * @param {number|string} opts.weight Font weight
 * @returns {string} Cropped text
 */
export const cropText = opts => {
  const canvas =
    cropText.canvas || (cropText.canvas = document.createElement("canvas"))
  const ctx = canvas.getContext("2d")
  ctx.font = `${opts.weight} ${opts.size}px ${opts.font}`

  const words = opts.text.split(" ")
  let line = ""
  let resText = ""
  let linesUsed = 1

  for (const word of words) {
    line += line ? " " + word : word
    const metrics = ctx.measureText(line)
    if (metrics.width + 10 > opts.width) {
      linesUsed++
      line = ""

      if (linesUsed > opts.lines) {
        return resText.slice(0, -3) + "..."
      } else {
        line += line ? " " + word : word
        resText += " " + word
      }
    } else {
      resText += " " + word
    }
  }

  return resText
}

export const cropObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    if (!entry.target._crop) return
    const el = entry.target
    const style = window.getComputedStyle(el, null)
    const size = +style.getPropertyValue("font-size").slice(0, -2)
    const font = style.getPropertyValue("font-family")
    const weight = style.getPropertyValue("font-weight")
    const width = entry.contentRect.width

    el.innerHTML = cropText({
      font,
      size,
      width,
      weight,
      text: el._crop.text,
      lines: el._crop.lines
    })
  })
})

export const initCropper = opts => {
  opts.el._crop = {
    text: "text" in opts ? opts.text : opts.el.innerHTML,
    lines: opts.lines
  }

  cropObserver.observe(opts.el)
}
