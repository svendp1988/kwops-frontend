import { CellDefault, CellType } from "./DockLayout.types";

export const HEADER_SIZE = 32
export const MINIMUM_CELL_WIDTH = 300

export const CELL_DEFAULTS: Record<CellType, CellDefault> = {
  [CellType.DEV_OPS]: {
    canExternalize: true,
    isExpanded: true,
    title: 'Dev Ops'
  },
  [CellType.HUMAN_RESOURCES]: {
    canExternalize: true,
    isExpanded: true,
    title: 'Human Resources'
  }
}
