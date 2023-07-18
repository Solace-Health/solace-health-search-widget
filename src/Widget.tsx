import * as React from 'react';
import WhoAreYouHereFor from './WhoAreYouHereFor';
import { useForm, FormProvider } from 'react-hook-form';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin: 10px;
  max-width: 398px;
  background: #ffffff;
  border: 1px solid #bed3cc;
  box-shadow: 2px 2px 20px #d4e2dd;
  border-radius: 20px;
  padding: 36px 50px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 670px) {
    font-size: 16px;
    padding: 36px 50px;
  }
`;
declare global {
  interface Window {
    analytics: any;
  }
}

const SearchWidget = () => {
  const methods = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { handleSubmit } = methods;

  const clean = (obj: Record<string, string>): Record<string, string> =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

  const onSubmit = ({ hereFor }: { hereFor: string }) => {
    if (isSubmitting) return;
    setSubmitting(true);

    const data = clean({
      here_for: hereFor,
    });

    const formQuery = new URLSearchParams(data);
    const redirect = `https://find.solace.health?${formQuery}`;
    window.location.href = redirect;

    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Wrapper>
            <WhoAreYouHereFor onSubmit={onSubmit} />
          </Wrapper>
        </Container>
      </form>
    </FormProvider>
  );
};
export default SearchWidget;
