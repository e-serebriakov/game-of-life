import * as React from 'react'

import { ControlPanel } from '../controlPanel/ControlPanel'
import { Grid } from '../grid/Grid'
import { CellState, generateInitialState, calculateState } from '../state'
import './App.less'

const CELL_DEFAULT_SIZE_PX = 15
const UPDATE_INTERVAL_SEC = 0.05 * 1000
const LIFE_CHANCE = 0.15

const useRowsAndColumnsCount = <T extends HTMLElement>(cellSize: number): [[number, number], React.Ref<T>]=> {
  const [rowsCountState, setRowsCount] = React.useState<number>(0)
  const [columnsCountState, setColumnsCount] = React.useState<number>(0)

  const ref: React.Ref<T> = React.useCallback(node => {
    if (node !== null) {
      const {
        height,
        width,
      } = node.getBoundingClientRect()
      const rowsCount = Math.floor(height / cellSize)
      const columnsCount = Math.floor(width / cellSize)

      setRowsCount(rowsCount)
      setColumnsCount(columnsCount)
    }
  }, [cellSize])

  return [[rowsCountState, columnsCountState], ref]
}

type Props = {
  cellSize: number;
  updatesFrequency: number;
  isRunning: boolean;
}

const updateCellState = (callback: React.Dispatch<React.SetStateAction<CellState[][]>>) => (x: number, y: number, state: CellState[][]) => () => {
  const newState = state.map((row, i) => {
    return row.map((cellState, j) => {
      if (x === i && y === j) {
        return Math.abs(cellState - 1) as CellState
      }

      return cellState
    })
  })

  callback(newState)
}

const App: React.FC = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false)
  const [lifeState, setLifeState] = React.useState<CellState[][]>([])
  const [rowsColumnsCount, gridWrapperRef] = useRowsAndColumnsCount<HTMLDivElement>(CELL_DEFAULT_SIZE_PX)
  const [rowsCount, columnsCount] = rowsColumnsCount

  React.useEffect(() => {
    const initialState = generateInitialState(rowsColumnsCount, () => Math.random() < LIFE_CHANCE)
    
    setLifeState(initialState)
  }, [UPDATE_INTERVAL_SEC, CELL_DEFAULT_SIZE_PX, rowsCount, columnsCount])

  React.useEffect(() => {
    if (isRunning) {
      const timerId = setTimeout(() => {
        if (lifeState.length > 0 ) {
          const state = calculateState(lifeState)
    
          setLifeState(state)
        }
      }, UPDATE_INTERVAL_SEC)
  
      return () => {
        clearTimeout(timerId)
      }
    }
  }, [isRunning, lifeState])

  const clearState = () => {
    const initialState = generateInitialState(rowsColumnsCount, () => false)
    
    setLifeState(initialState)
    setIsRunning(false)
  }

  return (
    <div className="app">
      <ControlPanel
        onClickPlay={setIsRunning}
        onClickClear={clearState}
        isRunning={isRunning}
      />
      <div className="app__grid" ref={gridWrapperRef}>
        <Grid
          cellSize={CELL_DEFAULT_SIZE_PX}
          lifeState={lifeState}
          onCellClick={updateCellState(setLifeState)}
        />  
      </div>
    </div>
  )
}

App.displayName = 'App'

export {
  App,
}
