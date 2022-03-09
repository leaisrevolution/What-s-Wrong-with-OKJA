import React from 'react';

// redux
import { history } from '../../common/redux/configureStore';

// components
import { Header, Navbar, Text, Container } from '../../common/components';
import { Intro1st } from './Intro1st';
import { Intro2nd } from './Intro2nd';
import { Intro3rd } from './Intro3rd';

const IntroPage = (props) => {
  return (
    <Container height="250vh">
      <Header page="headermenu" />
      <Navbar page="navbarmenu" />
      <Text type="mainTitle" color="var(--main)"></Text>
      <Intro1st history={history} />
      <Intro2nd history={history} />
      <Intro3rd history={history} />
    </Container>
  );
};

export default IntroPage;
