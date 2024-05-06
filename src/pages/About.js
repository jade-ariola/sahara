import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import './About.css';

const About = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedbackHistory, setFeedbackHistory] = useState([]);

    useEffect(() => {
        const storedFeedback = JSON.parse(localStorage.getItem('feedbackHistory'));
        if (storedFeedback) {
            setFeedbackHistory(storedFeedback);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form data submitted:', formData);
        setIsSubmitted(true);
        setFeedbackHistory(prevHistory => [...prevHistory, formData]);
        localStorage.setItem('feedbackHistory', JSON.stringify([...feedbackHistory, formData]));
    };

    const handleGoBack = () => {
        setIsSubmitted(false);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    if (isSubmitted) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="h5">Thanks! Your message has been delivered.</Typography>
                <Button variant="contained" color="primary" onClick={handleGoBack} style={{ marginTop: '10px', marginBottom: '20px' }}>Go Back</Button>
                <Typography variant="h5" style={{marginBottom: '20px'}}>Feedback History</Typography>
                {feedbackHistory.map((feedback, index) => (
                    <div key={index}>
                        <Typography>Name: {feedback.name}</Typography>
                        <Typography>Email: {feedback.email}</Typography>
                        <Typography>Message: {feedback.message}</Typography>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={6}>
                <div style={{ padding: '20px' }}>
                    <Typography variant="h4">About the Site</Typography>
                    <Typography variant="body1">
                    This website serves as a simulated e-commerce platform designed for demonstration purposes exclusively.
                    It offers a basic representation with limited functionalities and is not suitable for actual commercial transactions.
                    Please be aware that the products showcased on this website are purely for demonstration and are not available for purchase.
                    Any prices, descriptions, or images associated with the products are fictional and do not represent real inventory.
                    Additionally, please note that certain screen sizes, particularly mobile sizes, are not yet fully supported.
                    This site is intended solely to showcase the developer's skills and provide insight into what can be accomplished with web development technologies.
                    It does not aim to fully emulate a comprehensive e-commerce site.
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', marginRight: '50px' }}>
                    <Typography variant="h4">Feedback Form</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Message"
                            multiline
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px', boxShadow: 'none' }}>Submit</Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default About;
