import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../home';
import { getuserDetails } from '../../store/Featureslices/UserDetails/userdetailsSlice';
import  Snackbar  from '../../commoncomponents/Snackbar';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


jest.mock('../../commoncomponents/Snackbar', () => ({
  __esModule: true,
  default: ({ open, message, type, onClose }) => (
    open ? <div data-testid="snackbar">{message}</div> : null
  ),
}));

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
   
    });
  });

  test('should render CustomerCard when snackbar is not open', async () => {
    
    jest.spyOn(store, 'dispatch').mockResolvedValue({
      payload: { status: 200, data: [{ customerId: '1', name: 'John Doe', orders: [] }] },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );


    await waitFor(() => {
      expect(screen.getByText('Name : John Doe')).toBeInTheDocument();
    });
  });

  test('should render Snackbar with error message when response status is 404', async () => {
    
    jest.spyOn(store, 'dispatch').mockResolvedValue({
      payload: { status: 404 },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );


    await waitFor(() => {
      expect(screen.getByTestId('snackbar')).toHaveTextContent('Please try after sometime');
    });
  });
});
