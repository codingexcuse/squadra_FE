import React from "react";
import Grid from "@mui/material/Grid";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const Header = ({ handleSorting, order }) => {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={2}>
        <Typography sx={{ color: theme.palette.headerFont, fontSize: 14 }}>
          <span
            className="headerTitle"
            onClick={() => handleSorting("companyName")}
          >
            <span className="toggleArrow">Company Name</span>
            {order === "ASC" && (
              <ArrowUpwardOutlinedIcon
                className="sortArrow"
                sx={{ position: "relative", top: "0.3rem" }}
              />
            )}
            {order === "DSC" && (
              <ArrowDownwardOutlinedIcon
                className="sortArrow"
                sx={{ position: "relative", top: "0.3rem" }}
              />
            )}
          </span>
        </Typography>
      </Grid>

      <Grid item xs={2.7}>
        <Typography sx={{ color: theme.palette.headerFont, fontSize: 14 }}>
          <span className="headerTitle" onClick={() => handleSorting("email")}>
            <span className="toggleArrow">Company's Email ID</span>
            {order === "ASC" && (
              <ArrowUpwardOutlinedIcon
                className="sortArrow"
                sx={{ position: "relative", top: "0.3rem" }}
              />
            )}
            {order === "DSC" && (
              <ArrowDownwardOutlinedIcon
                className="sortArrow"
                sx={{ position: "relative", top: "0.3rem" }}
              />
            )}
          </span>
        </Typography>
      </Grid>
      <Grid item xs={1.5}>
        <Typography
          sx={{
            color: theme.palette.headerFont,
            fontSize: 14,
            marginTop: "0.5rem",
          }}
        >
          Valid Till
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={{ color: theme.palette.headerFont, fontSize: 14 }}>
          <span
            className="headerTitle"
            onClick={() => handleSorting("orgranizationName")}
          >
            <span className="toggleArrow">Organization Name</span>
            {order === "ASC" && (
              <ArrowUpwardOutlinedIcon
                className="sortArrow"
                sx={{ position: "relative", top: "0.3rem" }}
              />
            )}
            {order === "DSC" && (
              <ArrowDownwardOutlinedIcon
                className="sortArrow"
                sx={{ position: "relative", top: "0.3rem" }}
              />
            )}
          </span>
        </Typography>
      </Grid>

      <Grid item xs={1.5}>
        <Typography
          sx={{
            color: theme.palette.headerFont,
            fontSize: 14,
            marginTop: "0.5rem",
          }}
        >
          Company's ID
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography
          sx={{
            color: theme.palette.headerFont,
            fontSize: 14,
            marginTop: "0.5rem",
          }}
        >
          Actions
        </Typography>
      </Grid>
    </>
  );
};

export default Header;
