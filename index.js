/**
 * @format
 */
 import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {theme} from './src/config/theme';

import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={'#26BAE2'} barStyle={'light-content'}/>
        <App />
      </PaperProvider>
    );
  }
AppRegistry.registerComponent(appName, () => Main);
