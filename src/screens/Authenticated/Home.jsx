import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { images } from "../../utils/constants/images";
import { useTheme } from "@mui/material";
import Wholesalers from "./Companies";
import SidebarItem from "../../components/SidebarItem/SidebarItem";

const drawerWidth = 240;

export default function Home() {
  const [userActive, setUserActive] = React.useState(false);
  const [roleActive, setRoleActive] = React.useState(false);
  const [companyActive, setCompanyActive] = React.useState(true);
  const [wholesalerActive, setWholesalerActive] = React.useState(false);

  const handleSideBarSelection = (value) => {
    switch (value) {
      case "users":
        setUserActive(true);
        setRoleActive(false);
        setCompanyActive(false);
        setWholesalerActive(false);
        break;
      case "roles":
        setUserActive(false);
        setRoleActive(true);
        setCompanyActive(false);
        setWholesalerActive(false);
        break;
      case "companies":
        setUserActive(false);
        setRoleActive(false);
        setCompanyActive(true);
        setWholesalerActive(false);
        break;
      case "wholesalers":
        setUserActive(false);
        setRoleActive(false);
        setCompanyActive(false);
        setWholesalerActive(true);
        break;
      default:
        setWholesalerActive(true);
        break;
    }
  };

  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: theme.palette.navbar,
        }}
      >
        <Toolbar sx={{ marginLeft: "36px" }}>
          <img src={images.logo} alt="logo" width="149px" height="42px" />
        </Toolbar>
      </AppBar>
      <Drawer
            // PaperProps={{
            //   sx: {
            //     backgroundColor: "pink",
            //     color: "red",
            //   }
            // }}
        variant="permanent"
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", fontWeight: 500 }} >
          <span onClick={() => handleSideBarSelection("users")}>
            <SidebarItem text="Users" active={userActive} />
          </span>
          <span onClick={() => handleSideBarSelection("roles")}>
            <SidebarItem text="Roles" active={roleActive} />
          </span>
          <span onClick={() => handleSideBarSelection("companies")}>
            <SidebarItem text="Companies" active={companyActive} />
          </span>
          <span onClick={() => handleSideBarSelection("wholesalers")}>
            <SidebarItem text="Wholesalers" active={wholesalerActive} />
          </span>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Wholesalers />
      </Box>
    </Box>
  );
}
