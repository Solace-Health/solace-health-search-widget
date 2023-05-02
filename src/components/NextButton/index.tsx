import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const StyledButton = styled(Button)`
  max-width: 160px;
  width: 100%;
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
  color: #fff;

  &:hover {
    background-color: #285e50;
    transform: scale(1.08);
  }

  @media (max-width: 670px) {
    font-size: 16px;
  }
`

interface Props {
  next: () => void
}

const NextButton = ({ next }: Props) => (
  <StyledButton onClick={next} type='button' disableRipple>
    Next
  </StyledButton>
)

export default NextButton
