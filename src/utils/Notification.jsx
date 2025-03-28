import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Basic styles for the notification
const notificationStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px 30px",
  borderRadius: "10px",
  backgroundColor: "#ffc107",
  color: "#000",
  fontSize: "16px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  opacity: 0,
  transition: "opacity 0.5s ease-in-out",
  zIndex: 1000,
  textAlign: "center",
  border: "2px solid #000",
};

const iconStyles = {
  fontSize: "30px",
  marginBottom: "10px",
  animation: "blink 1s infinite",
};

const blinkAnimation = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// Notification component
const Notification = ({ title, message, type, duration = 2000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (title && message) {
      setVisible(true);

      // Play notification sound
      const audio = new Audio("/public/mixkit-interface-option-select-2573.wav");
      audio.play();

      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose(); // Call onClose when the notification disappears
      }, duration);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [title, message, duration, onClose]);

  // Style adjustment based on the notification type
  const notificationTypeStyles = {
    success: { backgroundColor: "#28a745" },
    error: { backgroundColor: "#dc3545" },
    info: { backgroundColor: "#17a2b8" },
    warning: { backgroundColor: "#ffc107", color: "#000", border: "2px solid #000" },
    disconnect: { backgroundColor: "#ff0000" },
  };

  return (
    <>
      <style>{blinkAnimation}</style>
      <div
        style={{
          ...notificationStyles,
          ...notificationTypeStyles[type || "success"],
          opacity: visible ? 1 : 0,
        }}
      >
        <div style={iconStyles}>⚠️</div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </>
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Notification;
