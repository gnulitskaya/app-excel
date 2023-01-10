import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
    static className ='excel__table'

    constructor($root) {
        super($root, {
          listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable()
    }

    init() {
      super.init()

      this.selection = new TableSelection()
      const $cell = this.$root.find('[data-id="0:0"]')
      this.selection.select($cell)
    }

    onMousedown(event) {
        // data-resize="row"
        if (shouldResize(event)) {
          resizeHandler(this.$root, event)
        }
      }
}