import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; // Import the CSS file

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true); // Start loading
            setError(null); // Reset error
            try {
                const accessToken = localStorage.getItem('access-token');
                
                const response = await axios.get('https://mealy-app-ffs5.onrender.com/orders', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                setOrders(response.data.orders);
            } catch (error) {
                setError(error); // Set error
                console.error(error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Show error message
    }

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
