import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerCard from './cards';


const userslist = [
  {
    user : {
    name: 'Shubham',
    customerId: '1',
    orders: [
      { teansaction_id: 1, amount: 120, date: "2024-07-15" , productname:"Iphone" },
      { teansaction_id: 2, amount: 90, date: "2024-05-10" , productname:"Samsung"},
      { teansaction_id: 3, amount: 90, date: "2024-07-25" , productname:"Iqoo" },
      { teansaction_id: 4, amount: 90, date: "2024-06-30", productname:"Nokia" },
    ],
  }
  },
  {
    user : {
    name: 'Amit',
    customerId: '2',
    orders: [
      { teansaction_id: 6, amount: 120, date: "2024-07-15" , productname:"Iphone" },
      { teansaction_id: 7, amount: 90, date: "2024-06-30" , productname:"Samsung"},
    ],
  }
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
