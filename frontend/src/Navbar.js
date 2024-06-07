import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const data = [
    { name: 'Home', url: '/' },
    { name: 'Todo', url: '/Todo' },
    { name: 'Note', url: '/Note'},
    { name: 'Expense', url: '/Expense'}
  ];

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto">
            {data.map((item) => (
              <li className="nav-item" key={item.name}>  {/* Key prop added here */}
                <NavLink to={item.url} className="nav-link">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
