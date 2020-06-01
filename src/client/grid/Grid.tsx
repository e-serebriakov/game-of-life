import * as React from 'react'

import { CellState } from '../state'
import { Cell } from './cell/Cell'
import './Grid.less'

type Props = {
  cellSize: number;
  lifeState: CellState[][];
  onCellClick: (x: number, y: number, state: CellState[][]) => () => void
}

const Grid: React.FC<Props> = (props: Props) => {
  const {
    cellSize,
    lifeState,
    onCellClick,
  } = props

  return (
    <div className="grid">
      <svg height="100%" width="100%">
        {
          lifeState.map((row, i, stateArray) => {
            return (
              <g className="grid__column" key={i}>
                {
                  row.map((cellData, j) => {
                    return (
                      <Cell
                        key={j}
                        isAlive={cellData}
                        size={cellSize}
                        x={1 + (i % stateArray.length) * cellSize}
                        y={1 + j * cellSize}
                        onClick={onCellClick(i, j, lifeState)}
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
