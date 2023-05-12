import * as React from "react";
import Input from "./components/Input";
import styled from "@emotion/styled";
import { SubmitButton, BackButton, TrailAnimation } from "./components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface Props {
  goBack: () => void;
  isSubmitting: boolean;
}

const PersonalInfo = ({ goBack, isSubmitting }: Props) => (
  <TrailAnimation>
    <div>
      We'll never send spam, but we will use this to connect you with the{" "}
      <b>best care for your unique concerns.</b>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Input
        type="text"
        name="firstName"
        labelName="Your First Name"
        margin="20px 12px 0 0"
        maxWidth="48%"
      />
      <Input
        type="text"
        name="lastName"
        labelName="Your Last Name"
        maxWidth="48%"
      />
    </div>
    <Input
      type="text"
      name="email"
      labelName="Email Address"
      rules={{
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Please enter a valid email address",
        },
      }}
    />
    <Input
      type="text"
      name="phone"
      labelName="Mobile Phone"
      margin="20px 0 24px 0"
      format="(000) 000-0000"
      rules={{
        pattern: {
          // Don't allow 0 or 1 as first digit
          value: /^([2-9]{1})([0-9]{9})/,
          message: "Please enter a valid phone number",
        },
      }}
    />
    <ButtonContainer>
      <BackButton goBack={goBack} />
      <SubmitButton disabled={false} loading={isSubmitting} />
    </ButtonContainer>
  </TrailAnimation>
);

export default PersonalInfo;
