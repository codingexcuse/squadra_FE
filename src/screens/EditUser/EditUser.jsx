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
import { Divider } from "@mui/material";
import { validateEmail } from "../../utils/constants/validation";

const CustomTextField = styled(TextField)(({ theme }) => ({
  color: "#4D47C3",
  width: "95%",
  backgroundColor: "#F0EFFF",
  "&  .MuiFormHelperText-root.Mui-error": {
    backgroundColor: "white",
    margin: 0,
    paddingLeft: 10,
  },
}));

const EditUser = ({
  fetchData,
  data,
  handleClose,
  setIsSuccess,
  setIsError,
  setResponseErrorMessage,
  setProgress,
}) => {
  const [companyName, setCompanyName] = useState(data.companyName);
  const [email, setEmail] = useState(data.email);
  const [validTill, setValidTill] = useState(data.validTill);
  const [organizationName, setOrganizationName] = useState(
    data.orgranizationName
  );
  const [companyId, setCompanyId] = useState(data.companyId);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [companyNameValidation, setCompanyNameValidation] = useState(true);
  const [orgNameValidation, setOrgNameValidation] = useState(true);
  const [validTillValidation, setValidTillValidation] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  const handleUpdate = async () => {
    setProgress(20);
    const data = {
      companyId: companyId,
      companyName: companyName,
      email: email,
      validTill: validTill,
      orgranizationName: organizationName,
    };
    setProgress(40);
    try {
      await axiosInstance.put(`/edit/${data.companyId}`, data);
      fetchData();
      setIsSuccess(true);
      handleClose();
      setProgress(60);
    } catch (e) {
      setIsError(true);
      handleClose();
      setResponseErrorMessage(e.response.data.message);
      console.log(e);
      setProgress(60);
    }
    setProgress(100);
  };

  const handleEmailOnChange = async () => {
    const checkValidation = validateEmail(email);
    setIsEmailValid(checkValidation);
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

  const handleValidTillValidation = () => {
    if (validTill === "") {
      setValidTillValidation(false);
    } else {
      setValidTillValidation(true);
    }
  };

  const disabledAddUser = useCallback(() => {
    if (
      isEmailValid === true &&
      companyNameValidation === true &&
      orgNameValidation === true &&
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
  ]);

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

  useEffect(() => {
    disabledAddUser();
  }, [disabledAddUser]);

  useEffect(() => {
    dateFunction();
  }, []);

  return (
    <Box
      sx={{
        my: 2,
        mx: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
      }}
    >
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
            helperText={isEmailValid === false && "Please Enter a Valid Email"}
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
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { width: 1 },
            }}
            noValidate
            autoComplete="off"
          >
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
          </Box>
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
            helperText={validTillValidation === false && "Please Select a Date"}
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
            required
            fullWidth
            id="companyId"
            name="companyId"
            InputProps={{
              readOnly: true,
            }}
            value={companyId}
            disabled={true}
            onChange={(event) => setCompanyId(event.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} mt={2}>
        <Stack spacing={2} direction="row">
          <PrimaryButton
            variant="contained"
            disabled={!disabledAdd}
            onClick={handleUpdate}
            sx={{ marginTop: "1rem" }}
          >
            Update
          </PrimaryButton>
        </Stack>
      </Grid>
    </Box>
  );
};

export default EditUser;
