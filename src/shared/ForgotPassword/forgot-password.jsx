import React from "react";
import { NavLink } from "react-router-dom";
import './forgot-password.css';

function Forgotpassword() {
    return (
        <section className="login_section">
            <div className="login_header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-12 logo_box">
                            <NavLink to="/">CarePlatForm</NavLink>
                        </div>
                        <div className="col-md-9">
                            <div class="login_title">
                                <h1>Care Management Simplified!</h1>
                                <p>Welcome to your new experience of care management. Our powerful, easy to use
                                    and intuitive care platform, enables you to easily manage all you care tasks.</p>
                            </div>
                        </div>
                        <div className="col-md-3 img_box">
                            <img src="../../images/login.svg" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 form_box">
                <from>
                    <h4>Forgot Password</h4>
                    <input type="email" className="form-control" placeholder="Email" />
                    <input type="button" className="form-control btn" value="Forgot Password" />
                </from>
                <div class="option_box">
                    <p>Already have an account? <NavLink to="login" className="">Log in</NavLink></p>
                </div>
            </div>
        </section>
    );
}

export default Forgotpassword;