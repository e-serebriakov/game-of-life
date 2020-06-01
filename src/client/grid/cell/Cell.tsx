import * as React from 'react'

import { CellState } from '../../state'

type CellProps = {
  x: number;
  y: number;
  size: number;
  isAlive: CellState;
  onClick: (...arg: unknown[]) => void
}

const Cell = (props: CellProps) => {
  const {
    x,
    y,
    size,
    isAlive,
    onClick,
  } = props

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
      onClick={onClick}
    ></rect>
  )
}

Cell.displayName = 'Cell'
const MemoizedCell = React.memo(Cell)

export { 
  MemoizedCell as Cell,
}
