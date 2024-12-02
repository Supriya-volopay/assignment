import React, { useState, useEffect } from "react";

const Notification = ({ message, duration, bgColor, textColor }) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log(message);
  console.log(duration);
  console.log(isVisible);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    isVisible && (
      <div
        className={`fixed top-4 left-4 ${bgColor} ${textColor} p-4 rounded-lg shadow-lg transition-opacity  opacity-100`}
      >
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
