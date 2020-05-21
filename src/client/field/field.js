import { generateInitialState } from '../state'
import { gridComponent } from '../grid/grid2'

const CELL_DEFAULT_SIZE_PX = 25
// const UPDATE_INTERVAL_SEC = 0.5 * 1000

const calculateRowsAndColumnsCount = () => {
  const parentNode = document.getElementById('app')
  const {
    height,
    width,
  } = parentNode.getBoundingClientRect()

  const rowsCount = Math.floor(height / CELL_DEFAULT_SIZE_PX)
  const columnsCount = Math.floor(width / CELL_DEFAULT_SIZE_PX)
  // const rowsCount = 5
  // const columnsCount = 5

  return {
    rowsCount,
    columnsCount,
  }
}

export const fieldComponent = () => {
  const { rowsCount, columnsCount } = calculateRowsAndColumnsCount()
  let stateCopy = generateInitialState(rowsCount, columnsCount)

  // let grid = Grid({ data: stateCopy, cellSize: CELL_DEFAULT_SIZE_PX })

  // let timerId = setTimeout(function tick() {
  //   stateCopy = calculateState(stateCopy)

  //   grid = Grid({ data: stateCopy, cellSize: CELL_DEFAULT_SIZE_PX })

  //   timerId = setTimeout(tick, UPDATE_INTERVAL_SEC)
  // }, UPDATE_INTERVAL_SEC)

  // setTimeout(() => clearInterval(timerId), 5 * 1000)


  return gridComponent({ data: stateCopy, cellSize: CELL_DEFAULT_SIZE_PX })
}