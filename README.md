# Customer Points Dashboard

## Overview

Customer Points Dashboard is a Recat application that show points for every transaction for last three months 

## 

- **Customer List**: Display a list of customers with their total points.
- **Order Details**: on click of user card it Display all user transaction list with individual points  with their total points.
- **Monthly Points**: its display each user monthly points .
- **Responsive Design**: The interface is userfriendly and work in various devices with different screen sizes.

## Installation 

1. **Clone the repository**

```bash git clone https://github.com/SubhiTandon/Assignment.git ```

2. **Install dependencies**

```bash npm i / npm install```

3. **Start the development server**

```bash npx json-server db.json```
```bash npm start```

4. **Open your browser**

Navigate to `http://localhost:3001` to view the application 

## Usage 
The application render a list of customers. Each customer card display the following: 

-**Name**: The name of the customer.
-**Total Points**: The total points earned by the customer from last three months orders.

Click on a customer card to expand and view:

-**Order Details**: A list of all transcation is shown with points .
-**Monthly Points**: A total summary of each months earned points .

## Componets 

-**Home**: this a main componet where all the subcomponets are render . we call all the api and send the response to  the child components  .
-**CustomCard**: Main compoennts responsible for rendering the list of customers , their details , and points summary.
-**`calculatepoints(amount)`**: Function to calculate points based on the order amount.
-**`calculatepointsPerMonth(orders)`**: Function to calculate points earned per month.
-**`getrecentOrders(orders)`**: Function to filter orders from the last three months.
-**`groupOrdersByUser(data)`**: Function to group orders by customer.

## Dependencies

-**React**: for building user interface.
-**React Hooks**: for mapping state and effects.



