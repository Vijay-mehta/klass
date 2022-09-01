import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import '../../style.css';
import { GiHamburgerMenu } from 'react-icons/gi';

function Header() {
    const history = useHistory();
    return (
        <header className="topbar">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-header">
                    <button className="hemburger_menu">
                        <GiHamburgerMenu />
                    </button>
                    <NavLink className="navbar-brand" to="javascript:void(0);">
                        <b className="logo-icon">
                            <img src="../../images/logo-web.svg" />
                        </b>
                    </NavLink>
                    <NavLink className="topbartoggler d-block d-md-none waves-effect waves-light" to="javascript:void(0)"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i
                            className="ti-more"></i></NavLink>
                </div>
                <div className="navbar-collapse collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle waves-effect waves-dark" to="#" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <img src="../../images/profle.jpg" alt="user" width="40" className="profile-pic rounded-circle" />
                                <div className="body">
                                    <h5>Hello! Klassbook</h5>
                                </div>
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
                                <div className="d-flex no-block align-items-center p-3 bg-info text-white mb-2">
                                    <div className=""><img src="../../images/profle.jpg" alt="user" className="rounded-circle" width="60" /></div>
                                    <div className="ms-2">
                                        <h4 className="mb-0 text-white">Klassbook</h4>
                                        <p className=" mb-0">klassbook@gmail.com</p>
                                    </div>
                                </div>
                                <NavLink className="dropdown-item" to="javascript:void(0);">
                                    <i data-feather="user" className="feather-sm text-info me-1 ms-1"></i> My Profile
                                </NavLink>
                                <div className="dropdown-divider"></div>
                                <div className="pl-4 p-2"><button type="button" className="btn d-block w-100 btn-info rounded-pill" onClick={() => {
                                    localStorage.setItem("token", '');
                                    history.replace("/login");
                                }}>Logout</button></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
export default Header;