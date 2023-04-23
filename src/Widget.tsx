import * as React from 'react';
import PersonalInfo from './PersonalInfo';
import WhoAreYouHereFor from './WhoAreYouHereFor';
import { useForm, FormProvider } from 'react-hook-form';
import styled from '@emotion/styled';
declare global {
  interface Window {
    analytics: any;
  }
}

const SearchWidget = () => {
  const [showPersonalInfo, setShowPersonalInfo] = React.useState(false);
  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const { handleSubmit, setValue } = methods;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Lato-Solace', 'Lato', sans-serif;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    margin: 50px;
    max-width: 398px;
    background: #ffffff;
    border: 1px solid #bed3cc;
    box-shadow: 2px 2px 20px #d4e2dd;
    border-radius: 20px;
    padding: 36px 50px;
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

  const onSubmit = () => {
    // const searchParams = new URLSearchParams(params);
    // const redirect = `https://app.solace.health/findadvocates?${searchParams}`;
    // if (window.analytics) {
    //   window.analytics.track('PERFORMED_SEARCH', {
    //     context: 'MarketingHome',
    //     location,
    //     redirect_url: redirect,
    //   });
    // }
    // window.location.assign(redirect);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Wrapper>
            {showPersonalInfo ? (
              <PersonalInfo goBack={() => setShowPersonalInfo(false)} />
            ) : (
              <WhoAreYouHereFor next={() => setShowPersonalInfo(true)} />
            )}
          </Wrapper>
        </Container>
      </form>
    </FormProvider>
  );
};
export default SearchWidget;
