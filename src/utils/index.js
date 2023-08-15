export const scrollSmoothTo = (el, position) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = callback => {
      return setTimeout(callback, 17)
    }
  }
  let scrollTop = el.scrollTop
  const step = () => {
    const distance = position - scrollTop
    scrollTop = scrollTop + distance / 10
    if (Math.abs(distance) < 3) {
      el.scrollTop = scrollTop + Math.ceil(distance)
    } else {
      el.scrollTop = scrollTop
      requestAnimationFrame(step)
    }
  }
  step()
}
