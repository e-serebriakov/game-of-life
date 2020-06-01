import * as React from 'react'

import './ControlPanel.less'

type Props = {
  isRunning: boolean;
  onClickPlay: (state: boolean) => void;
  onClickClear: (...args: unknown[]) => void;
}

const ControlPanel = (props: Props) => {
  const {
    isRunning,
    onClickPlay,
    onClickClear,
  } = props

  return (
    <div className="controlPanel">
      <button
        className="controlPanel__control"
        onClick={onClickClear}
      >
        Clear
      </button>
      <button
        className="controlPanel__control"
        onClick={() => onClickPlay(!isRunning)}
      >
        { isRunning ? 'Pause' : 'Play' }
      </button>
    </div>
  )
}

ControlPanel.displayName = 'ControlPanel'

export {
  ControlPanel,
}
