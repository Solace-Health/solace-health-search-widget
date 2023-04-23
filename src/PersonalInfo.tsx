import * as React from 'react';
import Input from './components/Input';
import styled from '@emotion/styled';
import { SubmitButton, BackButton, TrailAnimation } from './components';

type Props = {
  goBack: () => void;
};

const PersonalInfo = ({ goBack }: Props) => {
  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;
  return (
    <TrailAnimation>
      <div>
        We'll never send spam, but we will use this to connect you with the <b>best care for your unique concerns.</b>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Input type='text' labelName='Your First Name' margin='20px 12px 0 0' maxWidth='48%' />
        <Input type='text' labelName='Your Last Name' maxWidth='48%' />
      </div>
      <Input type='email' labelName='Email Address' />
      <Input type='tel' labelName='Mobile Phone' margin='20px 0 24px 0' />
      <ButtonContainer>
        <BackButton goBack={goBack} />
        <SubmitButton disabled={false} />
      </ButtonContainer>
    </TrailAnimation>
  );
};

export default PersonalInfo;
