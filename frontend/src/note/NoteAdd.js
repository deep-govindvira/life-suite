import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for navigation

function NoteAdd() {
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const addNote = async () => {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const color = document.getElementById('color').value;

        const id = Date.now().toString(); // Generate a unique ID based on the current timestamp
        const url = 'http://localhost:8080/note/add';
        const requestBody = { id, title, description, color };

        try {
            await axios.post(url, requestBody);
            navigate('/Note'); // Navigate back to the main notes page after adding
        } catch (error) {
            console.log("Error adding note:", error);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="card p-4">
                    <div className="form-group mb-3">
                        <input
                            id="title"
                            className="form-control"
                            placeholder="Title"
                            type="text"
                            style={{ border: '1px solid #ced4da', fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            style={{ border: '1px solid #ced4da', height: '250px', fontSize: '16px' }}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <select
                            id="color"
                            className="form-control"
                            style={{ border: '1px solid #ced4da' }}
                            defaultValue="card bg-light mb-3"
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
                    <button
                        className="btn btn-outline-primary mt-3 w-100"
                        onClick={addNote}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteAdd;
