import * as React from 'react';
import { animated } from '@react-spring/web';
import Input from './components/Input';
import styled from '@emotion/styled';
import { SubmitButton, BackButton, TrailAnimation } from './components';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface Props {
  goBack: () => void;
  isSubmitting: boolean;
  style: unknown;
}

const PersonalInfo = ({ goBack, isSubmitting, style }: Props) => (
  <animated.div style={style}>
    <div>
      We'll never send spam, but we will use this to connect you with the <b>best care for your unique concerns.</b>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Input type='text' name='firstName' labelName='Your First Name' margin='20px 12px 0 0' maxWidth='48%' />
      <Input type='text' name='lastName' labelName='Your Last Name' maxWidth='48%' />
    </div>
    <Input type='email' name='email' labelName='Email Address' />
    <Input type='tel' name='phone' labelName='Mobile Phone' margin='20px 0 24px 0' />
    <ButtonContainer>
      <BackButton goBack={goBack} />
      <SubmitButton disabled={false} loading={isSubmitting} />
    </ButtonContainer>
  </animated.div>
);

export default PersonalInfo;
