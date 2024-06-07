import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1 className="mt-5">Welcome to LifeSuite!</h1>
      <h2>What would you like to do today?</h2>
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <Link to="/Todo" className="text-decoration-none">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Todo</h3>
                <p className="card-text">Organize your tasks and stay productive</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link to="/Note" className="text-decoration-none">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Note</h3>
                <p className="card-text">Take notes and keep track of your thoughts</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link to="/Expense" className="text-decoration-none">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Expense</h3>
                <p className="card-text">Manage your expenses and budget</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
