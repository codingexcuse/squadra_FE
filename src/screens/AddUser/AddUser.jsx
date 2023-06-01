import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./styles.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { styled } from "@mui/system";
import axiosInstance from "../../utils/axios";
import { validateEmail } from "../../utils/constants/validation";
import { Alert, Divider } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "95%",
  backgroundColor: theme.palette.secondary.main,
  "&  .MuiFormHelperText-root.Mui-error": {
    backgroundColor: "white",
    margin: 0,
    paddingLeft: 10,
  },
}));

const AddUser = ({
  fetchData,
  handleClose,
  setIsSuccess,
  setIsError,
  setResponseErrorMessage,
  setProgress,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [validTill, setValidTill] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [companyNameValidation, setCompanyNameValidation] = useState(true);
  const [orgNameValidation, setOrgNameValidation] = useState(true);
  const [validTillValidation, setValidTillValidation] = useState(true);
  const [companyIdValidation, setCompanyIdValidation] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAdd = async (event) => {
    event.preventDefault();
    setProgress(20);
    const data = {
      companyId: companyId.toUpperCase(),
      companyName: companyName,
      email: email,
      validTill: validTill,
      orgranizationName: organizationName,
    };
    setProgress(40);
    try {
      await axiosInstance.post("/add", data);
      fetchData();
      setIsSuccess(true);
      handleClose();
      setProgress(60);
    } catch (e) {
      setIsError(true);
      setProgress(60);
      setErrorMessage(true);
      setResponseMessage(e.response.data.message);
      console.log(e);
    }
    setProgress(100);
  };

  const handleEmailOnChange = async () => {
    const checkValidation = validateEmail(email);
    setIsEmailValid(checkValidation);
  };
  const handleDeleteMessage = () => {
    setTimeout(() => {
      setErrorMessage(false);
    }, 10000);
  };

  const handleCompanyNameValidation = () => {
    if (companyName.length === 0) {
      setCompanyNameValidation(false);
    } else {
      setCompanyNameValidation(true);
    }
  };

  const handleOrgNameValidation = () => {
    if (organizationName.length === 0) {
      setOrgNameValidation(false);
    } else {
      setOrgNameValidation(true);
    }
  };

  const dateFunction = () => {
    const date = new Date();
    let day = date.toLocaleDateString("en-GB", {
      day: "2-digit",
    });
    let month = date.toLocaleDateString("en-GB", {
      month: "2-digit",
    });
    let year = date.getFullYear();
    let todayDate = `${year}-${month}-${day}`;
    setCurrentDate(todayDate);
  };

  const handleValidTillValidation = () => {
    if (validTill === "") {
      setValidTillValidation(false);
    } else {
      setValidTillValidation(true);
    }
  };

  const handleCompanyIdValidation = () => {
    let getNumber = companyId.replace(/[^0-9]/g, "");
    let getString = companyId.replace(/[^a-zA-Z]/g, "");
    if (getNumber.length === 3 && getString.length === 3) {
      setCompanyIdValidation(true);
    } else {
      setCompanyIdValidation(false);
    }
  };

  const disabledAddUser = useCallback(() => {
    if (
      isEmailValid === true &&
      companyNameValidation === true &&
      orgNameValidation === true &&
      companyIdValidation === true &&
      validTillValidation === true
    ) {
      setDisabledAdd(true);
    } else {
      setDisabledAdd(false);
    }
  }, [
    isEmailValid,
    companyNameValidation,
    orgNameValidation,
    validTillValidation,
    companyIdValidation,
  ]);

  useEffect(() => {
    disabledAddUser();
  }, [disabledAddUser]);

  useEffect(() => {
    dateFunction();
  }, []);

  return (
    <form onSubmit={handleAdd}>
      <Box
        sx={{
          my: 2,
          mx: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        {handleDeleteMessage()}
        {errorMessage === true && (
          <Alert
            position="absolute"
            severity="error"
            sx={{
              position: "absolute",
              bottom: "23rem",
              width: "500px",
              paddingTop: 0,
              paddingBottom: 0,
              marginLeft: "13rem",
            }}
          >
            {responseMessage}
          </Alert>
        )}

        <Divider
          sx={{ marginTop: "15px", borderStyle: "dashed", color: "#151515" }}
        />

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
              mt={3}
            >
              Company Name*
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
              mt={3}
            >
              Company Email Id*
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
              mt={3}
            >
              Organization Name*
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              sx={{ color: "red" }}
              inputProps={{ maxLength: 30 }}
              autoComplete="given-name"
              name="companyName"
              error={!companyNameValidation}
              helperText={
                companyNameValidation === false && "Please Enter Valid Name"
              }
              required
              fullWidth
              id="companyName"
              value={companyName}
              onSelect={handleCompanyNameValidation}
              onBlur={handleCompanyNameValidation}
              onChange={(event) => {
                setCompanyName(event.target.value);
                handleCompanyNameValidation();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="family-name"
              error={!isEmailValid}
              helperText={
                isEmailValid === false && "Please Enter a Valid Email"
              }
              value={email}
              onSelect={handleEmailOnChange}
              onBlur={handleEmailOnChange}
              onChange={(event) => {
                setEmail(event.target.value);
                handleEmailOnChange();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              sx={{ color: "red" }}
              required
              name="organizationName"
              fullWidth
              inputProps={{ maxLength: 25 }}
              error={!orgNameValidation}
              helperText={
                orgNameValidation === false && "Please Enter Valid Org Name"
              }
              id="organizationName"
              onSelect={handleOrgNameValidation}
              onBlur={handleOrgNameValidation}
              value={organizationName}
              onChange={(event) => {
                setOrganizationName(event.target.value);
                handleOrgNameValidation();
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
            >
              Valid Till*
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
            >
              Company ID*
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              error={!validTillValidation}
              type="date"
              required
              fullWidth
              id="companyId"
              helperText={
                validTillValidation === false && "Please Select a Date"
              }
              name="companyId"
              value={validTill}
              onSelect={handleValidTillValidation}
              onBlur={handleValidTillValidation}
              inputProps={{ min: currentDate, max: "2030-12-12" }}
              onChange={(event) => setValidTill(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              error={!companyIdValidation}
              required
              fullWidth
              id="companyId"
              name="companyId"
              inputProps={{ maxLength: 6 }}
              onBlur={handleCompanyIdValidation}
              value={companyId}
              helperText={
                companyIdValidation === false &&
                "Must be 3 Number and 3 Letters"
              }
              onSelect={handleCompanyIdValidation}
              onChange={async (event) => {
                setCompanyId(event.target.value);
                handleCompanyIdValidation();
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} mt={2}>
          <Stack spacing={2} direction="row">
            <PrimaryButton
              variant="contained"
              disabled={!disabledAdd}
              type="submit"
              sx={{ marginTop: "1rem" }}
            >
              Add User
            </PrimaryButton>
          </Stack>
        </Grid>
      </Box>
    </form>
  );
};

export default AddUser;
