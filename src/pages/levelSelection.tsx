import React, { SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Banner from '../components/banner';

type PropsTypes = {
  startTheLevel: boolean;
  setStartTheLevel: React.Dispatch<SetStateAction<boolean>>;
};

const StyledLevelSelection = styled.main`
  --width: 100%;
  --min-height: 100vh;
  --min-height-support: 100dvh;
  --padding: 1.2rem;

  display: flex;
  gap: 1.2rem;
  background-color: var(--clr-gray-800);
  width: var(--width);
  min-height: var(--min-height);
  min-height: var(--min-height-support);
  padding: var(--padding);

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    flex-direction: column;
    gap: 0;
  }
`;

const Main = styled.div`
  --width: 100%;
  --max-width: calc(100dvw - 1.2rem - 24rem - 1.2rem - 1.2rem);
  --max-width-laptop-lg: calc(100dvw - 1.2rem - 20rem - 1.2rem - 1.2rem);
  --max-width-laptop: calc(100dvw - 1.2rem - 18rem - 1.2rem - 1.2rem);
  --max-width-tablet: 100%;
  --min-height: calc(100dvh - (1.2rem * 2));
  --min-height-tablet: calc(100dvh - (1.2rem * 2) - 5.6rem);

  display: flex;
  flex-direction: column;
  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  background-color: transparent;

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
`;

const Aside = styled.div`
  --max-width: 100%;
  --min-height: calc(100dvh - (1.2rem * 2) - 44rem);

  display: flex;
  max-width: var(--max-width);
  min-height: var(--min-height);
`;

function LevelSelection({
  startTheLevel,
  setStartTheLevel,
}: PropsTypes): React.ReactElement {
  const [themeValue, setThemeValue] = useState<string | boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const theme =
    themeValue === window.matchMedia('(prefers-color-scheme: dark)').matches ||
    themeValue === 'dark-mode'
      ? 'dark-mode'
      : 'light-mode';

  return (
    <StyledLevelSelection className={theme}>
      <Sidebar />

      <Main>
        <Banner
          themeValue={themeValue}
          setThemeValue={setThemeValue}
          startTheLevel={startTheLevel}
          setStartTheLevel={setStartTheLevel}
        />

        <Aside
          style={
            startTheLevel
              ? { alignItems: 'center', justifyContent: 'center' }
              : {
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '1.2rem',
                }
          }
        >
          <Outlet />
        </Aside>
      </Main>
    </StyledLevelSelection>
  );
}

export default LevelSelection;
