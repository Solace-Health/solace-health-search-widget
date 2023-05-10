import * as React from "react";
import styled from "@emotion/styled";
import { useIMask } from "react-imask";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import { animated, useSpring, config } from "@react-spring/web";

const InputContainer = styled.div<{ margin?: string; maxWidth?: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  text-align: start;
  font-family: "Lato-Solace", "Lato – Solace", "Lato", sans-serif;
  text-transform: none;
  font-size: 18px;
  line-height: 18px;
  margin: ${(props) => (props.margin ? props.margin : "20px 0 0 0")};

  @media (max-width: 670px) {
    font-size: 16px;
  }
`;

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 6px;
  height: 48px;
  padding: 0 22px;
  margin-top: 8px;
  font-family: "Lato-Solace", "Lato – Solace", "Lato", sans-serif;
  font-size: 18px;

  &:focus {
    outline-color: #285e50;
  }
`;

const StyledError = styled(animated.div)`
  font-size: 14px;
  color: red;
  padding: 5px 0 0;
`;

interface Props {
  name: string;
  labelName: string;
  type: string;
  margin?: string;
  maxWidth?: string;
  format?: any;
  rules?: RegisterOptions;
}

const Input = ({
  name,
  labelName,
  type,
  margin,
  maxWidth,
  format = String,
  rules,
}: Props) => {
  const { control, formState } = useFormContext();
  const mask = useIMask({ mask: format, autofix: true });
  const error = formState?.errors[name]?.message as string;
  const errorStyle = useSpring(
    error
      ? {
          opacity: 1,
          height: 15,
          transform: "translate(0px, 0px)",
          display: "block",
          config: config.gentle,
        }
      : {
          opacity: 0,
          height: 0,
          transform: "translate(0px, -2px)",
          display: "none",
          config: config.gentle,
        }
  );

  return (
    <InputContainer margin={margin} maxWidth={maxWidth}>
      <label style={{ width: "fit-content" }} htmlFor={name}>
        {labelName}
      </label>
      <Controller
        render={(params) => (
          <StyledInput
            name={params.field.name}
            onBlur={params.field.onBlur}
            defaultValue={params.field.value}
            ref={mask.ref}
            onInput={() => {
              params.field.onChange({
                target: { value: mask.unmaskedValue },
              });
            }}
            onChange={() => {
              params.field.onChange({
                target: { value: mask.unmaskedValue },
              });
            }}
            type={type}
          />
        )}
        name={name}
        control={control}
        rules={rules}
      />
      <StyledError style={errorStyle}>{error}</StyledError>
    </InputContainer>
  );
};

export default Input;
