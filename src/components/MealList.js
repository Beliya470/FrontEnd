import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import { Row ,Col ,Card } from 'react-bootstrap';

const MealList = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [image_url, setImage_url] = useState('');

  const [meals, setMeals] = useState([]);
  const [editingMealId, setEditingMealId] = useState(null);
  const [formData, setFormData] = useState({
    // id: '',
    name: '',
    description: '',
    price: '',
    image_url: '',
    caterer_id: ''
  });
  const history = useHistory();
  const [caterers, setCaterers] = useState([]);
  const [error, setError] = useState(null);

  const goBackToAdminDashboard = () => {
    history.push('/admin-dashboard'); // Define the path you want to navigate to
  };
  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('https://mealy-app-ffs5.onrender.com/meals', config);
      setMeals(response.data["meal options"]);
    } catch (error) {
      setError("Error fetching meals");
    }
  };


  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dizhfsddx',
        uploadPreset: 'giftkimani',
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          setImage_url(result.info.secure_url);
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const response = await axios.get('https://mealy-app-ffs5.onrender.com/caterers');
        setCaterers(response.data.caterers);
      } catch (error) {
        setError("Error fetching caterers");
      }
    };
    fetchCaterers();
    fetchMeals();
  }, []);

  const addMeal = async () => {
    if (editingMealId) {
      await updateMeal();
    } else {
      try {
        const token = localStorage.getItem('access-token');
        
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const formDataWithIntegerPrice = { ...formData, price: parseInt(formData.price, 10), image_url: image_url };
        const response = await axios.post('https://mealy-app-ffs5.onrender.com/meals', formDataWithIntegerPrice, config);
        
         
        alert(response.data.message);
        fetchMeals();
      } catch (error) {
        setError("Error adding meal");
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name !== 'caterer_id') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCatererChange = (e) => {
    const selectedCatererId = e.target.value;
    setFormData({ ...formData, caterer_id: selectedCatererId });
  };

  const editMeal = (meal) => {
    setEditingMealId(meal.id);
    setFormData({ ...meal });
  };

  const deleteMeal = async (mealId) => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete('https://mealy-app-ffs5.onrender.com/meals', { data: { id: mealId }, ...config });
      alert(response.data.message);
      setMeals(meals.filter((meal) => meal.id !== mealId));
    } catch (error) {
      setError("Error deleting meal");
    }
  };

  const updateMeal = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put('https://mealy-app-ffs5.onrender.com/meals', formData, config);
      alert(response.data.message);
      setMeals(meals.map((meal) => (meal.id === formData.id ? formData : meal)));
      setEditingMealId(null);
      setFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        image_url: '',
        caterer_id: ''
      });
    } catch (error) {
      setError("Error updating meal");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeal();
  };
  return (
    <Row>
      <h1>Manage Meals</h1>
      <Col  md={7}>
      
      <Row>
                
        {meals && meals.map(meal => (
          <Col md={5}> 
          <Card 
          style={{ width: '30rem'}}>
          <div key={meal.id}>
          <Card.Header>Name: {meal.name}</Card.Header>
            {/* <p>Name: {meal.name}</p> */}
            <p>Description: {meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Caterer ID: {meal.caterer_id}</p>
            <img src={meal.image_url} alt={meal.name} />
            <Card.Footer className="text-muted">
              <Row>
                <Col><button onClick={() => editMeal(meal)}>Edit</button></Col>
                <Col><button onClick={() => deleteMeal(meal.id)}>Delete</button></Col>
              </Row>
              
            
            </Card.Footer>
            
          </div>
          </Card>
          </Col>
        ))}
       
      {/* </ul> */}
      </Row>
      </Col>
      <Col md={4}>
        <Card>
      <button className='backtoadmin' onClick={goBackToAdminDashboard}>Back to Admin Dashboard</button> {/* Back button */}
      <form onSubmit={handleSubmit}>   
        <div> 
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40' />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'/>
        </div>
        <div>
          <label>Price: </label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40' />
        </div>
        <div>
          <label>Image URL: </label>
          <input type="text" name="image_url" value={image_url} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'/>
          <button type="button" onClick={() => widgetRef.current.open()}>
            Upload Image
          </button>

        </div>
        <div>
          <label>Caterer id:</label>
          <select name="caterer_id" value={formData.caterer_id} onChange={handleCatererChange}>
            <option value="">Select a caterer</option>
            {caterers.map(caterer => (
              <option key={caterer.caterer_id} value={caterer.caterer_id}>
                {caterer.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{editingMealId ? 'Update Meal' : 'Add Meal'}</button>
      </form>
      {error && <p>{error}</p>}
      </Card>
      </Col>
     
      
     
    </Row>
  )
};


export default MealList;


