import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import React, { JSX } from 'react'
import { MoveDirection } from '../../DockLayout.types'
import { ExpandButtonProps } from './ExpandButton.types'
import { useDockLayoutContext } from "../../provider/DockLayout.Provider";

import './ExpandButton.less'

const ExpandButton = (props: ExpandButtonProps): JSX.Element => {

  const { type } = props

  const context = useDockLayoutContext()
  if (!context) {
    throw new Error('No context available yet...')
  }

  const panel = context.getPanel(type)

  const [expanded, setExpanded] = React.useState<boolean>(panel.api.isExpanded)

  React.useEffect(() => {
    const disposable = panel.api.onDidExpansionChange((event) => {
      setExpanded(event.isExpanded)
    })

    return () => {
      disposable.dispose()
    }
  }, [])

  const onExpand = (): void => {
    context.movePanel(type, MoveDirection.EXPAND, !expanded)
  }

  return (
    <span className={'panel-header-expand'}>
      {expanded
        ? <CaretDownOutlined onClick={onExpand}/>
        : <CaretUpOutlined onClick={onExpand}/>
      }
    </span>
  )
}

export default ExpandButton
