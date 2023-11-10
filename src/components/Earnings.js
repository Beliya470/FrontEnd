import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [earningsData, setEarningsData] = useState({
    date: '',
    total_earnings: 0,
    total_orders: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await axios.get('https://mealy-app-ffs5.onrender.com/earnings', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setEarningsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <header>
        <h1>Earnings Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {/* Add links to other admin-related pages */}
          </ul>
        </nav>
      </header>

      <main>
        <section className="earnings-summary">
          <h3>Monthly Earnings Summary</h3>
          <div className="summary-card">
            <h4>{earningsData.date}</h4>
            <p>Total Earnings: ${earningsData.total_earnings}</p>
            <p>Total Orders: {earningsData.total_orders}</p>
          </div>
          {/* Add more summary cards for different months */}
        </section>

      </main>

      <footer>
        <p>&copy; 2023 Mealy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
