import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Rating, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import productsData from '../data/products.json';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setLoading(true);
        const productData = productsData.find(p => p.id.toString() === productId);
        setProduct(productData);
        setLoading(false);
    }, [productId]);

    const handleAddToCart = () => {
        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const productToAdd = { ...product, quantity: quantity };

        const isProductInCart = existingCartItems.some(item => item.id === product.id);
        if (isProductInCart) {
            alert('This product is already in your cart!');
            return;
        }

        const updatedCartItems = [...existingCartItems, productToAdd];
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        alert(`Added ${product.name} to cart!`);
    };

    const handleSaveToList = () => {
        const existingSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        const isProductSaved = existingSavedItems.some(item => item.id === product.id);

        if (isProductSaved) {
            alert('This product is already in your saved items!');
            return;
        }

        const productToSave = { ...product, quantity: quantity };
        const updatedSavedItems = [...existingSavedItems, productToSave];
        localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
        alert(`Saved ${product.name} to your list with quantity ${quantity}!`);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!product) {
        return <Typography>Product not found!</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
            <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography ml={1}>({product.rating.toFixed(1)})</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="h6">${product.price}</Typography>
                    <Box display="flex" alignItems="center">
                        <Button variant="outlined" color="primary" onClick={handleSaveToList} sx={{ marginRight: 1 }}>
                            Save to List
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        <TextField
                            type="number"
                            label="Qty"
                            value={quantity}
                            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: 1,
                                style: { height: 'auto', padding: '10px 14px' }
                            }}
                            sx={{
                                width: 90,
                                marginLeft: 2,
                                '.MuiInputBase-root': {
                                    height: 40,
                                    fontSize: '0.875rem'
                                },
                                '.MuiInputLabel-root': {
                                    top: '-5px'
                                }
                            }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductDetails;
