import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store';

jest.useFakeTimers();

describe('App Component', () => {
  it('renders splash screen initially', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Splash')).toBeTruthy();
  });

  it('navigates to Auth screen after splash timeout', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Advance timers manually
    jest.advanceTimersByTime(5000);

    await waitFor(() => expect(queryByText('Splash')).toBeNull());
    expect(getByText('LoginSplash')).toBeTruthy(); // Or use getByText for a visible text in LoginSplash screen
  });
});
