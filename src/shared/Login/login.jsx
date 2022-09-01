import './login.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("admin123");
    const [message, setmessage] = useState("");

    function signin(e) {
        e.preventDefault();
        var data = JSON.stringify({
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/adminlogin`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {

                console.log(response, "9090")
                console.log(JSON.stringify(response.data.token))
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token)
                    history.push('/dashboard');
                } else {
                    setmessage("please enter correct credentials")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            signin();
        }
    };

    return (
        <section className="login_section">
            <div class="form_box">
                <form onSubmit={signin}>
                    <div className='col-md-12 text-center'>
                        <img className='logoImg' src="../../images/logo.png" />
                    </div>
                    <h4>Sign In</h4>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={(e) => { handleKeypress(e) }} type="email" className="form-control" placeholder="Email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => { handleKeypress(e) }} type="password" className="form-control" placeholder="Password" />
                    <button type="submit" className="form-control btn">Login</button>
                    {message}
                </form>
            </div>
        </section>
    );
}

export default Login;