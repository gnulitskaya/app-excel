class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    } 

    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html

            // так мы просто возвращаем экземпляр класса чтобы можно было использовать другие методы (clear)
            // $('div').html('<span>Test</span>').clear()
            return this
        }

        return  this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
          }
          
        if(Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    // чтобы использовать методы Dom
    // помещаем его в Dom $()
    return $(el)
}