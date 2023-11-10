import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './DayMenu.css'; 
import {  Row, Card } from 'react-bootstrap';

const DayMenu = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        axios.get('https://mealy-app-ffs5.onrender.com/meals')
            .then(response => {
                setMeals(response.data["meal options"]);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading (false);
            });
    }, []);

    const handleMealSelection = (mealId) => {
        setSelectedMeals(prevSelectedMeals => {
            if (prevSelectedMeals.includes(mealId)) {
                return prevSelectedMeals.filter(id => id !== mealId);
            } else {
                return [...prevSelectedMeals, mealId];
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('access-token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
            const response = await axios.post(`https://mealy-app-ffs5.onrender.com/menu/${date}`, { menu_items: selectedMeals }, config);
            alert(response.data.message);
            history.push('/customer-dashboard');
        } catch (errorResponse) {
            if (errorResponse.response && errorResponse.response.data && errorResponse.response.data.error) {
                setError(`Error setting menu for the day: ${errorResponse.response.data.error}`);
            } else {
                setError("Error setting menu for the day");
            }
        }
    };

    const navigateBack = () => {
        history.push("/customer-dashboard");
    };

    if (isLoading) {
        return <span className="loadingdm">Loading...</span>;
    }

    if (error) {
        return <span className="errordm">Error: {error}</span>;
    }

    return (
        // <Container>
                
            <div className="DayMenu">
            <h2 className="heading">make your orders </h2>
            <form onSubmit={handleSubmit}>
                <ul className="meal-listdm">
                <Row>
                    {meals.map(meal => (
                         <Card style={{ width: '18rem', borderRadius:'20px' }}>
                    
                            <h3>{meal.name}</h3>
                            <p>{meal.description}</p>
                            <p>Price: ${meal.price}</p>
                            <img src={meal.image_url} alt={meal.name} className="meal-imagedm" />
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedMeals.includes(meal.id)}
                                    onChange={() => handleMealSelection(meal.id)}
                                />
                                Select
                            </label>
                        
                        </Card>
                    ))}
                </Row>
                </ul>
                <Row></Row>
                <button type="submit" className="submit-button">order</button>
            </form>
            <button onClick={navigateBack} className="back-button">Back to User Dashboard</button>
        </div>

        // </Container>
    );
}

export default DayMenu;
