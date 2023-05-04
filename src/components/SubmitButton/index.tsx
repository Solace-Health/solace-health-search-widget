import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)`
  max-width: 200px;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  font-weight: 700;
  height: 50px;
  background-color: #285e50;
  text-transform: none;
  z-index: 100;
  border-radius: 10px;
  font-size: 18px;
  line-height: 18px;
  transition: 0.3s;
  width: 175px;

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
  loading?: boolean;
}

const SubmitButton = ({ disabled = false, loading = false }: SubmitButton) => (
  <StyledButton disabled={disabled} size='large' type='submit' variant='contained' disableRipple>
    { loading ? <CircularProgress sx={{ color: '#fff' }} size={23}/> : "Start Matching" }
  </StyledButton>
)

export default SubmitButton;
