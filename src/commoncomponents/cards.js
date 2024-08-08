import React, { useState } from "react";


const calculatePoints = (amount) => {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return 0;
  }

  let points = 0;

  if (parsedAmount > 100) {
    points += 2 * (parsedAmount - 100);
    if (parsedAmount > 50) {
      points += 1 * (Math.min(parsedAmount, 100) - 50);
    }
  } else if (parsedAmount >= 50 && parsedAmount < 100) {
    points += 1 * (parsedAmount - 50);
  }

  return points;
};

const calculatePointsPerMonth = (orders) => {
    const pointsPerMonth = {};
    orders.forEach(order => {
      const date = new Date(order.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // "YYYY-MM"
      
      if (!pointsPerMonth[monthYear]) {
        pointsPerMonth[monthYear] = 0;
      }
      pointsPerMonth[monthYear] += calculatePoints(order.amount);
    });
    return pointsPerMonth;
  };

const getRecentOrders = (orders) => {
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    
    return orders.filter(order => new Date(order.date) >= threeMonthsAgo);
  };


const groupOrdersByUser = (data) => {
    return data.reduce((acc, { user }) => {
      acc[user.customerId] = user;
      return acc;
    }, {});
  };
  

const CustomerCard = ({
  userslist,
}) => {
  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const groupedUsers = groupOrdersByUser(userslist);

  const summary = Object.values(groupedUsers).map(user => {
    const recentOrders = getRecentOrders(user.orders);
    const totalPoints = recentOrders.reduce((sum, order) => sum + calculatePoints(order.amount), 0);
    const pointsPerMonth = calculatePointsPerMonth(recentOrders);

    return {
      ...user,
      totalPoints,
      pointsPerMonth,
    };
  });

  return (
    
    <div className="w-full max-w-lg mx-auto mt-10">
      <ul className="space-y-2">
        {summary.map(({ customerId, name, totalPoints, pointsPerMonth, orders }) => (
          <li
            key={customerId}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <div
              className={`cursor-pointer px-4 py-2 border-b ${
                openId === customerId
                  ? "bg-gray-200"
                  : "bg-gray-100"
              }`}
              onClick={() => {
                console.log(customerId, "item values")
                handleClick(customerId);
              }}
            >
              <h2 className="text-lg font-semibold">Name : {name}</h2>
              <h2 className="text-lg font-semibold text-green-700">Total point earned : {totalPoints}</h2>
            </div>
            {openId === customerId && (
              <div className="px-4 py-2">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((item) => (
                        <tr key={item.teansaction_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item?.teansaction_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item?.productname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item?.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $ {item?.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">
                            {" "}
                            {calculatePoints(item?.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Earn points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(pointsPerMonth).map(([monthYear, points]) => (
                        <tr key={monthYear}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {monthYear}: 
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                           {points} points
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerCard;


