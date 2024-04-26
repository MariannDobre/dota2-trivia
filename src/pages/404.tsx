import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledPageNotFound = styled.div`
  --width: 100dvw;
  --max-width: 100dvw;
  --min-height: 100vh;
  --min-height-support: 100dvh;
  --padding: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.8)
    ),
    url('/images/ancient.jpg') no-repeat;
  background-size: cover;
  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  min-height: var(--min-height-support);
  padding: var(--padding);

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    background-position: center;
  }
`;

const Container = styled.div`
  --padding: 1.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: var(--padding);
  backdrop-filter: blur(calc(0.4rem + 0.2rem));
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
`;

const Message = styled.p`
  color: var(--clr-white);
  font-size: var(--font-size-md);
  text-align: center;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);

  code {
    color: var(--clr-sky-500);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-md) - 0.2rem);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-base);

    code {
      font-weight: 700;
    }
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: calc(var(--font-size-base) - 0.2rem);
  }

  @media screen and (max-width: 480px) {
    font-size: var(--font-size-sm);
  }
`;

const HomeButton = styled.button`
  --padding: 0.8rem 2.4rem;
  --padding-laptop: 0.4rem 1.6rem;

  outline: none;
  border: none;
  color: var(--clr-gray-200);
  background-color: var(--clr-gray-800);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  font-family: var(--font-fam-main);
  text-align: center;
  text-transform: capitalize;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  padding: var(--padding);
  box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: 0.35s;
  transition-timing-function: ease;

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    outline: 0.025rem solid var(--clr-sky-700);
  }

  &:hover {
    color: var(--clr-gray-300);
    background-color: var(--clr-gray-900);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
    padding: var(--padding-laptop);
  }
`;

function PageNotFound(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledPageNotFound>
      <Container>
        <Message>
          The current URL path that you just tried:&nbsp;
          <code>"{location.pathname}"</code>&nbsp;doesn't exist
        </Message>

        <HomeButton onClick={() => navigate('/', { replace: true })}>
          To home page
        </HomeButton>
      </Container>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
