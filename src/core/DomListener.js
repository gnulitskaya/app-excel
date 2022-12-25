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
      // console.log(this.listeners)
      this.listeners.forEach(listener => {
        const method = getMethodName(listener);
        if (!this[method]) {
          throw new Error (
            `Method ${method} is not implemented in ${this.name} component`
          )
        }
        // стрелочная функция не создает своего контекста
        // addEventListener
        this.$root.on(listener, this[method].bind(this))
      })
    }
  
    removeDOMListeners() {
  
    }
  }
  // input => onInput
  function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
  }
  