import * as React from "react";
import Typography from "@mui/material/Typography";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useTheme } from "@mui/material";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";

const SidebarItem = ({ text, icon, active }) => {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        padding={0.5}
        sx={{
          transition: "0.5s",
          cursor: "pointer",
          backgroundColor:
            active === true ? theme.palette.primary.main : "white",
          "&:hover": {
            backgroundColor: active === true && theme.palette.primary.hover,
          },
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            marginLeft: "1rem",
            color: active === true ? "white" : "black",
          }}
        >
          {text === "Users" && (
            <PersonOutlineOutlinedIcon sx={{ marginTop: "0.5rem" }} />
          )}
          {text === "Roles" && (
            <MilitaryTechOutlinedIcon sx={{ marginTop: "0.5rem" }} />
          )}
          {text === "Companies" && (
            <BusinessOutlinedIcon sx={{ marginTop: "0.5rem" }} />
          )}
          {text === "Wholesalers" && (
            <GroupAddOutlinedIcon sx={{ marginTop: "0.5rem" }} />
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography
            sx={{
              color: active === true ? "white" : "black",
              marginTop: "0.5rem",
            }}
          >
            {text}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <ArrowForwardIosIcon
            fontSize="small"
            sx={{
              position: "relative",
              left: "5rem",
              top: "0.6rem",
              color: active === true ? "white" : theme.palette.primary.main,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SidebarItem;
