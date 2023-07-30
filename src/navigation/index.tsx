import * as React from 'react';

import AppStack from './app-stack';
import {NavigationContainer} from '@react-navigation/native';

const Navigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Navigator;
