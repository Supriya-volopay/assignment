import React from "react";
import * as Fa from "react-icons/fa";
import * as Gi from "react-icons/gi";
import * as Rx from "react-icons/rx";
import * as Ai from "react-icons/ai";

const ButtonWithIcon = ({ config, item, clickButton, isActive }) => {
  const IconComponent =
    Fa[config?.icon] ||
    Gi[config?.icon] ||
    Rx[config?.icon] ||
    Ai[config?.icon];

  return (
    <button
      className={`p-3 rounded-lg flex items-center justify-center gap-2 hover:text-white ${
        config?.color
      } ${
        isActive
          ? `shadow-lg shadow-neutral-500 border-2 border-neutral-500`
          : ""
      }`}
      onClick={clickButton}
    >
      {IconComponent && <IconComponent />}
      <span>{item.name}</span>
    </button>
  );
};

export default ButtonWithIcon;
