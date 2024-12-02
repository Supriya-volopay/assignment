import Notification from "../Components/core/NotificationModal";

export const getNotification = ({ message, duration, bgColor, textColor }) => {
  return (
    <Notification
      message={message}
      bgColor={bgColor}
      textColor={textColor}
      duration={duration}
    />
  );
};
