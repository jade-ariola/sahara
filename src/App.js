import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './components/ProductDetails';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Search from './components/Search';
import Checkout from './pages/Checkout';
import Saved from './pages/Saved';
import About from './pages/About'
import './App.css';

const App = () => {
    const [categoryFilter, setCategoryFilter] = useState(null);

    return (
        <Router>
            <Header setCategoryFilter={setCategoryFilter} />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home categoryFilter={categoryFilter} />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <footer className="footer">
            </footer>
        </Router>
    );
};
export default App;
