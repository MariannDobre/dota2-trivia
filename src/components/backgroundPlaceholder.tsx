import React from 'react';
import styled, { keyframes } from 'styled-components';

type PlaceholderTypes = {
  $placeholderWidth?: string;
  $placeholderMaxWidth?: string;
  $placeholderHeight?: string;
  $placeholderMinHeight?: string;
  $laptopBigHeight?: string;
  $laptopHeight?: string;
  $tabletHeight?: string;
  $mobileHeight?: string;
};

const loadingAnimation = keyframes`
  0% {
    background-color: #3f3f46;
  }
  100% {
    background-color: #a1a1aa;
  }
`;

const SBackgroundPlaceholder = styled.div<PlaceholderTypes>`
  width: ${(props) => props.$placeholderWidth};
  max-width: ${(props) => props.$placeholderMaxWidth};
  height: ${(props) => props.$placeholderHeight};
  min-height: ${(props) => props.$placeholderMinHeight};
  animation: ${loadingAnimation} 1.5s linear infinite alternate;

  @media screen and (max-width: 1364px), screen and (max-height: 864px) {
    min-height: ${(props) =>
      props.$laptopBigHeight || props.$placeholderHeight};
  }

  @media screen and (max-width: 1024px), screen and (max-height: 724px) {
    min-height: ${(props) => props.$laptopHeight || props.$placeholderHeight};
  }

  @media screen and (max-width: 768px), screen and (max-height: 664) {
    min-height: ${(props) => props.$tabletHeight || props.$placeholderHeight};
  }

  @media screen and (max-width: 480px) {
    min-height: ${(props) => props.$mobileHeight || props.$placeholderHeight};
  }
`;

function BackgroundPlaceholder({
  width = '100%',
  maxWidth = '100%',
  height = 'auto',
  minHeight = 'auto',
  laptopBigHeight = 'auto',
  laptopHeight = 'auto',
  tabletHeight = 'auto',
  mobileHeight = 'auto',
}) {
  return (
    <SBackgroundPlaceholder
      $placeholderWidth={width}
      $placeholderMaxWidth={maxWidth}
      $placeholderHeight={height}
      $placeholderMinHeight={minHeight}
      $laptopBigHeight={laptopBigHeight}
      $laptopHeight={laptopHeight}
      $tabletHeight={tabletHeight}
      $mobileHeight={mobileHeight}
    />
  );
}

export default BackgroundPlaceholder;
