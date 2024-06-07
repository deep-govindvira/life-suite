import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NoteUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ title: '', description: '', color: 'card bg-light mb-3' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await axios.post('http://localhost:8080/note/get/id', { id });
                setData(response.data);
            } catch (error) {
                setError('Error fetching note.');
                console.error('Error fetching note:', error);
            } finally {
                setLoading(false);
            }
        };

        getNote();
    }, [id]);

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const update = async (updatedData) => {
        const { title, description, color } = updatedData;
        const url = 'http://localhost:8080/note/update';
        const requestBody = { id, title, description, color };

        try {
            await axios.post(url, requestBody);
            // Optional: Add a success message or any other action
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const debouncedUpdate = useRef(debounce(update, 500)).current;

    const handleChange = (e) => {
        const { id, value } = e.target;
        const updatedData = { ...data, [id]: value };
        setData(updatedData);
        debouncedUpdate(updatedData);
    };

    const remove = async () => {
        const url = 'http://localhost:8080/note/remove';
        const requestBody = { id };

        try {
            await axios.post(url, requestBody);
            navigate('/Note');
        } catch (error) {
            console.error('Error removing note:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="container mt-5">
                <div className="card p-4">
                    <div className="form-group mb-3">
                        <input
                            defaultValue={data.title}
                            onChange={handleChange}
                            id="title"
                            className="form-control"
                            placeholder="Title"
                            type="text"
                            style={{ border: '1px solid #ced4da', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            defaultValue={data.description}
                            onChange={handleChange}
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            style={{ border: '1px solid #ced4da', height: '250px', fontSize: '16px' }}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <select
                            onChange={handleChange}
                            defaultValue={data.color}
                            id="color"
                            className="form-control"
                            style={{ border: '1px solid #ced4da' }}
                        >
                            <option value="card bg-light mb-3">Light</option>
                            <option value="card text-white bg-primary mb-3">Primary</option>
                            <option value="card text-white bg-secondary mb-3">Secondary</option>
                            <option value="card text-white bg-success mb-3">Success</option>
                            <option value="card text-white bg-danger mb-3">Danger</option>
                            <option value="card bg-warning mb-3">Warning</option>
                            <option value="card text-white bg-info mb-3">Info</option>
                            <option value="card text-white bg-dark mb-3">Dark</option>
                        </select>
                    </div>
                    {/* Removed Update button */}
                    <button className="btn btn-outline-danger mt-3 w-100" onClick={remove}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteUpdate;
