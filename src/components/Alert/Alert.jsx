import React from "react";
import Alert from "@mui/material/Alert";

const AlertMessage = ({ isError, isSuccess, errorMessage, successMessage }) => {
  return (
    <>
      {isError === true && (
        <Alert
          severity="error"
          sx={{ width: "500px", paddingTop: 0, paddingBottom: 0 }}
        >
          {errorMessage}
        </Alert>
      )}
      {isSuccess === true && (
        <Alert
          severity="success"
          sx={{ width: "500px", paddingTop: 0, paddingBottom: 0 }}
        >
          {successMessage}
        </Alert>
      )}
    </>
  );
};

export default AlertMessage;
