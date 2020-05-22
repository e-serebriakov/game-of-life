import * as React from 'react'

import { calculateState, generateInitialState, CellState } from '../state'
import './Grid.less'

export type LifeStateData = CellState[][];

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

export const Grid: React.FC<Props> = ({ cellSize, updatesFrequency }) => {
  const gridWrapperRef = React.useRef(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
  const [lifeState, setLifeState] = React.useState<LifeStateData>([])

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

type CellProps = {
  x: number;
  y: number;
  size: number;
  isAlive: CellState;
}

const Cell: React.FC<CellProps> = React.memo(({ x, y, size, isAlive }) => {
  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      stroke="#c1c1c1"
      strokeWidth="0.25"
      fill={isAlive === 1 ? '#000' : '#fff'}
      className="grid__cell"
    ></rect>
  )
})