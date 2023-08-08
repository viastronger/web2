import { scrollSmoothTo } from '@/utils'

export default {
  mounted(el, binding) {
    el.style.cursor = 'pointer'
    el.addEventListener('click', (e) => {
      const footerEl = document.querySelector('.footer')
      scrollSmoothTo(document.documentElement, footerEl.offsetTop - 134)
      e.stopPropagation();
    })
  },
}