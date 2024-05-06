import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import productsData from '../data/products.json';
import Product from './Product';
import './Search.css';

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1 className="searchTitle">Showing results for: {query}</h1>
            {filteredProducts.length > 0 ? (
                <Grid container spacing={2} style={{ padding: 20 }}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <Product product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography className="noResults">No products found matching your search criteria.</Typography>
            )}
        </div>
    );
};

export default Search;
