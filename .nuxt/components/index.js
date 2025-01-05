export { default as Clients } from '../../components/Clients.vue'
export { default as ContactUs } from '../../components/ContactUs.vue'
export { default as Footer } from '../../components/Footer.vue'
export { default as Header } from '../../components/Header.vue'
export { default as Prizes } from '../../components/Prizes.vue'
export { default as ProjectModal } from '../../components/ProjectModal.vue'
export { default as ProjectsSection } from '../../components/ProjectsSection.vue'
export { default as Home } from '../../components/home.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
