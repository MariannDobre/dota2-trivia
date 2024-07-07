import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLazyLoadBackground from '../hooks/useLazyLoadBackground';
import styled from 'styled-components';
import BackgroundPlaceholder from '../components/backgroundPlaceholder';

type BackgroundTypes = {
  $backgroundPath: string;
};

const SHomeWrapper = styled.div`
  --width: 100dvw;
  --max-width: 100dvw;
  --height: 100vh;

  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);
`;

const StyledHome = styled.div<BackgroundTypes>`
  --width: 100%;
  --max-width: 100%;
  --height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.8)
    ),
    url(${(props) => props.$backgroundPath}) no-repeat;
  background-size: cover;
  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    background-position: center;
  }
`;

const Body = styled.header`
  --width: 100%;
  --max-width: 68rem;
  --padding-mobile: 1.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--width);
  max-width: var(--max-width);

  @media (max-width: 768px) {
    padding: var(--padding-mobile);
  }
`;

const Heading = styled.h6`
  --line-height-default: 1;
  --line-height-mobile: 1.3;

  color: var(--clr-gray-200);
  font-size: calc(var(--font-size-3xl) + 0.8rem);
  line-height: var(--line-height);
  text-align: center;
  letter-spacing: var(--ltr-spacing-sm);
  word-spacing: var(--word-spacing-xs);
  text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: var(--font-size-3xl);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-2xl);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-mobile);
  }

  @media screen and (max-width: 480px) {
    font-size: var(--font-size-lg);
  }
`;

const SubHeading = styled.p`
  --line-height: 1.4;
  --margin-top: 0.8rem;

  color: var(--clr-gray-300);
  font-size: calc(var(--font-size-md) + 0.2rem);
  font-weight: var(--font-weight-200);
  line-height: var(--line-height);
  margin-top: var(--margin-top);
  letter-spacing: var(--ltr-spacing-sm);
  word-spacing: var(--word-spacing-xs);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: var(--font-size-md);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: calc(var(--font-size-base) + 0.2rem);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: var(--font-size-base);
  }

  @media screen and (max-width: 480px) {
    font-size: calc(var(--font-size-base) - 0.2rem);
  }
`;

const StartButton = styled.button`
  --bg-btn: #010209;
  --clr-btn: #ea580c;
  --hover-bg: #270d02;
  --hover-clr: #ce673d;
  --margin-top: 2.8rem;
  --margin-top-laptop-lg: 2.4rem;
  --margin-top-laptop: 2rem;
  --padding-btn: 0.8rem 3.6rem;
  --padding-laptop-lg: 0.6rem 3.2rem;
  --padding-laptop: 0.6rem 2.8rem;

  outline: none;
  border: none;
  color: var(--clr-btn);
  background-color: var(--bg-btn);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  font-family: var(--font-fam-main);
  margin-top: var(--margin-top);
  padding: var(--padding-btn);
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  filter: drop-shadow(0 0 0.8rem #000);
  cursor: pointer;
  transition: all 0.35s ease;

  &:focus {
    outline: none;
    border: none;
  }

  &:active {
    transform: translateY(0.2rem);
  }

  &:focus-visible {
    color: var(--hover-clr);
    background-color: var(--hover-bg);
  }

  &:hover {
    color: var(--hover-clr);
    background-color: var(--hover-bg);
    filter: drop-shadow(0 0 1.2rem #000);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    padding: var(--padding-laptop-lg);
    margin-top: var(--margin-top-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
    padding: var(--padding-laptop);
    margin-top: var(--margin-top-laptop);
  }
`;

function Home(): React.ReactElement {
  const backgroundImage = '/images/home.jpg';
  const navigate = useNavigate();
  const { isBackgroundLoaded, observedElement } = useLazyLoadBackground({
    backgroundPath: backgroundImage,
    threshold: 0.5,
  });

  return (
    <SHomeWrapper ref={observedElement}>
      {isBackgroundLoaded ? (
        <StyledHome $backgroundPath={backgroundImage}>
          <Body>
            <Heading>Are you a true fan of dota?</Heading>

            <SubHeading>"From players to players"</SubHeading>

            <StartButton onClick={() => navigate('/select-level')}>
              Prove it
            </StartButton>
          </Body>
        </StyledHome>
      ) : (
        <BackgroundPlaceholder height='100vh' />
      )}
    </SHomeWrapper>
  );
}

export default Home;
