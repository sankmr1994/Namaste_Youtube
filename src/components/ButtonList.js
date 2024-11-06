import React from "react";
import { BUTTON_LIST_NAMES } from "../utils/constants";

const ButtonList = () => {
  return (
    <div className="flex">
      {BUTTON_LIST_NAMES.map((name) => (
        <button key={name} className="px-5 py-2 m-2 bg-gray-200 rounded-md">
          {name}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
