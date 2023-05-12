import * as React from 'react';
import PersonalInfo from './PersonalInfo';
import WhoAreYouHereFor from './WhoAreYouHereFor';
import { useForm, FormProvider } from 'react-hook-form';
import styled from '@emotion/styled';
import { useTransition, AnimatedProps } from '@react-spring/web';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Lato-Solace", "Lato – Solace", "Lato", sans-serif;
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

const pages: ((
  props: AnimatedProps<{
    setShowPersonalInfo: any;
    style: Record<string, unknown>;
    isSubmitting: any;
  }>
) => React.ReactElement)[] = [
  ({ setShowPersonalInfo, style }) => (
    <WhoAreYouHereFor
      next={() => {
        setShowPersonalInfo(true);
      }}
      style={style}
    />
  ),
  ({ setShowPersonalInfo, style, isSubmitting }) => (
    <PersonalInfo
      goBack={() => {
        setShowPersonalInfo(false);
      }}
      isSubmitting={isSubmitting}
      style={style}
    />
  ),
];

const SearchWidget = () => {
  const [showPersonalInfo, setShowPersonalInfo] = React.useState(false);
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onChange" });
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { handleSubmit } = methods;

  const transitions = useTransition(showPersonalInfo ? 1 : 0, {
    config: {
      duration: 180,
    },
    from: {
      opacity: 0,
      transform: showPersonalInfo ? 'translate3d(100%, 0px, 0px)' : 'translate3d(-100%, 0px, 0px)',
    },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: {
      opacity: 0,
      transform: showPersonalInfo ? 'translate3d(-100%, 0px, 0px)' : 'translate3d(100%, 0px, 0px)',
    },
    exitBeforeEnter: true,
  });

  const clean = (obj: Record<string, string>): Record<string, string> =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

  const onSubmit = ({
    hereFor,
    firstName,
    lastName,
    email,
    phone,
  }: {
    hereFor: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    if (isSubmitting) return;
    setSubmitting(true);

    const data = clean({
      here_for: hereFor,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
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
            {transitions((style, i) => {
              const Page = pages[i];
              return <Page style={style} setShowPersonalInfo={setShowPersonalInfo} isSubmitting={isSubmitting} />;
            })}
          </Wrapper>
        </Container>
      </form>
    </FormProvider>
  );
};
export default SearchWidget;
