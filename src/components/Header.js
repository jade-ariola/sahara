import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Button, Tabs, Tab, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ setCategoryFilter }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChange = (event, newValue) => {
        const categories = [
            null, // All options
            'Electronics',
            'Clothing',
            'Home & Kitchen',
            'Personal Care',
            'Sports & Outdoors',
            'Books & Media',
            'Toys & Games'
        ];
        setCategoryFilter(categories[newValue]);
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            navigate('/redirect', { replace: true });
            navigate('/');
        }
    };

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const darkModeClass = isDarkMode ? 'dark-mode' : '';

    return (
        <AppBar position="static" className={`header ${darkModeClass}`}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/" onClick={() => navigate('/')} disableRipple className="saharaLogo" sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                    sahara
                </Button>
                <div className="darkModeToggle">
                    <IconButton color="inherit" onClick={handleDarkModeToggle} disableRipple sx={{ marginTop: '3px', marginLeft: '2px' }}>
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </div>
                <div className="searchBar">
                    <form onSubmit={handleSearchSubmit}>
                        <InputBase
                            placeholder="Search Items"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="searchInput"
                        />
                        <IconButton type="submit" aria-label="search" className="searchIcon" disableRipple>
                            <SearchIcon />
                        </IconButton>
                    </form>
                </div>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit" onClick={() => navigate('/about')} disableRipple>
                    <InfoIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/saved')} disableRipple>
                    <BookmarkIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/orders')} disableRipple>
                    <LocalMallIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/cart')} disableRipple>
                    <ShoppingCartIcon />
                </IconButton>
            </Toolbar>
            <Toolbar>
                <Tabs
                // This enclosed section is probably not necessary but I'll leave it here.
                    value={-1}
                    onChange={handleChange}
                    className="categoryTabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="transparent"

                //
                    sx={{
                        '.css-1aquho2-MuiTabs-indicator': {
                            backgroundColor: 'white'
                        }
                    }}
                >
                    <Tab label="All" />
                    <Tab label="Electronics" />
                    <Tab label="Clothing" />
                    <Tab label="Home & Kitchen" />
                    <Tab label="Personal Care" />
                    <Tab label="Sports & Outdoors" />
                    <Tab label="Books & Media" />
                    <Tab label="Toys & Games" />
                </Tabs>
            </Toolbar>

        </AppBar>
    );
};

export default Header;
