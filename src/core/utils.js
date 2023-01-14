// pure functions
export function capitalize(string) {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// 0, 3
// [0, 1, 2, 3]
export function range(start, end) {
    // для обратной стороны поменять местами аргументы
    // c помощью деструктуризации массива
    if (start > end) {
        [end, start] = [start, end]
    }
    // длина массива
    // заполнить пустыми значениями
    return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index)
}