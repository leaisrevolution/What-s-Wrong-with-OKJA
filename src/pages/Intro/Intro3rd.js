import React from 'react';
import styled from 'styled-components';

// components
import { Text } from '../../common/components';
import HighlightText from '../../common/styles/HighlightText';

export const Intro3rd = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';
  return (
    <IntroBg>
      <IntroTitle>
        <Text color="var(--deepcream)" fontSize="40px">
          <HighlightText color="var(--lightcream)">반려견</HighlightText>과{' '}
          <HighlightText color="var(--lightcream)">반려인</HighlightText>에게{' '}
          <br />
          <span style={{ color: 'var(--main)' }}>오늘의 마이펫</span>이 <br />
          필요한 이유
        </Text>
      </IntroTitle>
      <IntroContent></IntroContent>
      <img alt="" src={process.env.PUBLIC_URL + `/Image/partner2.png`} />
    </IntroBg>
  );
};

const IntroBg = styled.div`
  background-color: var(--bgpink);
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  img {
    margin-top: 100px;
    margin-left: 45%;
    width: 50%;
    ${({ theme }) => theme.device.mobile} {
      margin-left: 13%;
      // align-items: center;
      width: 80%;
    }
  }
  ${({ theme }) => theme.device.mobile} {
    text-align: center;
  }
`;

const IntroTitle = styled.div`
  display: flex;
  margin-left: 50px;
  margin-top: 80px;
`;

const IntroContent = styled.div`
  width: 100px;
  height: 400px;
  display: flex;
`;
