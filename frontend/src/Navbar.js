import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, onLoginLogout }) {
  const navigate = useNavigate();

  const data = [
    { name: 'Home', url: '/' },
    { name: 'Todo', url: '/Todo' },
    { name: 'Note', url: '/Note' },
    { name: 'Expense', url: '/Expense' },
    {
      name: isLoggedIn ? 'Logout' : 'Login',
      url: isLoggedIn ? '#' : '/login',
      onClick: isLoggedIn
        ? () => {
            onLoginLogout();
            navigate('/');
          }
        : null,
    },
  ];

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#basic-navbar-nav"
          aria-controls="basic-navbar-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto">
            {data.map((item, index) => (
              <li className="nav-item" key={index}>
                {item.url === '#' ? (
                  <button
                    className="btn btn-link nav-link"
                    onClick={item.onClick}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink to={item.url} className="nav-link">
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
