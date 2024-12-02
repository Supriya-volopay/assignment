import React from "react";
import loading from "../../assets/img/loading.gif";

const Loading = ({ extraClasses }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <img className={`${extraClasses}`} src={loading} alt="Loading" />
    </div>
  );
};

export default Loading;
