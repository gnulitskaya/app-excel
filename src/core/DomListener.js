import { capitalize } from './utils'

export class DomListener {
    constructor($root, listeners = []) {
      if (!$root) {
        throw new Error(`No $root provided for DomListener!`)
      }
      this.$root = $root
      this.listeners = listeners
    }
  
    initDOMListeners() {
      this.listeners.forEach(listener => {
        const method = getMethodName(listener);
        if (!this[method]) {
          throw new Error (
            `Method ${method} is not implemented in ${this.name} component`
          )
        }
        // решает проблему bind
        this[method] = this[method].bind(this)
        // стрелочная функция не создает своего контекста
        // addEventListener
        this.$root.on(listener, this[method])
      })
    }
  
    removeDOMListeners() {
      this.listeners.forEach(listener => {
        const method = getMethodName(listener);
        if (!this[method]) {
          throw new Error (
            `Method ${method} is not implemented in ${this.name} component`
          )
        }
        // removeEventListener
        // эти функции разные поэтому события не удаляются
        // this[method].bind(this) this[method] 
        this.$root.off(listener, this[method])
      })
    }
  }
  
  // input => onInput
  function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
  }
  