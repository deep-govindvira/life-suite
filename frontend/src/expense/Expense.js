import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expense = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/expense/get');
            setData(response.data);
            console.table(response.data)
            setError(null);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const addData = async () => {
        if (!title.trim() || !amount.trim()) {
            setError('Title and amount are required');
            return;
        }

        const requestBody = { title, amount: parseFloat(amount) };
        if (!requestBody.amount) requestBody.amount = 0;

        try {
            await axios.post('http://localhost:8080/expense/add', requestBody);
            getData();
            setTitle('');
            setAmount('');
            setError(null);
        } catch (err) {
            setError('Failed to add data');
        }
    };

    const updateData = async (requestBody) => {
        try {
            await axios.post('http://localhost:8080/expense/update', requestBody);
            getData();
            setError(null);
        } catch (err) {
            setError('Failed to update data');
        }
    };

    const removeData = async (id) => {
        const requestBody = { id, title: "", amount: 0 };
        try {
            await axios.post('http://localhost:8080/expense/remove', requestBody);
            getData();
            setError(null);
        } catch (err) {
            setError('Failed to remove data');
        }
    };

    const clearAllData = async () => {
        try {
            for (const item of filteredData) {
                await removeData(item.id);
            }
            setError(null);
        } catch (err) {
            setError('Failed to clear data');
        }
    };

    const updateTitle = async (id, title) => {
        let updatedItem = data.find(item => item.id === id);
        updatedItem.title = title;
        updateData(updatedItem);
    };

    const updateAmount = async (id, amount) => {
        let updatedItem = data.find(item => item.id === id);
        updatedItem.amount = parseFloat(amount) || 0;
        updateData(updatedItem);
    };

    const filteredData = data.filter(item =>
        ((!item.title && (!searchQuery || !searchQuery.trim())) ||
            (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (searchAmount === '' || item.amount.toString().includes(searchAmount))
    );

    const totalExpense = filteredData.reduce((acc, item) => acc + item.amount, 0);

    const formattedTotalExpense = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(totalExpense);

    if (loading) { }

    return (
        <div>
            <div className="container mt-4">
                {/* {loading && <div className="alert alert-info">Loading...</div>} */}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            placeholder='Title'
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <input
                            type='number'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control"
                            placeholder='Amount'
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <button onClick={addData} className="btn btn-outline-primary w-100">Add</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                            placeholder='Search by title'
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type='number'
                            value={searchAmount}
                            onChange={(e) => setSearchAmount(e.target.value)}
                            className="form-control"
                            placeholder='Search by amount'
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <h3>{formattedTotalExpense} ({filteredData.length})
                            <button style={{ marginLeft: '20px' }} onClick={clearAllData} className="btn btn-outline-danger">Clear</button>
                        </h3>
                    </div>
                </div>
                {filteredData.map((item) => (
                    <div key={item.id} className="row mb-2">
                        <div className="col-md-4 mb-2">
                            <input
                                type='text'
                                onChange={(e) => updateTitle(item.id, e.target.value)}
                                defaultValue={item.title}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <input
                                type='number'
                                onChange={(e) => updateAmount(item.id, e.target.value)}
                                defaultValue={item.amount}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <button onClick={() => removeData(item.id)} className="btn btn-outline-warning">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expense;
