import React from "react";
import "./AdminDashboard.css"; // Import your CSS file

const AdminEarnings = () => {
    return (
        <div className="container mt-5">
            <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>2023-11-01</td>
                <td>Pizza</td>
                <td>$20.00</td>
                <td></td>
              </tr>
              <tr>
                <td>2023-11-02</td>
                <td>Sushi</td>
                <td>$35.00</td>
                <td></td>
              </tr>
              <tr>
                <td>2023-11-03</td>
                <td>Sushi</td>
                <td>$35.00</td>
                <td></td>
              </tr>
            </tbody>
            </table>
        </div>     
    )
}

export default AdminEarnings;