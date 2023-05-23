import React, {useEffect, useState, useRef} from "react";
import "./loginform.css"
import useAuth from '../hooks/useAuth';

import axios from '../api/axios';
const LOGIN_URL = '/api/login';



const LoginForm = ({history}) => {

    const { setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

   

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (response.status === 200 )
            {
                history.push('/')
            }
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            
            setAuth({ email, password,});
            
            setUser('');
            setPwd('');
           
            
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            
        }
       
    }

    return (
        <div className="cus_container">
            <div className="cover">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={password}
                        required
                    />
                    <button className="login-btn" >Sign In</button>
                </form>  
            </div>
        </div>
    )
}

export default LoginForm