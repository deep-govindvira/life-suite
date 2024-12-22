import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const cardsData = [
    {
      title: "Todo",
      description: "Organize your tasks and stay productive",
      link: "/Todo"
    },
    {
      title: "Note",
      description: "Take notes and keep track of your thoughts",
      link: "/Note"
    },
    {
      title: "Expense",
      description: "Manage your expenses and budget",
      link: "/Expense"
    }
  ];
  return (
    <div className="container">
      <h1 className="mt-5">Welcome to LifeSuite!</h1>
      <h2>What would you like to do today?</h2>
      <div className="row mt-5">
        {cardsData.map((card, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Link to={card.link} className="text-decoration-none">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
