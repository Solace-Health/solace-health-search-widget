import * as React from 'react';
import { SelectDropdown, LocationSearch } from './components'
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const SearchWidget = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      serviceType: '',
      location: {},
      workType: '',
    }
  });

  const Container = styled.div`
    display: flex;
  `;

  const onSubmit = (data: any) => {
    console.log(data);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Controller
            name="serviceType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => 
              <SelectDropdown
                label="Select a Service"
                options={serviceTypes} 
                {...field} 
              />
            }
          />
          <Controller
            name="workType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => 
              <SelectDropdown 
                label="In-Person or Virtual?"
                options={workTypes} 
                {...field} 
              />
            }
          />
        </Container>
        <Button size="large" type="submit" variant="contained">Start Your Search</Button>
      </form>
      {/* <SelectDropdown />
      <LocationSearch /> */}
    </div>
  )
}
export default SearchWidget;
