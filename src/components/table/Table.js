import { ExcelComponent } from '../../core/ExcelComponent';
import { isCell, matrix, shouldResize, nextSelector } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
    static className ='excel__table'

    constructor($root) {
        super($root, {
          listeners: ['mousedown', 'keydown']
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
      this.selection = new TableSelection()
    }

    init() {
      super.init()

      const $cell = this.$root.find('[data-id="0:0"]')
      this.selection.select($cell)
    }

    onMousedown(event) {
        // data-resize="row"
        if (shouldResize(event)) {
          resizeHandler(this.$root, event)
        } else if (isCell(event )) {
          const $target = $(event.target)
          // при нажатии на шифт выбираем группу
          if(event.shiftKey) {
            const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
            this.selection.selectGroup($cells)
          } else {
            this.selection.select($target)
          }
        }
    }

    onKeydown(event) {
      console.log('dscds');
      const keys = [
        'Enter',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
        'ArrowUp'
      ]

      const {key} = event // event.key

      if(keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        const id = this.selection.current.id(true)
        const $next = this.$root.find(nextSelector(key, id))
        this.selection.select($next)
      }
    }
  }