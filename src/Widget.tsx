import * as React from "react";
import PersonalInfo from "./PersonalInfo";
import WhoAreYouHereFor from "./WhoAreYouHereFor";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";
declare global {
  interface Window {
    analytics: any;
  }
}

const SearchWidget = () => {
  const [showPersonalInfo, setShowPersonalInfo] = React.useState(false);
  const methods = useForm();

  const { handleSubmit } = methods;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Lato-Solace", "Lato", sans-serif;
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

  const onSubmit = (values: {
    hereFor: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch("http://localhost:3001/v1/api/prospects", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          const redirect = `https://app.solace.health/findadvocates?prospectId=${data.id}`;
          if (window.analytics) {
            window.analytics.track("FUNNEL_ENTRY", {
              context: "MarketingHome",
              location,
              redirect_url: redirect,
            });
          }
          window.location.assign(redirect);
        }
      });
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
