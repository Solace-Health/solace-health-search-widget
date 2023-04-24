import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)`
  max-width: 200px;
  font-family: 'Lato-Solace', 'Lato', sans-serif;
  font-weight: 700;
  height: 50px;
  background-color: #285e50;
  text-transform: none;
  z-index: 100;
  border-radius: 10px;
  font-size: 18px;
  line-height: 18px;
  transition: 0.3s;

  &:hover {
    background-color: #285e50;
    transform: scale(1.08);
  }

  @media (max-width: 670px) {
    font-size: 16px;
  }
`;

interface SubmitButton {
  disabled?: boolean;
}
const SubmitButton = ({ disabled = false }: SubmitButton) => (
  <StyledButton disabled={disabled} size='large' type='submit' variant='contained' disableRipple>
    Start Matching
  </StyledButton>
);

export default SubmitButton;
