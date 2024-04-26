import React, { SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { levelsData } from '../data';

import styled from 'styled-components';

type PropTypes = {
  userPoints: number;
  setUserPoints: React.Dispatch<SetStateAction<number>>;
};

const StyledFinishScreen = styled.div`
  --width: 100%;
  --max-width: 100%;
  --min-height: calc(100dvh - (1.2rem * 2) - 44rem);
  --min-height-laptop-lg: calc(100dvh - (1.2rem * 2) - 40rem);
  --min-height-laptop: calc(100dvh - (1.2rem * 2) - 36rem);
  --min-height-tablet: calc(100dvh - (1.2rem * 2) - 32rem - 5.6rem);
  --min-height-mobile: calc(100dvh - (1.2rem * 2) - 24rem - 5.6rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  background-color: var(--clr-gray-700);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    min-height: var(--min-height-laptop-lg);
    gap: 2.4rem;
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    min-height: var(--min-height-laptop);
    gap: 2rem;
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    min-height: var(--min-height-tablet);
    gap: 1.8rem;
  }

  @media screen and (max-width: 480px) {
    min-height: var(--min-height-mobile);
    gap: 1.6rem;
  }
`;

const Wrapper = styled.div`
  --width: 100%;
  --max-width: 100%;

  display: flex;
  width: var(--width);
  max-width: var(--max-width);
`;

const Score = styled.h1`
  --max-width-tablet: 36rem;
  --max-width-mobile: 32rem;

  color: var(--clr-sky-300);
  font-size: var(--font-size-md);
  text-align: center;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-md) - 0.2rem);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-base);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: calc(var(--font-size-base) - 0.2rem);
    max-width: var(--max-width-tablet);
  }

  @media screen and (max-width: 480px) {
    font-size: var(--font-size-sm);
    max-width: var(--max-width-mobile);
  }
`;

const Exit = styled.button`
  --width: 100%;
  --max-width: 24rem;
  --max-width-laptop-lg: 22rem;
  --max-width-laptop: 20rem;
  --max-width-tablet: 18rem;
  --max-width-mobile: 16rem;
  --min-height: calc(3.2rem + (0.4rem * 2));
  --min-height-laptop-lg: calc(2.8rem + (0.4rem * 2));
  --min-height-tablet: calc(2.4rem + (0.4rem * 2));
  --padding: 0.4rem 0;

  outline: none;
  border: none;
  color: var(--clr-gray-200);
  background-color: var(--clr-gray-800);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  font-family: var(--font-fam-main);
  text-align: center;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  padding: var(--padding);
  cursor: pointer;
  box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.25);
  transition: transform 0.35s ease;

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    outline: 0.025rem solid var(--clr-sky-700);
  }

  &:hover {
    transform: translateY(-0.4rem);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    max-width: var(--max-width-laptop-lg);
    min-height: var(--min-height-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    max-width: var(--max-width-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    max-width: var(--max-width-tablet);
    min-height: var(--min-height-tablet);
    font-size: var(--font-size-sm);
  }

  @media screen and (max-width: 480px) {
    max-width: var(--max-width-mobile);
  }
`;

function FinishScreen({
  userPoints,
  setUserPoints,
}: PropTypes): React.ReactElement {
  const navigate = useNavigate();
  const { levelName } = useParams<{ levelName: string }>();

  const questions = levelName ? levelsData[levelName] : [];

  // find and calculate the right amount of points for the current level
  let totalPointsPerLevel = 0;
  questions.forEach((question) => (totalPointsPerLevel += question.points));

  // looking for what percentage you got from the total score
  const percentage = Math.floor((userPoints / totalPointsPerLevel) * 100);

  return (
    <Wrapper>
      <StyledFinishScreen>
        <Score>
          You have completed {percentage}% of the questions of this level
        </Score>

        <Exit
          onClick={() => {
            navigate('/select-level', { replace: true });
            setUserPoints(0);
          }}
        >
          Try another level
        </Exit>
      </StyledFinishScreen>
    </Wrapper>
  );
}

export default FinishScreen;
