import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            const response = await axios.post('http://localhost:8080/todo/get');
            setData(response.data); // Assuming response.data contains the list of todos
        } catch (error) {
            alert('Todos are not Fetched.')
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        const name = document.getElementById('name').value;
        document.getElementById('name').value = '';
        const id = Date.now().toString(); // Generate a unique ID based on the current timestamp
        const status = "0";
        const url = 'http://localhost:8080/todo/add';
        const requestBody = { id, name, status };

        try {
            await axios.post(url, requestBody);
            getTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id, name, status) => {
        const url = 'http://localhost:8080/todo/update';
        const requestBody = { id, name, status };

        try {
            await axios.post(url, requestBody);
            getTodos(); // Optionally reload todos to reflect changes
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const removeTodo = async (id) => {
        const url = 'http://localhost:8080/todo/remove';
        const requestBody = { id };

        try {
            await axios.post(url, requestBody);
            getTodos(); // Optionally reload todos to reflect changes
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleNameChange = (id, e) => {
        const name = e.target.value;
        const status = document.getElementById('status' + id).checked ? "1" : "0";
        updateTodo(id, name, status);
    };

    const handleStatusChange = (id, e) => {
        const status = e.target.checked ? "1" : "0";
        const name = document.getElementById('name' + id).value;
        updateTodo(id, name, status);
    };

    const filteredData = data.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (!item.name && (!searchQuery || !searchQuery.trim()))
    );

    return (
        <div>
            <div className="container mt-5">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <input
                            id='name'
                            type='text'
                            className="form-control"
                            placeholder='Todo'
                            style={{ fontWeight: 'bold', height: '50px', fontSize: '25px' }}
                        />
                    </div>
                    <div className="col-md-4">
                        <button
                            style={{ height: '50px' }}
                            className="btn btn-outline-primary w-100"
                            onClick={addTodo}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <input
                            type='text'
                            className="form-control"
                            placeholder='Search...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        {filteredData.map((item) => (
                            <div style={{ border: '0px' }} key={item.id} className="list-group-item d-flex align-items-center">
                                <input
                                    style={{ width: '20px', height: '20px', border: '0px' }}
                                    id={'status' + item.id}
                                    defaultChecked={item.status === "1"}
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={(e) => handleStatusChange(item.id, e)}
                                />
                                <input
                                    style={{
                                        marginLeft: '10px',
                                        marginRight: '10px',
                                        textDecoration: item.status === "1" ? 'line-through' : 'none',
                                        border: '0px'
                                    }}
                                    id={'name' + item.id}
                                    defaultValue={item.name}
                                    placeholder='Todo'
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => handleNameChange(item.id, e)}
                                />
                                <img style={{ cursor: 'pointer', marginLeft: '30px' }} onClick={() => removeTodo(item.id)} src='delete.png' alt='delete' height={'35px'} width={'35px'} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
