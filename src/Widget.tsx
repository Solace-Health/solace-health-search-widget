import * as React from 'react'
import PersonalInfo from './PersonalInfo'
import WhoAreYouHereFor from './WhoAreYouHereFor'
import { useForm, FormProvider } from 'react-hook-form'
import styled from '@emotion/styled'

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
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 670px) {
    font-size: 16px;
    padding: 36px 50px;
  }
`
declare global {
  interface Window {
    analytics: any
  }
}

const SearchWidget = () => {
  const [showPersonalInfo, setShowPersonalInfo] = React.useState(false)
  const methods = useForm()
  const [isSubmitting, setSubmitting] = React.useState(false)

  const { handleSubmit } = methods

  const onSubmit = async ({
    hereFor,
    firstName,
    lastName,
    email,
    phone
  }: {
    hereFor: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }) => {
    if (isSubmitting) return;
    setSubmitting(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        here_for: hereFor,
        first_name: firstName,
        last_name: lastName,
        email,
        phone
      })
    }

    const response = await fetch('https://api.solace.health/v1/api/prospects', requestOptions)
    const data: { id: string } = await response.json()
    
    if (data.id) {
      const redirect = `https://find.solace.health/?p_id=${data.id}`
      if (window.analytics) {
        window.analytics.track('FUNNEL_ENTRY', {
          context: 'MarketingHome',
          location,
          redirect_url: redirect
        })
      }
      setTimeout(() => { 
        window.location.href = redirect
        console.log(redirect)
      }, 500);

      setSubmitting(false)
      return false;
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Wrapper>
            {showPersonalInfo
              ? (
              <PersonalInfo goBack={() => { setShowPersonalInfo(false) }} isSubmitting={isSubmitting} />
                )
              : (
              <WhoAreYouHereFor next={() => { setShowPersonalInfo(true) }} />
                )}
          </Wrapper>
        </Container>
      </form>
    </FormProvider>
  )
}
export default SearchWidget
