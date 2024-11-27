import React from "react";
import * as Fa from "react-icons/fa";
import * as Gi from "react-icons/gi";
import * as Rx from "react-icons/rx";

const ButtonWithIcon = ({ config, item, clickButton, isActive }) => {
  const IconComponent = Fa[config.icon] || Gi[config.icon] || Rx[config.icon];

  return (
    <button
      className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
        isActive ? "border-2 border-[blue]" : ""
      }`}
      style={{ background: config?.color }}
      onClick={clickButton}
    >
      {IconComponent && <IconComponent />}
      <span>{item.name}</span>
    </button>
  );
};

export default ButtonWithIcon;