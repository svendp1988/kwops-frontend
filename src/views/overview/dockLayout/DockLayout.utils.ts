import { CellType, ColumnType } from "./DockLayout.types";
import { AddPanelOptions, AddPaneviewComponentOptions } from "dockview";
import { CELL_DEFAULTS } from "./DockLayout.consts";

const createPanelId = (type: CellType | ColumnType): string => 'panel-' + type
export const createPanePanelId = (type: CellType): string => 'pane-' + createPanelId(type)
export const createSplitPanelId = (type: ColumnType): string => 'split-' + createPanelId(type)

export const createPanePanelOption = (type: CellType): AddPaneviewComponentOptions => ({
  component: 'default',
  headerComponent: 'default',
  id: createPanePanelId(type),
  isExpanded: CELL_DEFAULTS[type].isExpanded,
  params: {
    canExternalize: CELL_DEFAULTS[type].canExternalize,
    type
  },
  title: CELL_DEFAULTS[type].title
})

export const createSplitPanelOption = (type: ColumnType, paneTypes: CellType[]): AddPanelOptions => ({
  component: 'default',
  id: createSplitPanelId(type),
  params: {
    paneTypes
  }
})
