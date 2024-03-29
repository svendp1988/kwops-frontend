import { IPaneviewPanel, PaneviewApi } from "dockview";

export type CellDefault = {
  canExternalize?: boolean
  isExpanded?: boolean
  title: string
}

export type CellInfo = {
  api: PaneviewApi
  index: number
  panel: IPaneviewPanel
  type: CellType
}

export enum CellType {
  DEV_OPS, HUMAN_RESOURCES
}

export enum ColumnType {
  LEFT, RIGHT
}

export enum MoveDirection {
  EXPAND, EXTERNALIZE
}
