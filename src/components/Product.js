import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate();

    return (
        <Card className="productCard" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
            <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Rating
                            value={product.rating}
                            precision={0.5}
                            readOnly
                        />
                        <Typography variant="body2" component="span">
                            {product.rating.toFixed(1)}
                        </Typography>
                    </Box>
                    <Typography variant="body1">
                        ${product.price}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Product;
