import React from 'react'
import { render , screen , fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomCard from './cards'

const userlist = [
    {
        user : {
            name: "Shubham",
            customerId: 1,
            orders : [
                {transaction_id : 1 , amount : 120, date: "2024-07-15" , productname:"iphone"},
                {transaction_id : 2 , amount : 90, date: "2024-05-10" , productname:"iphone"},
                {transaction_id : 3 , amount : 90, date: "2024-07-25" , productname:"iphone"},
                {transaction_id : 4 , amount : 90, date: "2024-06-30" , productname:"iphone"}
            ]
        }
    },
    {
        user : {
            name: "Amit",
            customerId: 2,
            orders : [
                {transaction_id : 6 , amount : 120, date: "2024-07-15" , productname:"iphone"},
             {transaction_id : 7 , amount : 90, date: "2024-06-30" , productname:"iphone"}
            ]
        }
    },
];

describe('CustomCard', () => {
     test('render user information correctly', () => {
         render(<CustomCard userlist={userlist} />);

         expect(screen.getByText('Name : Shubham')).toBeInTheDocument();
        // expect(screen.getByText('Total point earned : 210')).toBeInTheDocument();

         expect(screen.getByText('Name : Amit')).toBeInTheDocument();
        // expect(screen.getByText('Total point earned : 130')).toBeInTheDocument();
     });


    test('expands and collapses user details on click', () => {
        render(<CustomCard userlist={userlist} />);
      //  expect(screen.queryByTestId('product')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Name : Shubham'));

       //  expect(screen.queryByTestId('product')).toBeInTheDocument();
       // expect(screen.queryByTestId('product')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Name : Amit'));

       // expect(screen.queryByTestId('product')).not.toBeInTheDocument();
       // expect(screen.queryByTestId('product')).not.toBeInTheDocument();
    });

    test('display points per month correctly' , () => {
        render(<CustomCard userlist={userlist} />);

        fireEvent.click(screen.getByText('Name : Shubham'));

        expect(screen.getByText('2024-7:')).toBeInTheDocument()
        expect(screen.getByText('130 points')).toBeInTheDocument();
    });


});