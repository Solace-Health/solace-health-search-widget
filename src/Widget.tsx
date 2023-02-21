import * as React from "react";
import {
  LocationSearch,
  SubmitButton,
  Icons,
  ErrorMessage,
} from "./components";
import { useForm, FormProvider } from "react-hook-form";
import styled from "@emotion/styled";
import { omitBy, isNil } from "lodash";
declare global {
  interface Window {
    analytics: any;
  }
}

export type Location = {
  address: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  zip: string;
};

const InputWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 360px;
  min-width: 150px;
  width: 100%;
`;

const SearchWidget = () => {
  const [locationError, setLocationError] = React.useState(false);
  const methods = useForm({
    defaultValues: {
      location: {},
    },
  });

  const {
    handleSubmit,
    setValue,
  } = methods;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  `;
    
    const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  `;

  const onSubmit = (data: { location: Location; }) => {
    const { location } = data;

    if (!location.address) {
      setLocationError(true);
      return;
    }

    const params = omitBy(
      {
        pub_lat: location.lat?.toString(),
        pub_lng: location.lng?.toString(),
        pub_location: location.address,
        city: location.city,
        state: location.state,
        zip: location.zip,
      },
      isNil
    );

    const searchParams = new URLSearchParams(params);

    const redirect = `https://app.solace.health/findadvocates?${searchParams}`;

    if (window.analytics) {
      window.analytics.track("PERFORMED_SEARCH", {
        context: "MarketingHome",
        location,
        redirect_url: redirect,
      });
    }

    window.location.assign(redirect);
  };

  const onSelectLocation = (data: any) => setValue("location", data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Wrapper>
            <InputWrapper>
              <LocationSearch
                onHandleSelect={onSelectLocation}
              />
              {locationError && (
                <ErrorMessage>Please enter a valid city or zip</ErrorMessage>
              )}
            </InputWrapper>
            <SubmitButton disabled={false} />
          </Wrapper>
        </Container>
      </form>
    </FormProvider>
  );
};
export default SearchWidget;
