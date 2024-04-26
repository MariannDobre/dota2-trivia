import React, { ReactNode } from 'react';
import styled from 'styled-components';

type TooltipTypes = {
  children: ReactNode;
  tooltip?: string;
};

const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover > span {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.35s ease;
  }
`;

const TooltipBody = styled.span`
  --text-color: #e6e6e6;
  --width-mobile: calc(16rem - 2rem);
  --padding: 0.4rem 1.6rem;
  --padding-laptop-lg: 0.6rem 1.6rem;
  --padding-tablet: 0.6rem 1.2rem;
  --margin-top: 1.2rem;

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-gray-700);
  color: var(--text-color);
  font-size: calc(var(--font-size-base) - 0.2rem);
  padding: var(--padding);
  margin-top: var(--margin-top);
  letter-spacing: var(--ltr-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  visibility: hidden;
  opacity: 0;
  right: 0;
  top: 100%;
  white-space: nowrap;
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    font-size: var(--font-size-sm);
    letter-spacing: var(--ltr-spacing-sm);
    word-spacing: var(--word-spacing-sm);
    padding: var(--padding-laptop-lg);
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    width: 16.8rem;
    text-align: center;
    white-space: normal;
    padding: var(--padding-tablet);
  }

  @media screen and (max-width: 480px) {
    width: var(--width-mobile);
    font-size: calc(var(--font-size-sm) - 0.2rem);
    letter-spacing: var(--ltr-spacing-md);
    word-spacing: var(--word-spacing-md);
  }
`;

function Tooltip({ children, tooltip }: TooltipTypes): React.ReactElement {
  return (
    <StyledTooltip>
      {children}
      {tooltip ? <TooltipBody>{tooltip}</TooltipBody> : null}
    </StyledTooltip>
  );
}

export default Tooltip;
