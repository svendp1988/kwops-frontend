import { IPaneviewPanel, PaneviewApi } from "dockview";
import { CellType, MoveDirection } from "../DockLayout.types";

export interface DockLayoutContextType {
  addApi: (api: PaneviewApi) => void
  getPanel: (type: CellType) => IPaneviewPanel
  movePanel: (type: CellType, direction: MoveDirection, flag?: boolean) => void
}
