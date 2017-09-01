import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-light"  style={{backgroundColor: '#e3f2fd'}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <img className="navbar-brand mb-0" src="/images/logo_new.png" style={{height: '125px', width: '125px'}} />
        </div>
        <ul className="nav navbar-nav">
          <li className="nav-item active"><NavLink to="/campuses">Home</NavLink></li>
          <li className="nav-item"><NavLink to="/Campuses">Campuses</NavLink></li>
          <li className="nav-item"><NavLink to="/students">Students</NavLink></li>
        </ul>
      </div>
    </nav>

  )
}
