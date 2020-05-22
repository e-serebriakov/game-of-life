import * as React from 'react'

import { Grid } from '../grid/Grid'
import './App.less'

const CELL_DEFAULT_SIZE_PX = 10
const UPDATE_INTERVAL_SEC = 0.1 * 1000

export const App = () => {
  return (
    <Grid cellSize={CELL_DEFAULT_SIZE_PX} updatesFrequency={UPDATE_INTERVAL_SEC}/>
  )
}
