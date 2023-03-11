import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import GoggleLogo from './googleLogo.png';
import './form.css';
// import Dashboard from './Dashboard';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history.push("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (<div className="main-container">
    <form style={{maxWidth:"50vh"}} className="container" onSubmit={Auth}>
        <h1>{msg}</h1>
        <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email' />
        <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Password' />
        <Link to="/register" className="link">Don’t have an account ? Signup instead</Link>
        <button className='submit'>Submit</button>
        <div className="option">
         <span>OR</span>
        </div>
        <div className="formGoogle">
            <img src={GoggleLogo} alt="google logo"/>
            <button className="google" type='button'>Login with Google</button>
        </div>
      
    </form>
 </div>
    )
}

export default Login
