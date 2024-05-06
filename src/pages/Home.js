import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Product from '../components/Product';
import productsData from '../data/products.json';
import '../components/Product.css';
import './Home.css';

const Home = ({ categoryFilter }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('');
    const [triggerSort, setTriggerSort] = useState(0);

    const sortProducts = useCallback((data) => {
        const sortedData = [...data];
        switch (sortOrder) {
            case 'priceHigh':
                sortedData.sort((a, b) => b.price - a.price);
                break;
            case 'priceLow':
                sortedData.sort((a, b) => a.price - b.price);
                break;
            case 'ratingHigh':
                sortedData.sort((a, b) => b.rating - a.rating);
                break;
            case 'ratingLow':
                sortedData.sort((a, b) => a.rating - b.rating);
                break;
            default:
                break;
        }
        setProducts(sortedData);
        setLoading(false);
    }, [sortOrder]);

    useEffect(() => {
        let data = productsData;
        if (categoryFilter) {
            data = data.filter(product => product.category === categoryFilter);
        }
        sortProducts(data);
    }, [categoryFilter, triggerSort, sortProducts]);

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setTriggerSort(triggerSort + 1);
    };

    return (
        <div className="page">
            <FormControl className="filterControl" fullWidth>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                    labelId="sort-label"
                    value={sortOrder}
                    label="Sort By"
                    onChange={handleSortChange}
                >
                    <MenuItem value="priceLow">Lowest Price</MenuItem>
                    <MenuItem value="priceHigh">Highest Price</MenuItem>
                    <MenuItem value="ratingHigh">Highest Rating</MenuItem>
                    <MenuItem value="ratingLow">Lowest Rating</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Home;
