import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface SubmitButton {
  disabled?: boolean;
}
const SubmitButton = ({ disabled = false }: SubmitButton) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const StyledButton = styled(Button)`
    font-family: "Lato – Solace", "Lato", sans-serif;
    font-weight: 700;
    height: 50px;
    background: #1d4339;
    padding: 14px 40px !important;
    text-transform: none;
    z-index: 100;
    border-radius: 0px 12px 12px 0px;
    padding: 14px 30px;
    font-weight: 700;
    font-size: 20px;
    line-height: 18px;

    box-shadow: none;

    &:hover {
      background: #000000;
    }

    @media (max-width: 670px) {
      font-size: 16px;
      padding: 14px 30px !important;
    }
  `;
  return (
    <StyledButton
      disabled={disabled}
      size="large"
      type="submit"
      variant="contained"
      disableRipple
    >
      {isMobile ? "Search" : "Find Your Advocate"}
    </StyledButton>
  );
};

export default SubmitButton;
