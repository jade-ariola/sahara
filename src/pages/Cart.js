import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Grid, Typography, Rating, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import './Cart.css';
import '../components/Product.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleRemoveFromCart = (productId, e) => {
        e.stopPropagation();
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const handleSaveToList = (product, e) => {
        e.stopPropagation();
        const existingSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        if (existingSavedItems.some(item => item.id === product.id)) {
            setNotificationMessage(`This product is already in your saved items!`);
            return;
        }
        const updatedSavedItems = [...existingSavedItems, product];
        localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
        setNotificationMessage(`Saved ${product.name} to your list!`);
        handleRemoveFromCart(product.id, e);
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: parseInt(quantity, 10) };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleGoToCheckout = () => {
        navigate('/checkout');
    };

    const handleNavigateToProductDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <h2 className="cartTitle">My Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    <Typography variant="h6" className="cartTotal">Total: ${totalPrice.toFixed(2)}</Typography>
                    <Button variant="contained" color="primary" className="checkoutButton" onClick={handleGoToCheckout}>Go to Checkout</Button>
                    <Grid container spacing={4} className="gridContainer">
                        {cartItems.map((item) => (
                            <Grid item xs={12} sm={6} md={3} key={item.id}>
                                <Card className="productCard">
                                    <CardActionArea disableRipple onClick={() => handleNavigateToProductDetails(item.id)}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={item.image}
                                            alt={item.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6">
                                                {item.name}
                                            </Typography>
                                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Rating
                                                        value={item.rating}
                                                        precision={0.5}
                                                        readOnly
                                                    />
                                                    <Typography variant="body2">
                                                        {item.rating.toFixed(1)}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1">
                                                    ${item.price}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="body2">Qty: </Typography>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    className="quantityInput"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <Button
                                                    variant='outlined'
                                                    className="cart-removeButton"
                                                    onClick={(e) => handleRemoveFromCart(item.id, e)}
                                                >
                                                    Remove
                                                </Button>
                                                <Button
                                                    variant='outlined'
                                                    color="primary"
                                                    className="saveButton"
                                                    onClick={(e) => handleSaveToList(item, e)}
                                                >
                                                    Save
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <Typography style={{ marginLeft: '20px' }}>Your cart is empty.</Typography>
            )}
            {notificationMessage && <Notification message={notificationMessage} onClose={() => setNotificationMessage('')} />}
        </div>
    );
};

export default Cart;
