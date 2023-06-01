import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ClearButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "transparent",
}));

export default ClearButton;
