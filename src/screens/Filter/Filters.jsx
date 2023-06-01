import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./styles.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { styled } from "@mui/system";
import { Divider } from "@mui/material";

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

const Filter = ({
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
  const [currentDate, setCurrentDate] = useState("");

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
            Company Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
            mt={3}
          >
            Company Email Id
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
            mt={3}
          >
            Organization Name
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            sx={{ color: "red" }}
            inputProps={{ maxLength: 30 }}
            autoComplete="given-name"
            name="companyName"
            fullWidth
            id="companyName"
            value={companyName}
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            id="email"
            name="email"
            autoComplete="family-name"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            sx={{ color: "red" }}
            name="organizationName"
            fullWidth
            inputProps={{ maxLength: 25 }}
            id="organizationName"
            value={organizationName}
            onChange={(event) => {
              setOrganizationName(event.target.value);
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={4}>
          <Typography
            sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
          >
            Valid Till
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
          >
            Company ID
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            type="date"
            fullWidth
            id="companyId"
            name="companyId"
            value={validTill}
            inputProps={{ min: currentDate, max: "2030-12-12" }}
            onChange={(event) => setValidTill(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            id="companyId"
            name="companyId"
            inputProps={{ maxLength: 6 }}
            value={companyId}
            onChange={async (event) => {
              setCompanyId(event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} mt={2}>
        <Stack spacing={2} direction="row">
          <PrimaryButton
            variant="contained"
            type="submit"
            sx={{ marginTop: "1rem" }}
          >
            Continue
          </PrimaryButton>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Filter;
