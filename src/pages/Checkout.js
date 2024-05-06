import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();

    // For presentation purposes, this is the default user information
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [address, setAddress] = useState('123 Main St');
    const [city, setCity] = useState('New York');
    const [postalCode, setPostalCode] = useState('10001');
    const [cardNumber, setCardNumber] = useState('1234 5678 9012 3456');
    const [expirationDate, setExpirationDate] = useState('12/24');
    const [cvv, setCVV] = useState('123');

    const handleSubmit = (event) => {
        event.preventDefault();

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        const orderDate = futureDate.toLocaleDateString();

        const orderData = {
            firstName,
            lastName,
            address,
            city,
            postalCode,
            cardNumber,
            expirationDate,
            cvv,
            cartItems,
            date: orderDate
        };

        const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistory.push(orderData);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        localStorage.removeItem('cart');

        navigate('/orders');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom className="checkoutTitle">Checkout</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" variant="outlined" fullWidth required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" variant="outlined" fullWidth required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" variant="outlined" fullWidth required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="City" variant="outlined" fullWidth required value={city} onChange={(e) => setCity(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Postal Code" variant="outlined" fullWidth required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Card Number" variant="outlined" fullWidth required value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Expiration Date" variant="outlined" fullWidth required value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="CVV" variant="outlined" fullWidth required value={cvv} onChange={(e) => setCVV(e.target.value)} />
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" className="submitButton">Submit Payment</Button>
                </Grid>
            </form>
        </Container>
    );
};

export default Checkout;
