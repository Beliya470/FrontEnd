import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const UserDashboard = () => {
  // const cardStyle = {
  //   width: '100%',
  //   borderRadius: '15px',
  //   backgroundColor: '#f8f9fa', 
  //   padding: '5%',
  //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  //   color:'black',
  // };

  const titleStyle = {
    marginBottom: '2px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#343a40', 
  };

  const linkCardStyle = {

  };

  const linkStyle = {
    padding: '20px',
    textDecoration: 'none',
    color: '#dd423d', // Blue link color
  };

  return (
    // <Card style={cardStyle}>
      <>
      <div className="text-center" style={titleStyle}>
        <h1> Dashboard</h1>
      </div>
      <Row>
        <Col >
        <div style={{backgroundImage: `url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg')`, height:'100vh', backgroundPosition: 'center', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>

        </div>
          {/* <img style={{width:'100% !em'}} src='https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>           */}
          </Col>
          <Col >
          <Card style={linkCardStyle}>
        <Link to="/userprofile" style={linkStyle}>
          Profile
        </Link>
      </Card>

      <Card style={linkCardStyle}>
        <Link to="/view-menu" style={linkStyle}>
          Menu
        </Link>
      </Card>

      <Card style={linkCardStyle}>
        <Link to="/orders" style={linkStyle}>
          View Orders
        </Link>
      </Card>

      <Card style={linkCardStyle}>
       
      </Card>
          </Col>
      </Row>

     
    {/* </Card> */}
    </>
  );
};

export default UserDashboard;
