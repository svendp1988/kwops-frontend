import { CellType } from '../DockLayout.types'

export interface PanelHeaderProps {
  canExternalize?: boolean,
  title: string,
  type: CellType
}
