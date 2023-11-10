import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewMenu = () => {
    const [menu, setMenu] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mealy-app-ffs5.onrender.com/view-menu')
            .then(response => {
                console.log(response.data.meals)
                setMenu(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);
    // console.log(menu)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    const menuItems = menu  ? menu.meals : [];

    console.log(menuItems)

    return (
        <div>
            <h2>Menu</h2>
            
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewMenu;