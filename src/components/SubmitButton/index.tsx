import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface SubmitButton {
  onSubmit?: () => void;
  disabled?: boolean;
}
const SubmitButton = ({ onSubmit, disabled = false }: SubmitButton) => {

  const StyledButton = styled(Button)`
    font-family: 'Lato – Solace', 'Lato', sans-serif;
    height: 50px;
    background: #1D4339;
    border-radius: 10px;
    padding: 14px 40px !important;
    text-transform: none;
    
    span {
    font-style: normal;
    font-weight: 700;
    padding: 14px 30px;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    }

    &:hover {
      background: #285E50;
    }
  `
  return (
    <StyledButton disabled={disabled} size="large" type="submit" variant="contained" disableRipple>Start Your Search</StyledButton>
  )
}

export default SubmitButton;