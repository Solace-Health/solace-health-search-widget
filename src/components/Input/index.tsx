import * as React from 'react'
import styled from '@emotion/styled'
import { useFormContext } from 'react-hook-form'

const InputContainer = styled.div<{ margin?: string, maxWidth?: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};
  text-align: start;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  text-transform: none;
  font-size: 18px;
  line-height: 18px;
  margin: ${props => (props.margin ? props.margin : '20px 0 0 0')};

  @media (max-width: 670px) {
    font-size: 16px;
  }
`

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 6px;
  height: 48px;
  padding: 0 22px;
  margin-top: 8px;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  font-size: 18px;

  &:focus {
    outline-color: #285e50;
  }
`

interface Props {
  name: string
  labelName: string
  type: string
  margin?: string
  maxWidth?: string
}

const Input = ({ name, labelName, type, margin, maxWidth }: Props) => {
  const { register } = useFormContext()

  return (
    <InputContainer margin={margin} maxWidth={maxWidth}>
      <label style={{ width: 'fit-content' }} htmlFor={name}>
        {labelName}
      </label>
      <StyledInput type={type} {...register(name)} name={name} />
    </InputContainer>
  )
}

export default Input
