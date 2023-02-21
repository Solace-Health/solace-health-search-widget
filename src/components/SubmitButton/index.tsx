import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface SubmitButton {
  disabled?: boolean;
}
const SubmitButton = ({ disabled = false }: SubmitButton) => {
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
      background: #285e50;
    }

    @media (max-width: 670px) {
      font-size: 16px;
      padding: 14px 15px !important;
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
      Find Your Advocate
    </StyledButton>
  );
};

export default SubmitButton;
