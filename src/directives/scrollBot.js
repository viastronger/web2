import { scrollSmoothTo } from '@/utils'

export default {
  mounted(el, binding) {
    if (binding.value === false) return
    el.style.cursor = 'pointer'
    el.addEventListener('click', (e) => {
      const footerEl = document.querySelector('.footer')
      const navBar = document.querySelector('.nav-head')
      scrollSmoothTo(document.documentElement, footerEl.offsetTop - navBar.clientHeight)
      e.stopPropagation();
    })
  },
}