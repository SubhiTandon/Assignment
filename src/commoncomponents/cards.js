import React, { useState } from "react"
import { calculatePoints , calculatePointsPerMonth , getRecentOrders , groupOrdersByUser , summary } from "./CardLogic"


const CustomCard = ({
    userlist,
}) => {
    const [openId, setOpenId] = useState(null);

    const handleClick = (id) => {
        setOpenId(openId === id ? null : id);
    }

    const groupedUsers = groupOrdersByUser(userlist);

    const summary = Object.values(groupedUsers).map(user => {
        const recentOrders = getRecentOrders(user.orders);
        const totalPoints = recentOrders.reduce((sum, order) => sum + calculatePoints(order.amount), 0);
        const pointsPerMonth = calculatePointsPerMonth(recentOrders);

        return {
            ...user,
            totalPoints,
            pointsPerMonth
        }
    });


    return (
        <div className="w-full max-w-4xl mx-auto mt-10 ">
            <ul className="space-y-2">
                {summary.map(({ customerId, name, totalPoints, pointsPerMonth, orders }) => (
                    <li key={customerId}
                        className="bg-white shadow-md rounded-md overflow-hidden"
                    >
                        <div className={`cursor-pointer px-4 py-2 border-b ${openId === customerId ? "bg-purple-100" : "bg-gray-100"
                            }`}
                            onClick={() => {
                                handleClick(customerId)
                            }}

                        >
                            <h2 className="text-lg font-semibold">Name : {name}</h2>
                            <h2 className="text-green-400 text-lg font-semibold">Total points earned : {totalPoints}</h2>
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
                                                <tr key={item.transaction_id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.transaction_id}</td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-testid="product">{item?.productname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{" "}
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
                                            {Object.entries(pointsPerMonth).map(([monthYear,points]) => (
                                                <tr key={monthYear}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{monthYear}:</td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{points} points</td>
                                                  
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
    )
};

export default CustomCard;