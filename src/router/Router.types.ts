import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number] & {
  children?: MenuItem[]
  onClick?: () => void
  path?: string
};
