import { ExportOutlined } from "@ant-design/icons";
import React, { JSX } from "react";
import { MoveDirection } from "../../DockLayout.types";
import { ExternalizeButtonProps } from "./ExternalizeButton.types";
import { useDockLayoutContext } from "../../provider/DockLayout.Provider";

import "./ExternalizeButton.less";

const ExternalizeButton = (props: ExternalizeButtonProps): JSX.Element => {

  const { type } = props;

  const context = useDockLayoutContext();
  if (!context) {
    throw new Error("No context available yet...");
  }

  const onExternalize = (): void => {
    context.movePanel(type, MoveDirection.EXTERNALIZE, true);
  };

  return (
    <span className={"panel-header-externalize"}>
      <ExportOutlined onClick={onExternalize} />
    </span>
  );
};

export default ExternalizeButton;
