

export  const calculatePoints = (amount) => {
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
    } else if (parsedAmount >= 50 && parsedAmount < 100 ) {
        points += 1 * (parsedAmount - 50);
    }
    return points
}


export const calculatePointsPerMonth = (orders) => {
    const pointsPerMonth = {}
    orders.forEach(order => {
        const date = new Date(order.date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!pointsPerMonth[monthYear]) {
            pointsPerMonth[monthYear] = 0;
        } 
        pointsPerMonth[monthYear] += calculatePoints(order.amount);
    });
    return pointsPerMonth;
};

export const getRecentOrders = (orders) => {
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    return orders.filter(order => new Date(order.date) >= threeMonthsAgo);
};

export const groupOrdersByUser = (data) => {
    return data.reduce((acc, { user }) => {
        acc[user.customerId] = user;
        return acc;
    }, {});
};
