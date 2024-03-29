import React, { JSX } from "react";
import ExpandButton from "./expandButton/ExpandButton";
import ExternalizeButton from "./externalizeButton/ExternalizeButton";
import { PanelHeaderProps } from "./PanelHeader.types";

import "./PanelHeader.less";

const PanelHeader = (props: PanelHeaderProps): JSX.Element => {

  const { canExternalize, title, type } = props

  const createButtons = (): JSX.Element[] => {
    const buttons = [<ExpandButton type={type}/>]
    canExternalize && buttons.push(<ExternalizeButton type={type}/>)
    return buttons
  }

  return <div className={'panel-header'} key={'panel-header-' + type}>
    <div id={'panel-header-left'}>
      <span id={'panel-title'}>{title}</span>
    </div>
    <div id={'panel-header-center'}>
      <span id={'panel-title'}>{title}</span>
    </div>
    <div id={'panel-header-right'}>
      {createButtons()}
    </div>
  </div>
}

export default PanelHeader
