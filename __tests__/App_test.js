import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store';
import { NavigationContainer } from '@react-navigation/native';

jest.useFakeTimers();

describe('App Component', () => {
  it('renders splash screen initially', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    );
    
    expect(getByText('Splash')).toBeTruthy();
  });

  it('navigates to Auth screen after splash timeout', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    );

    await waitFor(() => expect(queryByText('Splash')).toBeNull());
    expect(getByText('Auth')).toBeTruthy();
  });
});
