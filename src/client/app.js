import { calculateState } from './state'
import { renderGrid } from './grid'

let state = [
  [1, 0, 1, 1, 0], // '10110' 
  [0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 0, 1],
]

const start = () => {
  let stateCopy = JSON.parse(JSON.stringify(state))

  renderState(stateCopy)

  let timerId = setTimeout(function tick() {
    stateCopy = calculateState(stateCopy)

    renderState(stateCopy)
    timerId = setTimeout(tick, 1000)
  }, 1000)

  setTimeout(() => clearTimeout(timerId), 5 * 1000)
}

const renderState = (state) => {
  renderGrid(state, 50)
}

start()
