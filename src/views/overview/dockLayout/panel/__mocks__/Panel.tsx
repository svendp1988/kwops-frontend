import React, { JSX } from 'react'
import { CellType } from '../../DockLayout.types'
import { PanelProps } from '../Panel.types'

const Panel = (props: PanelProps): JSX.Element => {

  const { type } = props

  return <div className="panel">
    <div>
      Type: {CellType[type]}
    </div>
  </div>
}

export default Panel
