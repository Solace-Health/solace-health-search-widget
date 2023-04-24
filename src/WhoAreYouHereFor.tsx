import * as React from 'react'
import styled from '@emotion/styled'
import { Icons, NextButton, TrailAnimation } from './components'
import { ButtonBase } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const StyledHeader = styled.div`
  font-size: 30px;
  line-height: 34px;
  font-family: 'Mollie glaston';
  font-feature-settings: 'liga' 1, 'kern';
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.005em;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledButton = styled(ButtonBase)<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Lato-Solace', 'Lato', sans-serif;
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

  &:hover {
    background-color: #285e50;
    color: #fff;
  }

  @media (max-width: 670px) {
    font-size: 16px;
  }
`

interface Props {
  next: () => void
}

const WhoAreYouHereFor = ({ next }: Props) => {
  const { setValue } = useFormContext()

  return (
    <TrailAnimation>
      <StyledHeader>Who are you here for?</StyledHeader>
      <StyledButton
        margin='36px 0 20px'
        onClick={() => {
          setValue('hereFor', 'self')
          next()
        }}
      >
        <Icons.SunIcon /> <span>Myself</span>
      </StyledButton>
      <StyledButton
        margin='0 0 36px'
        onClick={() => {
          setValue('hereFor', 'loved_one')
          next()
        }}
      >
        <Icons.HeartIcon />
        <span> My Loved One</span>
      </StyledButton>
      <ButtonContainer>
        <NextButton next={next} />
      </ButtonContainer>
    </TrailAnimation>
  )
}

export default WhoAreYouHereFor
