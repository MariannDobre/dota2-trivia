import React, { useRef } from 'react';
import styled from 'styled-components';
import SearchLevel from './searchLevel';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';

type ButtonsTypes = {
  id: number;
  value: string;
  image: string;
  imageAlt: string;
};

export const items: ButtonsTypes[] = [
  {
    id: 1,
    value: 'herald',
    image: '/images/herald-removebg.png',
    imageAlt: 'Herald icon',
  },
  {
    id: 2,
    value: 'guardian',
    image: '/images/guardian-removebg.png',
    imageAlt: 'guardian icon',
  },
  {
    id: 3,
    value: 'crusader',
    image: '/images/crusader-removebg.png',
    imageAlt: 'crusader icon',
  },
  {
    id: 4,
    value: 'archon',
    image: '/images/archon-removebg.png',
    imageAlt: 'archon icon',
  },
  {
    id: 5,
    value: 'legend',
    image: '/images/legend-removebg.png',
    imageAlt: 'legend icon',
  },
  {
    id: 6,
    value: 'ancient',
    image: '/images/ancient-removebg.png',
    imageAlt: 'ancient icon',
  },
  {
    id: 7,
    value: 'divine',
    image: '/images/divine-removebg.png',
    imageAlt: 'divine icon',
  },
  {
    id: 8,
    value: 'immortal',
    image: '/images/immortal-removebg.png',
    imageAlt: 'immortal icon',
  },
  {
    id: 9,
    value: 'leaderboard',
    image: '/images/topimmortal-removebg.png',
    imageAlt: 'leaderboard icon',
  },
];

const StyledSidebar = styled.nav`
  --width: 100%;
  --max-width: 24rem;
  --max-width-laptop-lg: 20rem;
  --max-width-laptop: 18rem;
  --max-width-tablet: 100%;
  --min-height: calc(100dvh - (1.2rem * 2));
  --min-height-tablet: auto;
  --padding: 1.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: var(--clr-gray-700);
  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--min-height);
  padding: var(--padding);
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
  position: relative;
  transition: all 0.35s ease;

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    max-width: var(--max-width-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    max-width: var(--max-width-laptop);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    max-width: var(--max-width-tablet);
    min-height: var(--min-height-tablet);
    gap: 0;
  }
`;

const SearchContainer = styled.div`
  --width: 100%;
  --max-width: 100%;
  --height: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--max-width);
  max-width: var(--max-width);
  height: var(--height);
  background-color: var(--clr-gray-800);
`;

const NavMenuButton = styled.button`
  --padding: 0.6rem 0.4rem;

  outline: none;
  border: none;
  display: none;
  height: 100%;
  background-color: transparent;
  padding: var(--padding);
  cursor: pointer;

  svg {
    color: var(--clr-gray-200);
    font-size: var(--font-size-md);
    transition: all 0.35s ease;
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    outline: 0.025rem solid var(--clr-sky-700);
  }

  &:active {
    svg {
      color: var(--clr-sky-700);
    }
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ListItems = styled.li`
  --max-width: calc(24rem - (2 * 1.2rem));
  --max-width-laptop-lg: calc(20rem - (2 * 1.2rem));
  --max-width-laptop: calc(18rem - (2 * 1.2rem));

  max-width: var(--max-width);

  &:hover > button {
    background-color: var(--clr-gray-800);
    box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    width: var(--max-width-laptop-lg);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    width: var(--max-width-laptop);
  }
`;

const Item = styled.button`
  --width: 100%;
  --max-width: calc(24rem - (2 * 1.2rem));
  --max-width-laptop-lg: calc(20rem - (2 * 1.2rem));
  --max-width-laptop: calc(18rem - (2 * 1.2rem));
  --padding: 0.4rem 1.6rem;
  --padding-laptop-lg: 0.4rem 0.8rem;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: var(--width);
  max-width: var(--max-width);
  color: var(--clr-white);
  background-color: transparent;
  font-size: var(--font-size-base);
  font-family: var(--font-fam-main);
  text-transform: capitalize;
  padding: var(--padding);
  letter-spacing: var(--ltr-spacing-xs);
  cursor: pointer;
  transition: all 0.35s ease;

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    background-color: var(--clr-gray-800);
    box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  &:disabled {
    color: var(--clr-gray-300);

    img {
      filter: grayscale(100%);
    }
  }

  img {
    --icon-dimensions: 4.4rem;
    --icon-dimensions-laptop-lg: 3.8rem;
    --icon-dimensions-laptop: 3.2rem;
    --icon-dimensions-tablet: 2.8rem;
    --icon-dimensions-mobile: 2.4rem;

    width: var(--icon-dimensions);
    height: var(--icon-dimensions);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-base) - 0.2rem);
    max-width: var(--max-width-laptop-lg);
    padding: var(--padding-laptop-lg);

    img {
      width: var(--icon-dimensions-laptop-lg);
      height: var(--icon-dimensions-laptop-lg);
    }
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
    max-width: var(--max-width-laptop);

    img {
      width: var(--icon-dimensions-laptop);
      height: var(--icon-dimensions-laptop);
    }
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    img {
      width: var(--icon-dimensions-tablet);
      height: var(--icon-dimensions-tablet);
    }
  }

  @media screen and (max-width: 480px) {
    img {
      width: var(--icon-dimensions-mobile);
      height: var(--icon-dimensions-mobile);
    }
  }
`;

function Sidebar(): React.ReactElement {
  const navigate = useNavigate();
  const { levelName } = useParams<{ levelName: string }>();
  const [searchParams, setSearchParams]: [
    URLSearchParams,
    React.Dispatch<React.SetStateAction<URLSearchParams>>
  ] = useSearchParams({ q: '' });
  const navRef = useRef<HTMLUListElement>(null);

  const query: string | null = searchParams.get('q');
  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes((query ?? '').toLowerCase())
  );

  function handleNavigate(value: string) {
    navigate(`/select-level/${value}`);
  }

  function handleShowNavMenu() {
    navRef.current?.classList.toggle('nav__menu-show');
  }

  return (
    <StyledSidebar>
      <SearchContainer>
        <SearchLevel
          query={query}
          setSearchParams={setSearchParams}
        />

        <NavMenuButton onClick={handleShowNavMenu}>
          <HiMenuAlt2 />
        </NavMenuButton>
      </SearchContainer>

      <ul
        className='nav__menu'
        ref={navRef}
      >
        <React.Fragment>
          {filteredItems.map((item) => (
            <ListItems key={item.id}>
              <Item
                value={item.value}
                onClick={() => handleNavigate(item.value)}
                disabled={levelName ? item.value !== levelName : false}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                />
                &nbsp;{item.value}
              </Item>
            </ListItems>
          ))}
        </React.Fragment>
      </ul>
    </StyledSidebar>
  );
}

export default Sidebar;
