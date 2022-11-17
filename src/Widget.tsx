import * as React from 'react';
import { SelectDropdown, LocationSearch, SubmitButton, Icons } from './components'
import { useForm, Controller, FormProvider } from "react-hook-form";
import styled from '@emotion/styled';

const SearchWidget = () => {
  const methods = useForm({
    defaultValues: {
      serviceType: '',
      location: {},
      workType: '',
    }
  });

  const { control, handleSubmit, setValue } = methods;

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
    margin-bottom: 30px;
    padding: 0 20px;

    .MuiFormControl-root {
      width: 100% !important;
      margin: 0 0 10px 0 !important
    }

    @media (max-width: 600px) {
      > div {
        width: 100%;
      }
    }
    

    @media (min-width: 600px) {
      .MuiFormControl-root {
        width: 250px !important;
        margin: 8px !important
      }
    }
  `;

  const onSubmit = (data: any) => {
    const { location, serviceType, workType} = data
    console.log(data)
    const encodedParams = encodeURI(`${location.lat}&pub_lng=${location.lng}&pub_location=${location.address}&pub_serviceType=${serviceType}&pub_workStyle=${workType}`)
    const redirect = `https://app.solace.health/findadvocates?pub_lat=${encodedParams}`
    window.location.assign(redirect)
  }

  const onSelectLocation = (data: any) => {
    setValue('location', data)
  }

  const serviceTypes = [
    { value: 'Medical Guidance', name: 'Medical Guidance', extra: 'Frontline advocates who step in and take charge during a medical crisis.', icon: <Icons.ServiceIcon /> },
    { value: 'Wellness and Lifestyle', name: 'Wellness and Lifestyle', extra: 'Quality-of-life advocates dedicated to keeping patients healthy and out of the hospital.', icon: <Icons.SunIcon /> },
    { value: 'Insurance and Billing', name: 'Insurance and Billing', extra: 'Resourceful advocates who tackle medical charges and insurance benefits/enrollment.', icon: <Icons.BuildingIcon />},
    { value: 'Aging and Special Care', name: 'Aging and Special Care', extra: 'Compassionate advocates who assist aging adults and patients with special needs.', icon: <Icons.HeartIcon /> },
  ]

  const workTypes = [
    { value: 'in_person', name: 'In-Person Support', icon: <Icons.HouseIcon /> },
    { value: 'virtual', name: 'Virtual Support', icon: <Icons.VideoIcon/> },
    { value: 'flexible', name: 'Both', icon: <Icons.PeopleIcon /> }
  ]

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Wrapper>
            <Controller
              name="serviceType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => 
                <SelectDropdown
                  label="Select a Service"
                  options={serviceTypes} 
                  icon={<Icons.ServiceIcon />}
                  {...field} 
                />
              }
            />
            <LocationSearch onHandleSelect={onSelectLocation} />
            <Controller
              name="workType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => 
                <SelectDropdown 
                  label="In-Person or Virtual?"
                  options={workTypes} 
                  icon={<Icons.VideoIcon />}
                  {...field} 
                />
              }
            />
        </Wrapper>
        <SubmitButton disabled={false} />
      </Container>
      </form>
    </FormProvider>
  )
}
export default SearchWidget;
