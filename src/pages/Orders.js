import React from 'react';
import { Typography, Container, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    const maskCardNumber = (cardNumber) => {
        return cardNumber.replace(/\d(?=\d{4})/g, "*");
    };

    const handleClearOrderHistory = () => {
        localStorage.removeItem('orderHistory');
        window.location.reload();
    };

    return (
        <Container maxWidth="md" className="orders-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: orderHistory.length === 0 ? '-275px' : 'auto', marginTop: '7px' }}>
                <Typography variant="h2" gutterBottom className="orders-header">Orders</Typography>
                {orderHistory.length > 0 && (
                    <Button variant="outlined" color="secondary" onClick={handleClearOrderHistory}>Clear Orders</Button>
                )}
            </div>
            {orderHistory.length === 0 ? (
                <p style={{ marginLeft: '-275px', marginTop: '17px' }}>There are no current orders.</p>
            ) : (
                orderHistory.map((order, index) => {
                    const grandTotal = order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
                    return (
                        <div key={index} className="order-container">
                            <Typography variant="h6" className="orderDetails">Expected Delivery Date: {order.date}</Typography>
                            <div className="payment-info">
                                <Typography variant="body1">Name: {order.firstName} {order.lastName}</Typography>
                                <Typography variant="body1">Address: {order.address}, {order.city}, {order.postalCode}</Typography>
                                <Typography variant="body1">Payment Card: {maskCardNumber(order.cardNumber)}</Typography>
                            </div>
                            <Typography
                                variant="body1" style={{ margin: '10px 0', marginLeft: '5px', fontSize: '18px' }}>
                                Grand Total: ${grandTotal.toFixed(2)}
                            </Typography>
                            <Grid container spacing={2}>
                                {order.cartItems.map((item, idx) => (
                                    <Grid item xs={12} sm={6} md={4} key={idx}>
                                        <Link to={`/product/${item.id}`} className="productLink" style={{ textDecoration: 'none', color: 'black' }}>
                                            <div className="productCard">
                                                <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                                                <Typography variant="h8">{item.name}</Typography>
                                                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                                <Typography variant="body1">Price: ${item.price}</Typography>
                                            </div>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    );
                })
            )}
        </Container>
    );
};

export default Orders;
