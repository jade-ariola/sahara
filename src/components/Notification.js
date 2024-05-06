import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
      onClose();
    }, 750);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="notification-container">
      {showMessage && (
        <div className="notification-box">
          {message}
        </div>
      )}
    </div>
  );
};

export default Notification;
