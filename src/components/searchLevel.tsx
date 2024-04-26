import React from 'react';
import styled from 'styled-components';

type QueryTypes = {
  query: string | null;
  setSearchParams: (
    searchParams:
      | URLSearchParams
      | ((prevParams: URLSearchParams) => URLSearchParams),
    options?: { replace?: boolean }
  ) => void;
};

const StyledSearchLevel = styled.input`
  --padding: 0.4rem 0 0.4rem 0.8rem;

  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  color: var(--clr-white);
  caret-color: var(--clr-sky-700);
  background-color: var(--clr-gray-800);
  font-size: var(--font-size-base);
  font-family: var(--font-fam-main);
  letter-spacing: var(--ltr-spacing-xs);
  padding: var(--padding);
  box-shadow: 0 0 1rem 0.25rem rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: none;
  }

  &:focus-visible {
    outline: 0.025rem solid var(--clr-sky-700);
  }

  &:focus-visible&::placeholder {
    color: var(--clr-gray-200);
  }

  &::placeholder {
    color: var(--clr-gray-400);
  }

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: calc(var(--font-size-base) - 0.2rem);
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    font-size: var(--font-size-sm);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    box-shadow: none;
  }
`;

function SearchLevel({
  query,
  setSearchParams,
}: QueryTypes): React.ReactElement {
  return (
    <StyledSearchLevel
      type='text'
      placeholder='Search level'
      value={query ?? ''}
      onChange={(e) =>
        setSearchParams(
          (prevParams: URLSearchParams) => {
            prevParams.set('q', e.target.value);
            return prevParams;
          },
          { replace: true }
        )
      }
    />
  );
}

export default SearchLevel;
