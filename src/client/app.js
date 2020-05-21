import { fieldComponent } from './field/field'

// const UPDATE_INTERVAL_SEC = 0.5 * 1000

// const calculateRowsAndColumnsCount = () => {
//   const parentNode = document.getElementById('app')
//   const {
//     height,
//     width,
//   } = parentNode.getBoundingClientRect()

//   const rowsCount = Math.floor(height / CELL_DEFAULT_SIZE_PX)
//   const columnsCount = Math.floor(width / CELL_DEFAULT_SIZE_PX)

//   return {
//     rowsCount,
//     columnsCount,
//   }
// }

// const start = () => {
//   const { rowsCount, columnsCount } = calculateRowsAndColumnsCount()
//   let stateCopy = generateInitialState(rowsCount, columnsCount)

// const grid = new Grid2({ data: stateCopy, cellSize: CELL_DEFAULT_SIZE_PX })

// let timerId = setTimeout(function tick() {
//   stateCopy = calculateState(stateCopy)

//   grid.setProps({ data: stateCopy })

//   timerId = setTimeout(tick, UPDATE_INTERVAL_SEC)
// }, UPDATE_INTERVAL_SEC)

// setTimeout(() => clearTimeout(timerId), 5 * 1000)
// }

// start()

export const app = () => {
  return fieldComponent()
}
