import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerCard from './cards';


const userslist = [
  {
    customerId: '1',
    name: 'Shubham',
    orders: [
      { teansaction_id: '123', productname: 'Product A', date: '2024-07-01', amount: '120' },
      { teansaction_id: '124', productname: 'Product B', date: '2024-06-15', amount: '60' },
    ],
  },
];

describe('CustomerCard Component', () => {
  test('should render customer details correctly', () => {
    render(<CustomerCard userslist={userslist} />);

 
    expect(screen.getByText('Name : Shubham')).toBeInTheDocument();
    expect(screen.getByText('Total point earned : 3570')).toBeInTheDocument(); 
  });

  test('should toggle order details on click', () => {
    render(<CustomerCard userslist={userslist} />);

    
    fireEvent.click(screen.getByText('Name : Shubham'));

   
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  test('should display points per month correctly', () => {
    render(<CustomerCard userslist={userslist} />);


    fireEvent.click(screen.getByText('Name : Shubham'));

   
    expect(screen.getByText('2024-7:')).toBeInTheDocument();
    expect(screen.getByText('3450 points')).toBeInTheDocument(); 
  });
});
