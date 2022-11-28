import * as React from "react";
import {
  SelectDropdown,
  LocationSearch,
  SubmitButton,
  Icons,
  ErrorMessage,
} from "./components";
import { useForm, Controller, FormProvider } from "react-hook-form";
import styled from "@emotion/styled";
declare global {
  interface Window {
    analytics: any;
  }
}

const InputWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchWidget = () => {
  const [locationError, setLocationError] = React.useState(false);
  const methods = useForm({
    defaultValues: {
      serviceType: "",
      location: {},
      workType: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 20px;

    .MuiFormControl-root {
      width: 100% !important;
      margin: 0 0 10px 0 !important;
    }

    @media (max-width: 600px) {
      > div {
        width: 100%;
      }
    }

    @media (min-width: 600px) {
      .MuiFormControl-root {
        width: 250px !important;
        margin: 8px !important;
      }
    }
  `;

  const onSubmit = (data: any) => {
    const { location, serviceType } = data;

    if (!location.address) {
      setLocationError(true);
      return;
    }

    const encodedParams = encodeURI(
      `${location.lat}&pub_lng=${location.lng}&pub_location=${location.address}&pub_serviceType=${serviceType}`
    );
    const redirect = `https://app.solace.health/findadvocates?pub_lat=${encodedParams}`;
    if (window.analytics) {
      window.analytics.track("PERFORMED_SEARCH", {
        context: "MarketingHome",
        location,
        service_type: serviceType,
        redirect_url: redirect,
      });
    }

    window.location.assign(redirect);
  };

  const onSelectLocation = (data: any) => setValue("location", data);

  const serviceTypes = [
    {
      value: "Medical Guidance",
      name: "Medical Guidance",
      extra:
        "Frontline advocates who step in and take charge during a medical crisis.",
      icon: <Icons.ServiceIcon />,
    },
    {
      value: "Wellness and Lifestyle",
      name: "Wellness and Lifestyle",
      extra:
        "Quality-of-life advocates dedicated to keeping patients healthy and out of the hospital.",
      icon: <Icons.SunIcon />,
    },
    {
      value: "Insurance and Billing",
      name: "Insurance and Billing",
      extra:
        "Resourceful advocates who tackle medical charges and insurance benefits/enrollment.",
      icon: <Icons.BuildingIcon />,
    },
    {
      value: "Aging and Special Care",
      name: "Aging and Special Care",
      extra:
        "Compassionate advocates who assist aging adults and patients with special needs.",
      icon: <Icons.HeartIcon />,
    },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Wrapper>
            <Controller
              name="serviceType"
              control={control}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field }) => {
                return (
                  <InputWrapper>
                    <SelectDropdown
                      label="Select a Service"
                      options={serviceTypes}
                      icon={<Icons.ServiceIcon />}
                      {...field}
                    />
                    {errors.serviceType && (
                      <ErrorMessage>{errors.serviceType.message}</ErrorMessage>
                    )}
                  </InputWrapper>
                );
              }}
            />
            <InputWrapper>
              <LocationSearch
                icon={<Icons.LocationIcon />}
                onHandleSelect={onSelectLocation}
              />
              {locationError && (
                <ErrorMessage>Please enter a valid city or zip</ErrorMessage>
              )}
            </InputWrapper>
          </Wrapper>
          <SubmitButton disabled={false} />
        </Container>
      </form>
    </FormProvider>
  );
};
export default SearchWidget;
