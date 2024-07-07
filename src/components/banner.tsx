import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdPlay } from 'react-icons/io';
import { LuMoonStar, LuSun } from 'react-icons/lu';
import { FaRegMoon } from 'react-icons/fa';
import { FaDisplay } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import Tooltip from './tooltip';
import { useClickOutside } from '../hooks/useClickOutside';
import useLazyLoadBackground from '../hooks/useLazyLoadBackground';
import BackgroundPlaceholder from './backgroundPlaceholder';

type PropsTypes = {
  themeValue: string | boolean;
  setThemeValue: React.Dispatch<SetStateAction<string | boolean>>;
  startTheLevel: boolean;
  setStartTheLevel: React.Dispatch<SetStateAction<boolean>>;
};

type BackgroundTypes = {
  $backgroundPath: string;
};

//
const svgThemeStyles = {
  color: 'var(--clr-sky-200)',
};

const SBannerWrapper = styled.div`
  --width: 100%;
  --max-width: 100%;

  width: var(--width);
  max-width: var(--max-width);
`;

// Styles for the main component
const StyledBanner = styled.div<BackgroundTypes>`
  --max-width: 100%;
  --min-height: 44rem;
  --min-height-laptop-lg: 40rem;
  --min-height-laptop: 36rem;
  --min-height-tablet: 32rem;
  --min-height-mobile: 24rem;

  display: flex;
  background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.6)
    ),
    url(${(props) => props.$backgroundPath}) no-repeat;
  background-size: cover;
  background-position: center;
  max-width: var(--max-width);
  min-height: var(--min-height);
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
  transition: all 0.35s ease;

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

// Styles for the container that holds the play btn, level duration, theme buttons
const Details = styled.div`
  --width: 100%;
  --max-width: 100%;
  --padding: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  width: var(--width);
  max-width: var(--max-width);
  padding: var(--padding);
  background-color: transparent;
  backdrop-filter: blur(calc(0.4rem + 0.2rem));
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
`;

// Styles for the buttons that change the play button theme & app theme from light mode to dark mode
const SettingsButton = styled.button`
  --dimensions: 3.6rem;
  --dimensions-laptop-lg: 3.2rem;
  --dimensions-laptop: 2.8rem;
  --dimensions-tablet: 2.4rem;
  --dimensions-mobile: 2rem;
  --btn-bg: rgb(156, 163, 175);

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(156, 163, 175, 0.25);
  width: var(--dimensions);
  height: var(--dimensions);
  cursor: pointer;
  transition: background-color 0.35s ease;

  svg {
    color: var(--clr-gray-300);
    font-size: calc(var(--font-size-base) + 0.2rem);
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    background-color: rgba(156, 163, 175, 0.45);
  }

  &:hover {
    background-color: rgba(156, 163, 175, 0.45);
  }

  &:first-child {
    position: relative;
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    width: var(--dimensions-laptop-lg);
    height: var(--dimensions-laptop-lg);

    svg {
      font-size: var(--font-size-base);
    }
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    width: var(--dimensions-laptop);
    height: var(--dimensions-laptop);

    svg {
      font-size: calc(var(--font-size-base) - 0.2rem);
    }
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    width: var(--dimensions-tablet);
    height: var(--dimensions-tablet);
  }
`;

// Styles for the play button that starts the selected level
const PlayButton = styled.button`
  --height: 3.6rem;
  --height-laptop-lg: 3.2rem;
  --height-laptop: 2.8rem;
  --height-tablet: 2.4rem;
  --height-mobile: 2.2rem;
  --padding: 0 3.6rem;
  --padding-laptop-lg: 0 3.2rem;
  --padding-laptop: 0 2.8rem;
  --padding-tablet: 0 2.4rem;
  --padding-mobile: 0 2rem;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-gray-200);
  background: linear-gradient(
    to right bottom,
    var(--clr-green-300),
    var(--clr-green-700)
  );
  font-family: var(--font-fam-main);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-700);
  height: var(--height);
  padding: var(--padding);
  letter-spacing: var(--ltr-spacing-xs);
  cursor: pointer;
  transition: color 0.35s ease;

  svg {
    color: var(--clr-gray-200);
    transition: color 0.35s ease;
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    color: var(--clr-white);

    svg {
      color: var(--clr-white);
    }
  }

  &:not([disabled]):hover {
    color: var(--clr-white);

    svg {
      color: var(--clr-white);
    }
  }

  &:disabled {
    background: linear-gradient(
      to right bottom,
      var(--clr-gray-300),
      var(--clr-gray-700)
    );
    cursor: default;
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-base) - 0.2rem);
    letter-spacing: var(--ltr-spacing-sm);
    height: var(--height-laptop-lg);
    padding: var(--padding-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
    height: var(--height-laptop);
    padding: var(--padding-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    letter-spacing: var(--ltr-spacing-xs);
    height: var(--height-tablet);
    padding: var(--padding-tablet);
  }

  @media screen and (max-width: 480px) {
    height: var(--height-mobile);
    padding: var(--padding-mobile);
  }
`;

const ThemeMenu = styled.div`
  --width: calc(16rem + 2rem);
  --width-laptop-lg: calc(16rem + 1.6rem);
  --width-laptop: calc(16rem + 1.2rem);
  --width-tablet: calc(16rem + 0.8rem);
  --width-mobile: calc(16rem + 0.4rem);
  --min-height: auto;
  --padding: 1.2rem 0;
  --margin-top: 1.2rem;

  display: flex;
  flex-direction: column;
  gap: calc(0.4rem + 0.2rem);
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--clr-gray-700);
  width: var(--width);
  min-height: var(--min-height);
  padding: var(--padding);
  margin-top: var(--margin-top);
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
  z-index: 100;

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    width: var(--width-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    width: var(--width-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    width: var(--width-tablet);
  }

  @media screen and (max-width: 480px) {
    width: var(--width-mobile);
  }
`;

const ThemeOption = styled.button`
  --max-width: 100%;
  --padding: calc(0.4rem + 0.2rem) 0 calc(0.4rem + 0.2rem) 1.2rem;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  color: var(--clr-gray-300);
  background-color: transparent;
  font-size: var(--font-size-base);
  font-family: var(--font-fam-main);
  font-weight: var(--font-weight-500);
  max-width: var(--max-width);
  padding: var(--padding);
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  cursor: pointer;
  transition: all 0.35s ease;

  svg {
    color: var(--clr-white);
    font-size: calc(var(--font-size-base) + 0.2rem);
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    background-color: var(--clr-gray-400);
  }

  &:hover {
    background-color: var(--clr-gray-400);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-base) - 0.2rem);

    svg {
      font-size: var(--font-size-base);
    }
  }
