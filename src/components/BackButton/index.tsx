import * as React from 'react';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ButtonBase } from '@mui/material';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const StyledButton = styled(ButtonBase)`
    min-width: 100px;
    font-family: 'Lato-Solace', 'Lato', sans-serif;
    font-weight: 700;
    height: 50px;
    border: 1px solid #bed3cc;
    background-color: #fff;
    color: #285e50;
    text-transform: none;
    z-index: 100;
    border-radius: 10px;
    font-size: 18px;
    line-height: 18px;
    transition: 0.3s;
    margin-right: 10px;

    &:hover {
      background-color: #fff;
      transform: scale(1.08);
    }

    @media (max-width: 670px) {
      font-size: 16px;
    }
  `;
  return (
    <StyledButton onClick={goBack} disableRipple>
      Back
    </StyledButton>
  );
};

export default BackButton;
