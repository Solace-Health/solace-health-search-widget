import styled from "@emotion/styled";

const InputWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export { InputWrapper, Container,  Wrapper }
