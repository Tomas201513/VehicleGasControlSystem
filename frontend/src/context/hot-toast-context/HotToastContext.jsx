import { createContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

const ToastContext = createContext({});
export default ToastContext;
export const ToastProvider = ({ children }) => {
  // write a function to show a toast message with a message and a type (success, error, warning, etc) and a duration (in ms) and a position (top-right, top-left, bottom-right, bottom-left, etc)
  const showToast = (message, type, duration) => {
    toast[type](message, {
      duration: duration,
      position: "top-center",
    });
  };
  const promiseToast = (promise, message, type, duration, position) => {
    toast.promise(promise, {
      loading: message,
      success: message,
      error: message,
    });
  };

  return (
    <ToastContext.Provider value={{ promiseToast, showToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


