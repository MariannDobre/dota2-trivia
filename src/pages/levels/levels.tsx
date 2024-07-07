import React, { SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { levelsData } from '../../data';

import styled from 'styled-components';
import { FaClock, FaCheck, FaMedal } from 'react-icons/fa6';
import { HiPuzzle } from 'react-icons/hi';
import { RxExit } from 'react-icons/rx';
import { LuTimerReset } from 'react-icons/lu';
import { IoReturnDownForwardSharp } from 'react-icons/io5';
import { FaRegChartBar } from 'react-icons/fa';
import { PiArrowUUpLeftBold } from 'react-icons/pi';
import { MdOutlineTimer } from 'react-icons/md';

import Tooltip from '../../components/tooltip';

type PropsTypes = {
  startTheLevel: boolean;
  setStartTheLevel: React.Dispatch<SetStateAction<boolean>>;
  userPoints: number;
  setUserPoints: React.Dispatch<SetStateAction<number>>;
};

const StyledLevels = styled.main`
  --width: 100%;
  --max-width: 100%;

  display: flex;
  width: var(--width);
  max-width: var(--max-width);
`;

// Styles and components for the selected level state
const SelectedLevelUI = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const Details = styled.p`
  --padding: 1.2rem;
  --padding-laptop-lg: 1rem;
  --padding-laptop: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--clr-gray-300);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  text-transform: capitalize;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  background-color: var(--clr-gray-700);
  padding: var(--padding);
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clr-white);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-700);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    padding: var(--padding-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
    padding: var(--padding-laptop);

    span {
      font-size: calc(var(--font-size-base) - 0.2rem);
    }
  }

  @media screen and (max-width: 480px) {
    font-size: calc(var(--font-size-sm) - 0.2rem);

    span {
      font-size: var(--font-size-sm);
    }
  }
`;

const ChooseAnotherLevel = styled.button`
  --padding: 1.2rem;
  --padding-laptop-lg: 1rem;
  --padding-laptop: 0.8rem;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-white);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  font-weight: var(--font-weight-700);
  text-transform: capitalize;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  background-color: var(--clr-sky-700);
  padding: var(--padding);
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.35s ease;

  svg {
    font-size: var(--font-size-base);
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    background-color: var(--clr-sky-500);
  }

  &:hover {
    background-color: var(--clr-sky-500);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    padding: var(--padding-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
    padding: var(--padding-laptop);

    svg {
      font-size: calc(var(--font-size-base) - 0.2rem);
    }
  }

  @media screen and (max-width: 480px) {
    font-size: calc(var(--font-size-sm) - 0.2rem);

    svg {
      font-size: var(--font-size-sm);
    }
  }
`;

// Styles and components for level gameplay
const LevelUI = styled.div`
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
  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  background-color: var(--clr-gray-700);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    min-height: var(--min-height-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    min-height: var(--min-height-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    min-height: var(--min-height-tablet);
  }

  @media screen and (max-width: 480px) {
    min-height: var(--min-height-mobile);
  }
`;

const AnswersContainer = styled.div`
  --width: 100%;
  --max-width: calc(64rem + 1.6rem);
  --max-width-laptop-lg: calc(56rem + 1.6rem);
  --max-width-laptop: calc(48rem + 1.6rem);
  --max-width-tablet: calc(40rem + 1.2rem);
  --max-width-mobile: calc(32rem + 1.2rem);
  --margin-top: 1.6rem;
  --margin-top-tablet: 1.2rem;

  display: grid;
  grid-template-columns: repeat(2, 32rem);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1.6rem;
  width: var(--width);
  max-width: var(--max-width);
  margin-top: var(--margin-top);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    max-width: var(--max-width-laptop-lg);
    grid-template-columns: repeat(2, 28rem);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    max-width: var(--max-width-laptop);
    grid-template-columns: repeat(2, 24rem);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    max-width: var(--max-width-tablet);
    grid-template-columns: repeat(2, 20rem);
    grid-gap: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    max-width: var(--max-width-mobile);
    grid-template-columns: repeat(2, 16rem);
  }
`;

const ButtonsContainer = styled.div`
  --margin-top: 2.8rem;
  --margin-top-laptop-lg: 2.4rem;
  --margin-top-laptop: 2rem;
  --margin-top-tablet: 1.8rem;
  --margin-top-mobile: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-top: var(--margin-top);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    margin-top: var(--margin-top-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    margin-top: var(--margin-top-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    margin-top: var(--margin-top-tablet);
  }

  @media screen and (max-width: 480px) {
    margin-top: var(--margin-top-mobile);
  }
`;

const ProgressBar = styled.progress`
  --width: 100%;
  --max-width: 36rem;
  --max-width-laptop-lg: 34rem;
  --max-width-laptop: 32rem;
  --max-width-tablet: 30rem;
  --max-width-mobile: 28rem;
  --min-height: 1.2rem;
  --min-height-laptop: 1rem;
  --min-height-tablet: 0.8rem;
  --brd-radius: 4rem;

  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  background-color: var(--clr-gray-800);
  border-radius: var(--brd-radius);
  box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.25);
  transition: width 0.35s ease;
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-progress-bar {
    background-color: var(--clr-gray-800);
    border-radius: var(--brd-radius);
    transition: width 0.35s ease;
  }

  &::-webkit-progress-value {
    background-color: var(--clr-sky-500);
    border-radius: var(--brd-radius);
    transition: width 0.35s ease;
  }

  &::-moz-progress-bar {
    background-color: var(--clr-sky-500);
    border-radius: var(--brd-radius);
    box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.25);
    transition: width 0.35s ease;
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    max-width: var(--max-width-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    max-width: var(--max-width-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    max-width: var(--max-width-tablet);
    min-height: var(--min-height-tablet);
  }

  @media screen and (max-width: 480px) {
    max-width: var(--max-width-mobile);
  }
`;

const QuestionDetails = styled.div`
  --width: 100%;
  --max-width: 36rem;
  --max-width-laptop-lg: 34rem;
  --max-width-laptop: 32rem;
  --max-width-tablet: 30rem;
  --max-width-mobile: 28rem;
  --margin-top: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--width);
  max-width: var(--max-width);
  margin-top: var(--margin-top);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    max-width: var(--max-width-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    max-width: var(--max-width-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    max-width: var(--max-width-tablet);
  }

  @media screen and (max-width: 480px) {
    max-width: var(--max-width-mobile);
  }
`;

const CurrentQuestion = styled.p`
  color: var(--clr-gray-200);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  letter-spacing: var(--ltr-spacing-xs);

  strong {
    color: var(--clr-sky-500);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: var(--font-size-sm);
  }
`;

const UserPoints = styled.p`
  color: var(--clr-gray-200);
  font-size: calc(var(--font-size-sm) + 0.2rem);
  letter-spacing: var(--ltr-spacing-xs);

  strong {
    color: var(--clr-sky-500);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: var(--font-size-sm);
  }
`;

const Question = styled.h1`
  --max-width-tablet: 36rem;
  --max-width-mobile: 32rem;
  --margin-top: 2.8rem;
  --margin-top-laptop-lg: 2.4rem;
  --margin-top-laptop: 2rem;
  --margin-top-tablet: 1.8rem;
  --margin-top-mobile: 1.6rem;

  color: var(--clr-sky-300);
  font-size: var(--font-size-md);
  text-align: center;
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  margin-top: var(--margin-top);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-base) + 0.2rem);
    margin-top: var(--margin-top-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-base);
    margin-top: var(--margin-top-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: calc(var(--font-size-sm) + 0.2rem);
    max-width: var(--max-width-tablet);
    margin-top: var(--margin-top-tablet);
  }

  @media screen and (max-width: 480px) {
    max-width: var(--max-width-mobile);
    margin-top: var(--margin-top-mobile);
  }
`;

const Timer = styled.p`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-gray-900);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-700);
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  cursor: default;
  transition: all 0.35s ease;

  svg {
    color: var(--clr-gray-900);
    font-size: calc(var(--font-size-md) + 0.2rem);
  }

  span {
    color: var(--clr-gray-200);
    font-size: calc(var(--font-size-base) - 0.2rem);
    font-weight: var(--font-weight-500);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-base) - 0.2rem);

    svg {
      font-size: var(--font-size-md);
    }

    span {
      font-size: var(--font-size-sm);
    }
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    svg {
      font-size: calc(var(--font-size-md) - 0.2rem);
    }
  }
`;

const Options = styled.button`
  --width: 100%;
  --max-width: 32rem;
  --max-width-laptop-lg: 28rem;
  --max-width-laptop: 24rem;
  --max-width-tablet: 20rem;
  --max-width-mobile: 16rem;
  --min-height: calc(3.6rem + (0.4rem * 2));
  --min-height-laptop-lg: calc(3.2rem + (0.4rem * 2));
  --min-height-laptop: calc(2.8rem + (0.4rem * 2));
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
  transition-property: transform, box-shadow, color, background-color, filter;
  transition-duration: 0.35s;
  transition-timing-function: ease;

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    outline: 0.025rem solid var(--clr-sky-700);
  }

  &:nth-child(2n + 1):not([disabled]):hover {
    transform: translateX(-0.6rem);
    box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.35);
  }

  &:nth-child(2n):not([disabled]):hover {
    transform: translateX(0.6rem);
    box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.35);
  }

  &:disabled {
    cursor: default;
    color: var(--clr-gray-700);
    background-color: var(--clr-gray-300);
    filter: grayscale(45%);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    max-width: var(--max-width-laptop-lg);
    min-height: var(--min-height-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    max-width: var(--max-width-laptop);
    min-height: var(--min-height-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    font-size: var(--font-size-sm);
    max-width: var(--max-width-tablet);
    min-height: var(--min-height-tablet);
    letter-spacing: normal;
  }

  @media screen and (max-width: 480px) {
    max-width: var(--max-width-mobile);
  }
`;

const ActionButton = styled.button`
  --padding: 1.2rem;
  --padding-tablet: 0.8rem;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-white);
  background-color: var(--clr-sky-400);
  padding: var(--padding);
  border-radius: 100%;
  box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.35s ease;

  svg {
    font-size: var(--font-size-md);
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    background-color: var(--clr-gray-800);
  }

  &:hover {
    background-color: var(--clr-sky-500);
  }

  &:disabled {
    background-color: var(--clr-gray-400);
    cursor: not-allowed;
  }

  &:disabled:hover {
    background-color: var(--clr-gray-500);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    svg {
      font-size: calc(var(--font-size-md) - 0.2rem);
    }
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    padding: var(--padding-tablet);

    svg {
      font-size: var(--font-size-base);
    }
  }

  @media screen and (max-width: 480px) {
    svg {
      font-size: calc(var(--font-size-base) - 0.2rem);
    }
  }
`;

function Levels({
  startTheLevel,
  setStartTheLevel,
  userPoints,
  setUserPoints,
}: PropsTypes): React.ReactElement {
  // initializing the needed hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { levelName } = useParams<{ levelName: string }>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);

  // derived state
  const questions = levelName ? levelsData[levelName] : [];
  const totalQuestions = questions?.length;
  const lastQuestion = questions?.length - 1;
  const answers = questions[currentQuestion]?.answers;
  const wasAnAnswer = answer !== null;
  const correctAnswer = questions[currentQuestion]?.correctAnswer;

  // find and calculate the right amount of points for each level
  let totalPointsPerLevel = 0;
  questions.forEach((question) => (totalPointsPerLevel += question.points));

  // find and calculate the right amount of seconds for each level
  let totalSecondsPerLevel = 0;
  questions.forEach(
    (question) => (totalSecondsPerLevel += question.secondsPerQuestion)
  );
  const [timer, setTimer] = useState(totalSecondsPerLevel);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`;

  useEffect(() => {
    if (!location.pathname.includes('levelName')) {
      setUserPoints(0);
    }
  }, [location.pathname, setUserPoints]);

  useEffect(() => {
    if (startTheLevel) {
      const timerID = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            navigate(`/select-level/${levelName}/results`, {
              replace: true,
            });
          }
          return prevTime;
        });
      }, 1000);

      return () => clearInterval(timerID);
    }
  }, [levelName, startTheLevel, timer, navigate]);

  // handlers
  function handleNextQuestion() {
    if (currentQuestion === lastQuestion) return;
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setAnswer(null);
  }

  function handleExitCurrentLevel() {
    setStartTheLevel(false);
    setCurrentQuestion(0);
    setUserPoints(0);
    navigate('/select-level');
  }

  function handleResetCurrentLevel() {
    setCurrentQuestion(0);
    setUserPoints(0);
    setAnswer(null);
    setTimer(totalSecondsPerLevel);
  }

  return (
    <StyledLevels
      style={
        startTheLevel
          ? { alignItems: 'center', justifyContent: 'center' }
          : { alignItems: 'flex-start', justifyContent: 'flex-start' }
      }
    >
      {startTheLevel ? (
        <LevelUI>
          <Timer>
            <MdOutlineTimer />
            &nbsp;Time left:&nbsp;
            <span>{formattedTime}</span>
          </Timer>

          <ProgressBar
            max={totalQuestions}
            value={currentQuestion + 1}
          />

          <QuestionDetails>
            <CurrentQuestion>
              {currentQuestion + 1}&nbsp;/&nbsp;
              <strong>{totalQuestions}</strong>
            </CurrentQuestion>

            <UserPoints>
              Points:&nbsp;{userPoints}&nbsp;/&nbsp;
              <strong>{totalPointsPerLevel}</strong>
            </UserPoints>
          </QuestionDetails>

          <Question>{questions[currentQuestion]?.question}</Question>

          <AnswersContainer>
            {answers.map((answerOption, index) => (
              <Options
                className={
                  wasAnAnswer && index === answer ? 'selected-answer' : ''
                }
                style={{
                  color:
                    wasAnAnswer && index === correctAnswer
                      ? 'var(--clr-white)'
                      : wasAnAnswer && index === answer
                      ? 'var(--clr-sky-500)'
                      : '',
                  backgroundColor:
                    wasAnAnswer && index === correctAnswer
                      ? 'var(--clr-sky-400)'
                      : '',
                }}
                key={index}
                onClick={() => {
                  setAnswer(index);
                  if (index === correctAnswer) {
                    setUserPoints(
                      (prevPoints) =>
                        prevPoints + questions[currentQuestion]?.points
                    );
                  }
                }}
                disabled={wasAnAnswer}
              >
                {answerOption}
              </Options>
            ))}
          </AnswersContainer>

          <ButtonsContainer>
            <Tooltip tooltip='Next question'>
              <ActionButton
                onClick={handleNextQuestion}
                disabled={currentQuestion === lastQuestion || !wasAnAnswer}
              >
                <IoReturnDownForwardSharp />
              </ActionButton>
            </Tooltip>

            <Tooltip tooltip='Leave current level'>
              <ActionButton onClick={handleExitCurrentLevel}>
                <RxExit />
              </ActionButton>
            </Tooltip>

            <Tooltip tooltip='Reset current level'>
              <ActionButton onClick={handleResetCurrentLevel}>
                <LuTimerReset />
              </ActionButton>
            </Tooltip>

            {currentQuestion === lastQuestion && wasAnAnswer && (
              <Tooltip tooltip='Check results'>
                <ActionButton
                  onClick={() =>
                    navigate(`/select-level/${levelName}/results`, {
                      replace: true,
                    })
                  }
                >
                  <FaRegChartBar />
                </ActionButton>
              </Tooltip>
            )}
          </ButtonsContainer>
        </LevelUI>
      ) : (
        <SelectedLevelUI>
          <Details>
            <span>
              <HiPuzzle />
              &nbsp;Level:
            </span>
            {levelName}
          </Details>

          <Details>
            <span>
              <FaClock />
              &nbsp;Duration:
            </span>
            {formattedTime}&nbsp;minutes
          </Details>

          <Details>
            <span>
              <FaCheck />
              &nbsp;Up-to-date:
            </span>
            synced with patch 7.36C
          </Details>

          <Details>
            <span>
              <FaMedal />
              &nbsp;Questions:
            </span>
            {totalQuestions}
          </Details>

          <ChooseAnotherLevel onClick={() => navigate(-1)}>
            <PiArrowUUpLeftBold />
            &nbsp;go back
          </ChooseAnotherLevel>
        </SelectedLevelUI>
      )}
    </StyledLevels>
  );
}

export default Levels;
