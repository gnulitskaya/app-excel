import { $ } from '../../core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    // const $root = document.createElement('div')
    // $root.classList.add('excel')
    const $root = $.create('div', 'excel')

    this.components.forEach(Component => {
      // const $el = document.createElement('div')
      // $el.classList.add(Component.className)
      const $el = $.create('div', Component.className)

      const component = new Component($el)
      // $el.innerHTML = component.toHTML()
      $el.html(component.toHTML())
      $root.append($el)
      // $root.insertAdjacentHTML('beforeend', component.toHTML())
    });
    
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}