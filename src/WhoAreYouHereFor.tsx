import * as React from 'react';
import styled from '@emotion/styled';
import { animated } from '@react-spring/web';
import { Icons, NextButton } from './components';
import { ButtonBase } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const StyledHeader = styled.div`
  font-size: 30px;
  line-height: 34px;
  font-family: 'Mollie glaston';
  font-feature-settings: 'liga' 1, 'kern';
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.005em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(ButtonBase)<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  font-weight: 500;
  border: 1px solid #bed3cc;
  background-color: #fff;
  color: #101010;
  text-transform: none;
  z-index: 100;
  border-radius: 10px;
  font-size: 20px;
  line-height: 20px;
  padding: 15px;
  margin: ${props => (props.margin ? props.margin : '20px 0 0 0')};

  span {
    margin-top: 12px;
  }

  @media (max-width: 670px) {
    font-size: 16px;
  }

  transition: box-shadow 0.5s, opacity 0.5s;

  &:hover {
    background-color: #285e50;
    color: #fff;
    animation: scale 250ms ease-in forwards;
    box-shadow: 0px 20px 20px -10px rgba(0, 0, 0, 0.4);
  }

  @keyframes scale {
    to {
      transform: scale(1.06);
    }
  }

  &:active {
    animation: press 0.2s 1 linear;
  }

  @keyframes press {
    0% {
      transform: scale(1.06);
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.96);
    }
  }
`;

interface Props {
  next: () => void;
  style: unknown;
}

const WhoAreYouHereFor = ({ next, style }: Props) => {
  const { setValue } = useFormContext();

  return (
    <animated.div style={style}>
      <StyledHeader>Who are you here for?</StyledHeader>
      <StyledButton
        margin='36px 0 20px'
        onClick={() => {
          setValue('hereFor', 'self');
          next();
        }}
      >
        <Icons.SunIcon /> <span>Myself</span>
      </StyledButton>
      <StyledButton
        margin='0 0 36px'
        onClick={() => {
          setValue('hereFor', 'loved_one');
          next();
        }}
      >
        <Icons.HeartIcon />
        <span> My Loved One</span>
      </StyledButton>
      <ButtonContainer>
        <NextButton next={next} />
      </ButtonContainer>
    </animated.div>
  );
};

export default WhoAreYouHereFor;
