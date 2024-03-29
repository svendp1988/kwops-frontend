import React, { FC, JSX } from "react";
import {
  IPaneviewPanelProps,
  ISplitviewPanelProps,
  PaneviewReact,
  PaneviewReadyEvent, SplitviewReact,
  SplitviewReadyEvent
} from "dockview";
import { CellType, ColumnType } from "./DockLayout.types";
import { createPanePanelOption, createSplitPanelOption } from "./DockLayout.utils";
import { HEADER_SIZE, MINIMUM_CELL_WIDTH } from "./DockLayout.consts";
import { DockLayoutProvider, useDockLayoutContext } from "./provider/DockLayout.Provider";
import Panel from "./panel/Panel";
import PanelHeader from "./panelHeader/PanelHeader";

import "dockview/dist/styles/dockview.css";
import './DockLayout.less';

const DockLayout: FC = () => {
  const paneComponents = {
    default: (props: IPaneviewPanelProps<{ canExternalize?: boolean, type: CellType }>): JSX.Element => (
      <Panel type={props.params.type} />
    )
  };

  const paneHeaderComponents = {
    default: (props: IPaneviewPanelProps<{ canExternalize?: boolean, type: CellType }>): JSX.Element => (
      <PanelHeader
        canExternalize={props.params.canExternalize}
        title={props.title}
        type={props.params.type}
      />
    )
  };

  const splitComponents = {
    default: (props: ISplitviewPanelProps<{ paneTypes: CellType[] }>): JSX.Element => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const context = useDockLayoutContext();

      const onReady = (event: PaneviewReadyEvent): void => {
        context?.addApi(event.api);

        props.params.paneTypes.forEach(cell => {
          const panel = event.api.addPanel(createPanePanelOption(cell));

          // @ts-ignore - private api
          panel.headerSize = HEADER_SIZE;
        });
      };

      return <PaneviewReact
        components={paneComponents}
        disableDnd={true}
        headerComponents={paneHeaderComponents}
        onReady={onReady} />;
    }
  };

  const onReady = (event: SplitviewReadyEvent): void => {
    const addPanel = (type: ColumnType, paneTypes: CellType[]): void => {
      const panel = event.api.addPanel(createSplitPanelOption(type, paneTypes));
      panel.api.setConstraints({ minimumSize: MINIMUM_CELL_WIDTH });
    };

    addPanel(ColumnType.LEFT, [CellType.HUMAN_RESOURCES]);
    addPanel(ColumnType.RIGHT, [CellType.DEV_OPS]);
  };

  return (
    <DockLayoutProvider>
      <SplitviewReact
        className={"dockview-theme-white"}
        components={splitComponents}
        onReady={onReady} />
    </DockLayoutProvider>
  );
};

export default DockLayout;