`;

function Banner({
  themeValue,
  setThemeValue,
  startTheLevel,
  setStartTheLevel,
}: PropsTypes): React.ReactElement {
  const backgorundImage = '/images/ancient.jpg';
  const { isBackgroundLoaded, observedElement } = useLazyLoadBackground({
    backgroundPath: backgorundImage,
    threshold: 0.5,
  });
  const { levelName } = useParams<{ levelName: string }>();
  const [themeMenu, setThemeMenu] = useState<boolean>(false);
  const menuRef = useClickOutside(() => {
    setThemeMenu(false);
  });

  function handleThemeMenu(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setThemeMenu((themeMenu) => !themeMenu);
  }

  function handleChangeTheme(value: string | boolean) {
    setThemeValue(value);
  }

  function handleStartLevel() {
    setStartTheLevel(true);
  }

  useEffect(() => {
    if (!levelName) setStartTheLevel(false);
  }, [levelName, setStartTheLevel]);

  return (
    <SBannerWrapper ref={observedElement}>
      {isBackgroundLoaded ? (
        <StyledBanner $backgroundPath={backgorundImage}>
          <Details>
            <PlayButton
              onClick={handleStartLevel}
              disabled={!levelName || startTheLevel}
            >
              {startTheLevel ? (
                'In progress...'
              ) : (
                <>
                  <IoMdPlay />
                  &nbsp;Play
                </>
              )}
            </PlayButton>

            <Tooltip tooltip={'Change app theme'}>
              <SettingsButton onClick={handleThemeMenu}>
                <LuMoonStar />
              </SettingsButton>

              <ThemeMenu
                ref={menuRef}
                className={themeMenu ? 'menu-visible' : 'menu-hidden'}
              >
                <ThemeOption
                  style={{
                    color:
                      themeValue === 'light-mode' ? 'var(--clr-sky-300)' : '',
                  }}
                  onClick={() => handleChangeTheme('light-mode')}
                >
                  <LuSun
                    style={themeValue === 'light-mode' ? svgThemeStyles : {}}
                  />
                  Light
                </ThemeOption>

                <ThemeOption
                  style={{
                    color:
                      themeValue === 'dark-mode' ? 'var(--clr-sky-300)' : '',
                  }}
                  onClick={() => handleChangeTheme('dark-mode')}
                >
                  <FaRegMoon
                    style={themeValue === 'dark-mode' ? svgThemeStyles : {}}
                  />
                  Dark
                </ThemeOption>

                <ThemeOption
                  style={{
                    color:
                      themeValue ===
                      window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'var(--clr-sky-300)'
                        : '',
                  }}
                  onClick={() =>
                    handleChangeTheme(
                      window.matchMedia('(prefers-color-scheme: dark)').matches
                    )
                  }
                >
                  <FaDisplay
                    style={
                      themeValue ===
                      window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? svgThemeStyles
                        : {}
                    }
                  />
                  System
                </ThemeOption>
              </ThemeMenu>
            </Tooltip>
          </Details>
        </StyledBanner>
      ) : (
        <BackgroundPlaceholder
          height='100%'
          minHeight='44rem'
          laptopBigHeight='40rem'
          laptopHeight='36rem'
          tabletHeight='32rem'
          mobileHeight='24rem'
        />
      )}
    </SBannerWrapper>
  );
}

export default Banner;
