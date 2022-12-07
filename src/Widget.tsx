import * as React from "react";
import {
  SelectDropdown,
  LocationSearch,
  SubmitButton,
  Icons,
  ErrorMessage,
} from "./components";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { InputWrapper, Container, Wrapper} from "./Styles";

declare global {
  interface Window {
    analytics: any;
  }
}

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

  interface ISubmit {
    location: any;
    serviceType?: string;
    workType?: string;
  }

  const onSubmit = (data: ISubmit) => {
    const { location, serviceType, workType } = data;

    if (!location.address) {
      setLocationError(true);
      return;
    }

    const encodedParams = encodeURI(
      `${location.lat}&pub_lng=${location.lng}&pub_location=${location.address}&pub_serviceType=${serviceType}&pub_workStyle=${workType}`
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

  const onSelectLocation = (data: unknown) => setValue("location", data);

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

  const workTypes = [
    {
      value: "in_person",
      name: "In-Person Support",
      icon: <Icons.HouseIcon />,
    },
    { value: "virtual", name: "Virtual Supprt", icon: <Icons.VideoIcon /> },
    { value: "retainer", icon: <Icons.PeopleIcon /> },
    { value: "flexible", name: "Both", icon: <Icons.PeopleIcon /> },
  ] as any;

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
            <Controller
              name="workType"
              control={control}
              rules={{
                required: { value: true, message: "This field is requred" },
              }}
              render={({ field }: { field: any}) => {
                return (
                  <InputWrapper>
                    <SelectDropdown
                      label="In-Person or Virtual?"
                      options={workTypes}
                      icon={<Icons.VideoIcon />}
                      {...field}
                    />
                    {errors && (
                      <ErrorMessage>{errors.workType.message}</ErrorMessage>
                    )}
                  </InputWrapper>
                );
              }}
            />
          </Wrapper>
          <SubmitButton disabled={false} />
        </Container>
      </form>
    </FormProvider>
  );
};
export default SearchWidget;
