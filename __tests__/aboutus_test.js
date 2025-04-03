import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AboutUs from '../src/Screens/Settings/AboutUs';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('AboutUs Component', () => {
  let mockGoBack;

  beforeEach(() => {
    mockGoBack = jest.fn();
    useNavigation.mockReturnValue({ goBack: mockGoBack });
  });

  it('renders correctly', () => {
    const { getByText } = render(<AboutUs />);
    
    expect(getByText('About Us')).toBeTruthy();
    expect(getByText('Blue Taxi Driver')).toBeTruthy();
    expect(getByText('v1.0')).toBeTruthy();
    expect(getByText('Follow Us')).toBeTruthy();
  });

  it('navigates back when the back button is pressed', () => {
    const { getByTestId } = render(<AboutUs />);
    
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });
});
