import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box, Rating } from '@mui/material';
import './Saved.css';
import '../components/Product.css';

const Saved = () => {
    const [savedItems, setSavedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('savedItems')) || [];
        setSavedItems(items);
    }, []);

    const handleRemoveFromSaved = (id, e) => {
        e.stopPropagation();
        const updatedSavedItems = savedItems.filter(item => item.id !== id);
        localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
        setSavedItems(updatedSavedItems);
    };

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            cartItems.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cartItems));
            handleRemoveFromSaved(product.id, e); // Passing 'e' to the remove function
            alert(`Added ${product.name} to cart!`);
        } else {
            alert('This product is already in your cart!');
        }
    };

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <h2 className="savedTitle">Saved Products</h2>
            {savedItems.length === 0 ? (
                <Typography
                    style={{ marginLeft: '-285px', marginTop: '17px' }}
                    className="savedMessage">No saved products found.</Typography>
            ) : (
                <Grid container spacing={4} className="gridContainer">
                    {savedItems.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.id}>
                            <Card onClick={() => handleCardClick(item.id)} style={{ cursor: 'pointer' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                        <Box display="flex" alignItems="center">
                                            <Rating
                                                value={item.rating}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography ml={1}>({item.rating.toFixed(1)})</Typography>
                                        </Box>
                                        <Typography variant="h8">
                                            ${item.price}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                        Qty: <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => setSavedItems(savedItems.map(si => si.id === item.id ? { ...si, quantity: Math.max(1, parseInt(e.target.value, 10)) } : si))}
                                            className="quantityInput"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <Button onClick={(e) => handleRemoveFromSaved(item.id, e)} color="secondary"
                                            variant='outlined' className="removeButton">
                                            Remove
                                        </Button>
                                        <Button
                                            onClick={(e) => handleAddToCart(item, e)} // Ensure 'e' is passed here
                                            color="primary"
                                            variant="contained"
                                            className="cartButton">
                                            Cart
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default Saved;
