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
    border-radius: 10px;
    padding: 14px 40px !important;
    text-transform: none;
    z-index: 100;
    margin-top: 10px;

    span {
      font-style: normal;
      font-weight: 700;
      padding: 14px 30px;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
    }

    &:hover {
      background: #285e50;
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
      Start Your Search
    </StyledButton>
  );
};

export default SubmitButton;
