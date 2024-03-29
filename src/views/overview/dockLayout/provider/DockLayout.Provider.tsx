import { DockLayoutContextType } from "./DockLayout.Provider.types";
import React, { createContext, JSX, useContext, useState } from "react";
import { IPaneviewPanel, PaneviewApi } from "dockview";
import { CellInfo, CellType, MoveDirection } from "../DockLayout.types";
import { createPanePanelId, createPanePanelOption } from "../DockLayout.utils";
import { CELL_DEFAULTS } from "../DockLayout.consts";
import { Provider } from "react-redux";
import store from "../../../../redux/store";
import NewWindow from "react-new-window";
import Panel from "../panel/Panel";

export const DockLayoutContext = createContext<DockLayoutContextType | undefined>(undefined);
export const DockLayoutContextProvider = DockLayoutContext.Provider;
export const useDockLayoutContext = (): DockLayoutContextType | undefined => useContext(DockLayoutContext);

export const DockLayoutProvider= ({ children }: { children: JSX.Element }): JSX.Element => {
  const [apis, setApis] = useState<PaneviewApi[]>([]);
  const [externalCellInfos, setExternalCellInfos] = useState<CellInfo[]>([]);

  const addApi = (api: PaneviewApi): void => setApis(prevApis => [...prevApis, api]);

  const getPanel = (type: CellType): IPaneviewPanel => _getCellInfo(type).panel;

  const movePanel = (type: CellType, direction: MoveDirection, flag?: boolean): void => {
    const cellInfo = _getCellInfo(type);

    if (direction === MoveDirection.EXPAND) {
      cellInfo.panel.api.setExpanded(flag === undefined ? !cellInfo.panel.api.isExpanded : flag);
    } else {
      cellInfo.api.removePanel(cellInfo.panel);
      setExternalCellInfos(prevExternalCellInfos => [...prevExternalCellInfos, cellInfo]);
    }
  };

  const _getCellInfo = (type: CellType): CellInfo => {
    const cellInfos = apis
      .map(a => {
        const panel = a.getPanel(createPanePanelId(type));
        return panel && ({ api: a, index: a.panels.indexOf(panel), panel, type });
      })
      .filter(i => i);

    // if (cellInfos.length !== 1) {
    //   throw new Error("Panel not found for " + type);
    // }

    return cellInfos[0];
  };

  const _createPopout = (cellInfo: CellInfo): JSX.Element => {
    const onUnload = (): void => {
      setExternalCellInfos(prevExternalCellInfos => prevExternalCellInfos.filter(i => i !== cellInfo));
      cellInfo.api.addPanel(createPanePanelOption(cellInfo.type));
      cellInfo.api.movePanel(cellInfo.api.panels.length -1, cellInfo.index);
    };

    return <NewWindow
      onUnload={onUnload}
      title={CELL_DEFAULTS[cellInfo.type].title}>
      <Provider store={store}>
        <Panel isExternalized={true} type={cellInfo.type}/>
      </Provider>
    </NewWindow>
  };

  return (
    <DockLayoutContextProvider value={{ addApi, getPanel, movePanel }}>
      {children}
      {externalCellInfos.map((cellInfo, index) => (
        <React.Fragment key={'docklayout-external-cell-' + index}>
          {_createPopout(cellInfo)}
        </React.Fragment>
      ))}
    </DockLayoutContextProvider>
  );
};
