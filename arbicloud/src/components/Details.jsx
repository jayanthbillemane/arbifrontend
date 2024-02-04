// RootComponent.js
import React, { useEffect, useState } from 'react';

const Details = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:8000/'); // Update the endpoint accordingly
        const jsonData = await response.json();
        setData(jsonData);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
        <h1>User Information</h1>
        {data.map((user) => (
            <div key={user.id}>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Profession: {user.Profession}</p>
            <p>Experience: {user.Experiance}</p>
            <p>Companies: {user.company.join(', ')}</p>
            </div>
        ))}
        </div>
    );
};

export default Details;
