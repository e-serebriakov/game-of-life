export const calculateState = (initialState) => {
  const state = JSON.parse(JSON.stringify(initialState))

  for (let i = 0; i < initialState.length; i++) {
    for (let j = 0; j < initialState[i].length; j++) {
      initialState[i][j] = isGoingLive(initialState, i, j) ? 1 : 0
    }
  }

  return state
}

const periodical = (x, sideCapacity) => {
  if (x < 0) {
    return x + sideCapacity
  }

  if (x >= sideCapacity) {
    return x - sideCapacity
  }

  return x
}

const isGoingLive = (state, x, y) =>  {
  const cell = state[x][y]
  const isAlive = cell === 1
  const neighborsCount = countNeighbors(state, x, y)

  if (isAlive) {
    return neighborsCount === 2 || neighborsCount === 3 
  }

  return neighborsCount === 3
}

const countNeighbors = (state, x, y) => {
  let neighborsCount = 0

  const xFrom = x - 1
  const xTo = x + 1
  const yFrom = y - 1
  const yTo = y + 1

  for (let i = xFrom; i <= xTo; i++) {
    for (let j = yFrom; j <= yTo; j++) {
      const iPeriodical = periodical(i, state.length)
      const jPeriodical = periodical(j, state[0].length)

      const neighborCell = state[iPeriodical][jPeriodical]
      const isAlive = neighborCell === 1

      if (isAlive && iPeriodical !== x && jPeriodical !== y) {
        neighborsCount += 1
      }
    }
  }

  return neighborsCount
}
