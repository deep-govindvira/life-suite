import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Note = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook from React Router

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const response = await axios.post('http://localhost:8080/note/get');
            setData(response.data); // Assuming response.data contains the list of notes
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (!item.title && (!searchQuery || !searchQuery.trim())) ||
        (!item.description && (!searchQuery || !searchQuery.trim()))
    );

    const addNote = () => {
        navigate('/Note/Add'); // Navigate to the add note page
    };

    const updateNote = (id) => {
        navigate(`/Note/${id}`); // Navigate to the update note page with the note ID
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <button
                            className="btn btn-outline-primary w-100"
                            onClick={addNote}
                            style={{ height: '50px' }}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="card-columns">
                    {filteredData.map(item => (
                        <div
                            key={item.id}
                            className={`card ${item.color}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => updateNote(item.id)}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p style={{ textAlign: 'left', whiteSpace: 'pre-line' }} className="card-text">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Note;
