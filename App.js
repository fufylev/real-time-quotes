import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { RealTimeQuotesState } from "./src/context/Quotes/RealTimeQuotesState";
import Navigation from "./src/navigation/Navigation";
import PairInfoState from "./src/context/PairInfo/PairInfoState";
import { Provider } from 'mobx-react'
import { store } from './src/modles'


async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={loadApp}
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />;
  }

  return (
    <Provider {...store}>
      <RealTimeQuotesState>
        <PairInfoState>
          <Navigation />
        </PairInfoState>
      </RealTimeQuotesState>
    </Provider>
  );
}
