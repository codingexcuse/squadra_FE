import React from "react";
import { Backdrop, Modal, Fade, IconButton } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useTheme } from "@mui/material";
import ClearButton from "../../components/ClearButton/ClearButton";
import Typography from "@mui/material/Typography";

const ModalComponent = ({
  open,
  handleClose,
  fetchData,
  Component,
  showClear,
  data,
  title,
  setIsError,
  setIsSuccess,
  setResponseErrorMessage,
  setProgress,
}) => {
  const theme = useTheme();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="popform">
          {showClear === true && (
            <ClearButton
              sx={{ position: "relative", left: "48rem", top: "4.1rem" }}
              size="small"
              variant="outlined"
            >
              Clear Filters
            </ClearButton>
          )}

          <Typography
            sx={{
              position: "relative",
              top: "2.7rem",
              left: "3.9rem",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "20px",
              color: "#4D47C3",
              lineHeight: "24px",
            }}
          >
            {title}
          </Typography>

          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              marginLeft: "900px",
              marginTop: "10px",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              borderRadius: "0.5rem",
            }}
          >
            <CloseSharpIcon />
          </IconButton>
          <Component
            fetchData={fetchData}
            data={data}
            handleClose={handleClose}
            setIsError={setIsError}
            setIsSuccess={setIsSuccess}
            setResponseErrorMessage={setResponseErrorMessage}
            setProgress={setProgress}
          />
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
