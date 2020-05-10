import * as d3 from 'd3'

import { calculateState, generateInitialState } from './state'
import { renderGrid } from './grid'

const CELL_DEFAULT_SIZE_PX = 25

const renderState = (state) => {
  renderGrid(state, CELL_DEFAULT_SIZE_PX)
}

const calculateRowsAndColumnsCount = () => {
  const parentNode = d3.select('#grid').node()
  const {
    height,
    width,
  } = parentNode.getBoundingClientRect()

  const rowsCount = Math.floor(height / CELL_DEFAULT_SIZE_PX)
  const columnsCount = Math.floor(width / CELL_DEFAULT_SIZE_PX)

  return {
    rowsCount,
    columnsCount,
  }
}

const start = () => {
  const { rowsCount, columnsCount } = calculateRowsAndColumnsCount()

  let stateCopy = generateInitialState(rowsCount, columnsCount)
  const interval = 0.5 * 1000

  renderState(stateCopy)

  let timerId = setTimeout(function tick() {
    stateCopy = calculateState(stateCopy)

    renderState(stateCopy)
    timerId = setTimeout(tick, interval)
  }, interval)

  setTimeout(() => clearTimeout(timerId), 1 * 60 * 1000)
}

start()
