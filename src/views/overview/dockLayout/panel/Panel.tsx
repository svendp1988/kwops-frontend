import React, { JSX } from 'react'
import { CellType } from '../DockLayout.types'
import { PanelProps } from './Panel.types'

import './Panel.less'

const Panel = (props: PanelProps): JSX.Element => {

  const { type } = props

  const createContent = (): JSX.Element => {
    switch (type) {
      case CellType.DEV_OPS:
        return <span>Hello from Dev Ops</span>
      case CellType.HUMAN_RESOURCES:
        return <span>Hello from Human Resources</span>
      default:
        throw new Error(type)
    }
  }

  return <div className={'panel'} key={'panel-' + type}>
    {createContent()}
  </div>

}

export default Panel
