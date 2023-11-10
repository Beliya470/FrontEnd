import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";

const api = axios.create({
  baseURL: "https://mealy-app-ffs5.onrender.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  },
});

const ManageMeals = () => {
  const [meals, setMeals] = useState([]);
  const [newMealName, setNewMealName] = useState("");
  const [newMealDescription, setNewMealDescription] = useState("");
  const [newMealPrice, setNewMealPrice] = useState("");
  const [newMealImageUrl, setNewMealImageUrl] = useState("");
  const [editingMeal, setEditingMeal] = useState(null);
  const [setSelectedMeals] = useState([]);
  const [error, setError] = useState("");

  const fetchMeals = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setError("User ID missing");
      return;
    }
    try {
      const response = await api.get(`/meals?user_id=${userId}`);
      setMeals(response.data.meals);
      setError("");
    } catch (err) {
      console.error("Error while fetching meals:", err);
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : "An error occurred"
      );
    }
  };

  const handleAddMeal = async () => {
    try {
      if (!newMealName || !newMealPrice) {
        setError("Name and Price are required");
        return;
      }

      const requestData = {
        name: newMealName,
        description: newMealDescription || "",
        price: parseFloat(newMealPrice),
        image_url: newMealImageUrl || "",
      };

      const response = await api.post("/meals", requestData);

      setMeals([...meals, response.data]);
      setNewMealName("");
      setNewMealDescription("");
      setNewMealPrice("");
      setNewMealImageUrl("");
      setError("");
    } catch (err) {
      console.error("Error while adding meal:", err);
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : "Failed to add meal"
      );
    }
  };

  const handleEditMeal = (id) => {
    const mealToEdit = meals.find((meal) => meal.id === id);
    setEditingMeal(mealToEdit);
  };

  const handleUpdateMeal = async () => {
    try {
      await api.put(`/meals/${editingMeal.id}`, editingMeal);
      fetchMeals();
      setEditingMeal(null);
    } catch (err) {
      console.log(err);
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : "Failed to add meal"
      );
    }
  };

  const handleDeleteMeal = async (id) => {
    try {
      await api.delete(`/meals/${id}`);
      fetchMeals();
    } catch (err) {
      console.log(err);
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : "Failed to add meal"
      );
    }
  };

  const handleSelectMeal = (id) => {
    setSelectedMeals((prevState) => [...prevState, id]);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Button
            onClick={() => {
              // Handle the action to go back to the admin page
              // For example, you can use react-router-dom or window.location
            }}
            className="back-to-admin-button"
          >
            Back to Admin
          </Button>
        </Col>
        <Card style={{ width: '18rem', borderRadius: '20px', backgroundColor: 'red' }}></Card>
        <Col xs={8}>
          <div className="ManageMeals">
            <h1 className="heading">Manage Meals</h1>
            {error && <p className="error">{error}</p>}
            <div className="meal-inputs">
              {}
            </div>
            <ul className="meal-list">
              {}
            </ul>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ManageMeals;





