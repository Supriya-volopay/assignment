import React from "react";
import loading from "../../assets/img/loading.gif";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <img className="h-12" src={loading} alt="Loading" />
    </div>
  );
};

export default Loading;
