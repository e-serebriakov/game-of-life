import { calculateState } from './state'
import { renderGrid } from './grid'

const generateInitialState = (rowsCount, columnsCount) => {
  const state = []

  for (let i = 0; i < rowsCount; i++) {
    state[i] = []

    for (let j = 0; j < columnsCount; j++) {
      state[i][j] = Math.round(Math.random())
    } 
  }

  return state
}

const start = () => {
  let stateCopy = generateInitialState(100, 100)

  renderState(stateCopy)

  let timerId = setTimeout(function tick() {
    stateCopy = calculateState(stateCopy)

    renderState(stateCopy)
    timerId = setTimeout(tick, 1000)
  }, 1000)

  setTimeout(() => clearTimeout(timerId), 1 * 60 * 1000)
}

const renderState = (state) => {
  renderGrid(state, 10)
}

start()
