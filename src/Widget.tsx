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
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 80px;
  `;

  const onSubmit = (data: any) => {
    const { location, serviceType, workType} = data
    console.log(data)
    const encodedParams = encodeURI(`${location.lat}&pub_lng=${location.lng}&pub_location=${location.address}&pub_serviceType=${serviceType}&pub_workStyle=${workType}`)
    const redirect = `https://app-staging.solace.health/findadvocates?pub_lat=${encodedParams}`
    // window.location.assign(redirect)
  }

  const onSelectLocation = (data: any) => {
    console.log("SETTING LOCATION:", data)
    setValue('location', data)
  }

  const serviceTypes = [
    { value: 'Medical Guidance', name: 'Medical Guidance', extra: 'Frontline advocates who step in and take charge during a medical crisis.' },
    { value: 'Wellness and Lifestyle', name: 'Wellness and Lifestyle', extra: 'Quality-of-life advocates dedicated to keeping patients healthy and out of the hospital.' },
    { value: 'Insurance and Billing', name: 'Insurance and Billing', extra: 'Resourceful advocates who tackle medical charges and insurance benefits/enrollment.' },
    { value: 'Aging and Special Care', name: 'Aging and Special Care', extra: 'Compassionate advocates who assist aging adults and patients with special needs.' },
  ]

  const workTypes = [
    { value: 'flexible', name: 'In-Person or Virtual' },
    { value: 'virtual', name: 'Virtual Support' },
    { value: 'in_person', name: 'In-Person Support' }
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
