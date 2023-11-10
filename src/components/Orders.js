// Orders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; // Import the CSS file

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);

                const accessToken = localStorage.getItem('access-token');
                
                const response = await axios.get('https://mealy-app-ffs5.onrender.com/orders', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                setOrders(response.data.orders);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-5">
            <header className="mb-4">
                <h1>Your Orders</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Home
                            </a>
                        </li>
                        {/* Other nav items */}
                    </ul>
                </nav>
            </header>

            <main>
                {/* ... Other sections ... */}

                <section className="order-list">
                    <h3>Your Recent Orders</h3>
                    <ul className="list-group">
                        {orders.map((order) => (
                            <li key={order.order_id} className="list-group-item">
                                Order ID: {order.order_id}, Meal ID: {order.meal_id}, Quantity: {order.quantity}, Total: ${order.total_amount}, Created At: {order.created_at}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="mt-5">
                <p>&copy; {new Date().getFullYear()} Mealy. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Orders;
