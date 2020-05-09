import { calculateState } from './state'

let state = [
  [1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 0, 1],
]

const start = () => {
  console.log('Start')

  console.table(state)

  const intervalId = setInterval(() => {
    const newState = calculateState(state)

    console.table(newState)

    renderState(newState)
  }, 1000)

  setTimeout(() => clearInterval(intervalId), 5 * 1000)
}

const renderState = (state) => {}

start()
