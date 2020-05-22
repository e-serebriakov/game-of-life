import * as React from 'react'

import { calculateState, generateInitialState, CellState } from '../state'
import { Cell } from './cell/Cell'
import './Grid.less'

const calculateRowsAndColumnsCount = (gridWrapperElement: HTMLElement | null, cellSize: number) => {
  if (gridWrapperElement === null) {
    return [0, 0] as const
  }

  const {
    height,
    width,
  } = gridWrapperElement.getBoundingClientRect()

  const rowsCount = Math.floor(height / cellSize)
  const columnsCount = Math.floor(width / cellSize)

  return [rowsCount, columnsCount] as const
}

type Props = {
  cellSize: number;
  updatesFrequency: number;
}

const Grid: React.FC<Props> = ({ cellSize, updatesFrequency }: Props) => {
  const gridWrapperRef = React.useRef(null)
  const [isPlaying, _setIsPlaying] = React.useState<boolean>(true)
  const [lifeState, setLifeState] = React.useState<CellState[][]>([])

  React.useEffect(() => {
    const rowsColumnsCount = calculateRowsAndColumnsCount(gridWrapperRef.current, cellSize)

    const initialState = generateInitialState(...rowsColumnsCount)
    
    setLifeState(initialState)
  }, [updatesFrequency, cellSize])

  React.useEffect(() => {
    if (isPlaying) {
      const timerId = setTimeout(() => {
        if (lifeState.length > 0 ) {
          const state = calculateState(lifeState)
    
          setLifeState(state)
        }
      }, updatesFrequency)
  
      return () => {
        clearTimeout(timerId)
      }
    }
  }, [isPlaying, lifeState])

  return (
    <div className="grid" ref={gridWrapperRef}>
      <svg height="100%" width="100%">
        {
          lifeState.map((row, i, stateArray) => {
            return (
              <g className="grid__row" key={i}>
                {
                  row.map((cellData, j) => {
                    return (
                      <Cell
                        key={j}
                        isAlive={cellData}
                        size={cellSize}
                        x={1 + (i % stateArray.length) * cellSize}
                        y={1 + j * cellSize}
                      />
                    )
                  })
                }
              </g>
            )
          })
        }
      </svg>
    </div>
  )
}

export { Grid }
